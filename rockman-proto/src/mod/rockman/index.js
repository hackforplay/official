import { Core, Sprite } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import RPGObject from 'hackforplay/object/object';
import { BehaviorTypes } from 'hackforplay/rpg-kit-rpgobjects';
import Skin from 'hackforplay/skin';
import { registerServant } from 'hackforplay/family';
import Vector2 from 'hackforplay/math/vector2';

import { fileNames, metadata } from './resources/index';

const game = Core.instance;
const log = Hack.log;
const lengthOfAppearingAnimation = 4;

// 画像のプリロード
game.preload(fileNames);

// スキンを追加
Skin.ロックマン = function() {
	// this が bind されているかチェックする
	if (!this instanceof RPGObject) return;

	this.image = game.assets[metadata.Rockman.name];
	this.width = metadata.Rockman.width;
	this.height = metadata.Rockman.height;
	this.offset = {
		x: metadata.Rockman.offsetX,
		y: metadata.Rockman.offsetY
	};
	const _appearing = Array.from({ length: lengthOfAppearingAnimation }).fill(9);
	this.setFrame('appear', _appearing.concat(8, 7, 6, null));
	this.setFrame(BehaviorTypes.Idle, [4]);
	this.setFrame(BehaviorTypes.Walk, [1, 1, 2, 2, 2, 3, 3, 2, 2, 2]);
	this.setFrame(BehaviorTypes.Attack, [null]);
	this.setFrame(BehaviorTypes.Damaged, [null]);
	this.setFrame(BehaviorTypes.Dead, [12, 11, 11, 11, 10, 10, 10, null]);
	this.directionType = 'double';
	this.forward = [1, 0];
};

export default class Rockman extends RPGObject {
	constructor() {
		super(Skin.ロックマン);

		this._target = new Vector2(this.x, this.y); // 現在の目的地
		this._energy = 0; // 現在のエネルギー量

		this.locate(
			player.mapX + player.forward.x,
			player.mapY + player.forward.y - lengthOfAppearingAnimation
		);
		this.tl
			.moveBy(0, lengthOfAppearingAnimation * 32, lengthOfAppearingAnimation)
			.delay(16)
			.then(() => {
				this.しょうかんされたら();
			});
		this.forward = player.forward;
		this.collisionFlag = false;
		this.behavior = 'appear';

		this._pMapX = player.mapX;
		this._pMapY = player.mapY;
		player.on('walkend', () => {
			this.プレイヤーがあるいたら(
				player.mapX,
				player.mapY,
				this._pMapX,
				this._pMapY
			);
			this._pMapX = player.mapX;
			this._pMapY = player.mapY;
		});
	}
	move(direction, amount) {
		this.behavior = BehaviorTypes.Walk; // 歩き始める
		switch (direction) {
			case 'ひだりから':
				this._target.x = amount * 32 + this.offset.x;
				break;
			case 'うえから':
				this._target.y = amount * 32 + this.offset.y;
				break;
			case 'みぎから':
				this._target.x = (15 - amount) * 32 + this.offset.x;
				break;
			case 'したから':
				this._target.y = (10 - amount) * 32 + this.offset.y;
				break;
			case 'ひだりへ':
				this._target.x -= amount * 32;
				break;
			case 'うえへ':
				this._target.y -= amount * 32;
				break;
			case 'みぎへ':
				this._target.x += amount * 32;
				break;
			case 'したへ':
				this._target.y += amount * 32;
				break;
			default:
				log(`${direction} は正しい向きではありません`);
				this.behavior = BehaviorTypes.Idle; // ストップ
				break;
		}
	}
	/**
	 * 特殊武器を発動（あるいは停止）する
	 * @param {string} weapon 特殊武器の名前
	 */
	cmd(weapon) {
		switch (weapon) {
			case 'エアーシューター':
				// WIP
				const wind = this.summon(Skin.ワープ);
				// this.image = game.assets[metadata.AirShooter.name];
				this.shoot(wind, this.forward, 6);
				wind.force(0, -1);
				wind.destroy(20);
				energy = 0;
				break;
			default:
				log(`${direction} は正しい武器の名前ではありません`);
				break;
		}
	}
	/**
	 * 召喚された時にコールされる
	 */
	しょうかんされたら() {}
	/**
	 * プレイヤーが１歩歩く時にコールされる
	 * @param {number} left 現在のプレイヤーの位置X
	 * @param {number} top 現在のプレイヤーの位置Y
	 * @param {number} pLeft 一つ前のプレイヤーの位置X
	 * @param {number} pTop 一つ前のプレイヤーの位置Y
	 */
	プレイヤーがあるいたら(left, top, pLeft, pTop) {}
}

let rockman; // インスタンス（１つしか作ってはいけない）
let energy = 100; // ロックマンのエネルギーゲージ（インスタンスではなくゲームに対して一つ）

export function getEnergy() {
	return energy;
}
export function setEnergy(value) {
	energy = value;
}

export function summonRockman(ExtendedClass) {
	// 前回のロックマンを削除
	if (rockman && rockman.parentNode) {
		rockman.destroy();
	}
	// ロックマンを生成
	rockman = new ExtendedClass();
	rockman.hp = 100;
	// サーヴァント扱いにする
	registerServant(player, rockman);
}

function update() {
	Hack.score = energy; // for debugging

	// 魔道書から改変されてはいけない毎フレーム処理はここに書く
	if (!rockman || !rockman.parentNode) {
		// 今はいない
		return;
	}

	// 移動処理
	const rockmanSpeed = 4; // ロックマンのスピード [px/frame]
	if (rockman.behavior === BehaviorTypes.Walk) {
		const pos = new Vector2(rockman.x, rockman.y);
		const distance = pos.distance(rockman._target);
		// rockmanSpeed [px] だけ進む
		const t = rockmanSpeed / distance;
		const next = pos.moveTowards(rockman._target, t);
		rockman.x = next.x;
		rockman.y = next.y;
		if (t >= 1) {
			// distance <= rockmanSpeed, つまりこのフレームで到達
			rockman.behavior = BehaviorTypes.Idle;
			rockman.とうちゃくしたら(rockman.mapX, rockman.mapY);
		}
		// 向きを変更する
		const signX = Math.sign(next.x - pos.x);
		if (signX !== 0) {
			rockman.forward = new Vector2(signX, 0);
		}
	}

	// エネルギーゲージ
	if (energy <= 0) {
		rockman.hp = 0; // たおれる
	}
}

game.on('enterframe', update);

// 魔道書から使えるようにグローバルに書き出す
self.Rockman = self.Rockman || Rockman;
self.summonRockman = self.summonRockman || summonRockman;
