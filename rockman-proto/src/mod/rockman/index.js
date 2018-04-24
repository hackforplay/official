import { Core, Sprite } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import RPGObject from 'hackforplay/object/object';
import { BehaviorTypes } from 'hackforplay/rpg-kit-rpgobjects';
import Skin from 'hackforplay/skin';
import { registerServant } from 'hackforplay/family';
import Vector2 from 'hackforplay/math/vector2';

import './preload';
import { fileNames, metadata } from './resources/metadata';

const game = Core.instance;
const log = Hack.log;
const lengthOfAppearingAnimation = 10;

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
				this.behavior = 'AirShooter';
				for (const vx of [2, 3, 4]) {
					const wind = this.summon(Skin.エアーシューター);
					this.shoot(wind, this.forward, vx);
					wind.force(0, -0.5);
					wind.destroy(80);
				}
				this.tl.delay(this.getFrame().length).then(() => {
					energy -= 100;
				});
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
	if (energy <= 0) {
		// エネルギー不足
		return;
	}
	// 前回のロックマンを削除
	if (rockman && rockman.parentNode) {
		rockman.destroy();
	}
	// ロックマンを生成
	rockman = new ExtendedClass();
	rockman.showHpLabel = false;
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
		rockman.behavior = BehaviorTypes.Dead;
		rockman.tl
			.delay(16)
			.moveBy(0, -lengthOfAppearingAnimation * 32, lengthOfAppearingAnimation);
	}
}

game.on('enterframe', update);

// 魔道書から使えるようにグローバルに書き出す
self.Rockman = self.Rockman || Rockman;
self.summonRockman = self.summonRockman || summonRockman;
