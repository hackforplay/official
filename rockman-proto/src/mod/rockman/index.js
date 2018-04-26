import { Core, Sprite } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import RPGObject from 'hackforplay/object/object';
import { BehaviorTypes } from 'hackforplay/rpg-kit-rpgobjects';
import Skin from 'hackforplay/skin';
import { registerServant } from 'hackforplay/family';
import Vector2 from 'hackforplay/math/vector2';
import Family from 'hackforplay/family';

import './preload';
import { fileNames, metadata } from './resources/metadata';

const game = Core.instance;
const log = (...args) => Hack.log(...args);
const lengthOfAppearingAnimation = 10;

export default class Rockman extends RPGObject {
	constructor() {
		super(Skin.ロックマン);

		this._target = new Vector2(this.x, this.y); // 現在の目的地
		this._timeStopper = false; // タイムストッパーを使っているフラグ
		this._leafShield = false; // リーフシールドを使っているフラグ

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
		const rockman = this;
		switch (weapon) {
			case 'エアーシューター':
				// WIP
				this.become('AirShooter');
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
			case 'リーフシールド':
				// WIP
				this._leafShield = !this._leafShield; // フラグ反転
				if (this._leafShield) {
					this.become('LeafShield');
					// 見えないシールドを展開
					this._leafShieldInstance = this.summon(function() {
						this.width = 60;
						this.height = 60;
						this.offset = {
							x: (32 - this.width) / 2,
							y: (32 - this.height) / 2
						};
						this.name = 'リーフシールド';
					});
					// シールドにはダメージ効果がある
					this._leafShieldInstance.mod(Hack.createDamageMod(1));
				} else {
					// シールドを解除
					if (this._leafShieldInstance) {
						this._leafShieldInstance.destroy();
					}
				}
				break;
			case 'タイムストッパー':
				// WIP
				this._timeStopper = !this._timeStopper; // フラグ反転
				if (this._timeStopper) {
					this.become('TimeStopper');
					// ストップ
					for (const item of RPGObject.collection) {
						// プレイヤー陣営以外のオブジェクト全てをストップ
						if (item.family !== Family.Player) {
							item.stop();
						}
					}
				} else {
					// ストッパー解除
					for (const item of RPGObject.collection) {
						// 元に戻す
						if (item.family !== Family.Player) {
							item.resume();
						}
					}
				}
				break;
			default:
				log(`${weapon} は正しい武器の名前ではありません`);
				break;
		}
	}
	/**
	 * BehaviorTypes を設定し, しばらくすると戻る
	 * @param {string} behavior behavior の名前
	 */
	become(behavior) {
		this.behavior = behavior;
		const frames = this.getFrame();
		if (!frames) {
			throw new Error(`${behavior} のアニメーションはありません`);
		}
		// null が来たら Idle に戻る
		const length = frames.indexOf(null);
		if (length > -1) {
			this.setTimeout(() => {
				this.behavior = BehaviorTypes.Idle;
			}, length);
		}
	}
	onbecomedead() {
		this.tl
			.delay(16)
			.moveBy(0, -lengthOfAppearingAnimation * 32, lengthOfAppearingAnimation);
		if (this._timeStopper) {
			this.cmd('タイムストッパー'); // 強制解除
		}
		if (this._leafShield) {
			this.cmd('リーフシールド'); // 強制解除
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
let energy = 1000; // ロックマンのエネルギーゲージ（インスタンスではなくゲームに対して一つ）
let argsWhenRespawn; // ロックマンをリスポーンしようとしている場合, その引数

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
	// 前回のロックマンがまだ残っている
	if (rockman && rockman.parentNode) {
		rockman.hp = 0; // 体力を 0 にすることで仕切り直しする
		argsWhenRespawn = arguments;
		return;
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
	if (
		!rockman ||
		!rockman.parentNode ||
		rockman.behavior === BehaviorTypes.Dead
	) {
		// 今はいない
		if (rockman && !rockman.parentNode && argsWhenRespawn) {
			// リスポーンさせる
			summonRockman(...argsWhenRespawn);
			argsWhenRespawn = null;
		}
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

	// タイムストッパー
	if (rockman._timeStopper) {
		energy -= 20; // 使用中は常に減り続ける
	}
	// リーフシールド
	if (rockman._leafShield) {
		energy -= 10; // 使用中は常に減り続ける
	}

	// エネルギーゲージ
	if (energy <= 0) {
		rockman.behavior = BehaviorTypes.Dead;
	}
}

game.on('enterframe', update);

// 魔道書から使えるようにグローバルに書き出す
self.Rockman = self.Rockman || Rockman;
self.summonRockman = self.summonRockman || summonRockman;
