import { Core, Sprite } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import RPGObject from 'hackforplay/object/object';
import Skin from 'hackforplay/skin';
import { registerServant } from 'hackforplay/family';

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
		switch (direction) {
			case 'ひだりから':
				this.x = amount * 32;
				break;
			case 'うえから':
				this.y = amount * 32;
				break;
			case 'みぎから':
				this.x = (15 - amount) * 32;
				break;
			case 'したから':
				this.y = (10 - amount) * 32;
				break;
			case 'ひだりへ':
				this.x -= amount * 32;
				break;
			case 'うえへ':
				this.y -= amount * 32;
				break;
			case 'みぎへ':
				this.x += amount * 32;
				break;
			case 'したへ':
				this.y += amount * 32;
				break;
			default:
				log(`${direction} は正しい向きではありません`);
				break;
		}
	}
}

let previousRockman;
export function summonRockman(ExtendedClass) {
	// 前回のロックマンを削除
	if (previousRockman && previousRockman.parentNode) {
		previousRockman.destroy();
	}
	// ロックマンを生成
	const rockman = new ExtendedClass();
	// サーヴァント扱いにする
	registerServant(player, rockman);
	rockman.collisionFlag = false;
	rockman.locate(player.mapX, player.mapY);
	rockman.forward = [1, 0];

	previousRockman = rockman;
}

// 魔道書から使えるようにグローバルに書き出す
self.Rockman = self.Rockman || Rockman;
self.summonRockman = self.summonRockman || summonRockman;
