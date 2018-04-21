import { Core, Sprite } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import RPGObject from 'hackforplay/object/object';
import Skin from 'hackforplay/skin';
import { registerServant } from 'hackforplay/family';

import { fileNames, metadata } from './resources/index';

const game = Core.instance;

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
			this.プレイヤーがあるいたら(player.mapX, player.mapY);
		});
	}
}

export function summonRockman(ExtendedClass) {
	const rockman = new ExtendedClass();
	// サーヴァント扱いにする
	registerServant(player, rockman);
	rockman.collisionFlag = false;
	rockman.locate(player.mapX, player.mapY);
	rockman.forward = [1, 0];
}

// 魔道書から使えるようにグローバルに書き出す
self.Rockman = self.Rockman || Rockman;
self.summonRockman = self.summonRockman || summonRockman;
