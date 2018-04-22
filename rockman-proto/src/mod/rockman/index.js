import { Core, Sprite } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import RPGObject from 'hackforplay/object/object';
import Skin from 'hackforplay/skin';
import { registerServant } from 'hackforplay/family';
import Vector2 from 'hackforplay/math/vector2';

import { fileNames, metadata } from './resources/index';

const game = Core.instance;
const log = Hack.log;

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
	this.setFrameD9(BehaviorTypes.Idle, [0]);
	this.setFrameD9(BehaviorTypes.Walk, [null]);
	this.setFrameD9(BehaviorTypes.Attack, [null]);
	this.setFrameD9(BehaviorTypes.Damaged, [null]);
	this.setFrameD9(BehaviorTypes.Dead, [null]);
	this.directionType = 'double';
	this.forward = [1, 0];
};

export default class Rockman extends RPGObject {
	constructor() {
		super(Skin.ロックマン);
		this.しょうかんされたら();

		this.locate(player.mapX, player.mapY); // 初期値
		this._target = new Vector2(this.x, this.y); // 現在の目的地
		this._isOnTarget = true; // 目的到達フラグ

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
		this._isOnTarget = false; // 歩き始める
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
				this._isOnTarget = true; // ストップ
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

export function summonRockman(ExtendedClass) {
	// 前回のロックマンを削除
	if (rockman && rockman.parentNode) {
		rockman.destroy();
	}
	// ロックマンを生成
	rockman = new ExtendedClass();
	// サーヴァント扱いにする
	registerServant(player, rockman);
	rockman.collisionFlag = false;
	rockman.locate(player.mapX, player.mapY);
	rockman.forward = [1, 0];

	previousRockman = rockman;
}

function update() {
	// 魔道書から改変されてはいけない毎フレーム処理はここに書く
	if (!rockman || !rockman.parentNode) {
		// 今はいない
		return;
	}

	// 移動処理
	const rockmanSpeed = 4; // ロックマンのスピード [px/frame]
	if (!rockman._isOnTarget) {
		const pos = new Vector2(rockman.x, rockman.y);
		const distance = pos.distance(rockman._target);
		// rockmanSpeed [px] だけ進む
		const t = rockmanSpeed / distance;
		const next = pos.moveTowards(rockman._target, t);
		rockman.x = next.x;
		rockman.y = next.y;
		if (t >= 1) {
			// distance <= rockmanSpeed, つまりこのフレームで到達
			rockman._isOnTarget = true;
			rockman.とうちゃくしたら(rockman.mapX, rockman.mapY);
		}
	}
}

game.on('enterframe', update);

// 魔道書から使えるようにグローバルに書き出す
self.Rockman = self.Rockman || Rockman;
self.summonRockman = self.summonRockman || summonRockman;
