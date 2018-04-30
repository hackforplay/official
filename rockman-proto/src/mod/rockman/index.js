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
import Laser from 'hackforplay/object/laser';

const game = Core.instance;
const log = (...args) => Hack.log(...args);
const lengthOfAppearingAnimation = 10;
const maxCommandNum = 1000;

export default class Rockman extends RPGObject {
	constructor() {
		super(Skin.ロックマン);

		this._timeStopper = false; // タイムストッパーを使っているフラグ
		this._leafShield = false; // リーフシールドを使っているフラグ
		this._superArm = false; // スーパーアーム使用中フラグ
		this._atomicFirePower = 0; // アトミックファイヤーの段階
		this._commandChunks = []; // コマンドのチャンク
		this._commandNum = 0; // キューイングされている全コマンドの数
		this._chunkName = ''; // 現在追加中のチャンクに紐づいたイベント名
		this._enableDispatch = false; // dispatch が使えるかどうかのフラグ

		this.locate(
			player.mapX + player.forward.x,
			player.mapY + player.forward.y - lengthOfAppearingAnimation
		);

		this.tl.moveBy(
			0,
			lengthOfAppearingAnimation * 32,
			lengthOfAppearingAnimation
		);
		this.forward = new Vector2(player.forward.x || 1, 0);
		this.collisionFlag = false;
		this.become('appear');

		this._pMapX = player.mapX;
		this._pMapY = player.mapY;
		player.on('walkend', () => {
			this.dispatch('プレイヤーがあるいたら', [
				player.mapX,
				player.mapY,
				this._pMapX,
				this._pMapY
			]);
			this._pMapX = player.mapX;
			this._pMapY = player.mapY;
		});

		this.once('becomeidle', () => {
			this._target = new Vector2(this.x, this.y); // 現在の目的地
			this._enableDispatch = true; // 行動スタート
			this.dispatch('しょうかんされたら');
		});
	}
	/**
	 * @returns {Array} 現在実行中のコマンドのチャンク
	 */
	get currentChunk() {
		return this._commandChunks[0] || [];
	}
	/**
	 * @returns {Array} 最後, つまり現在追加中のチャンク
	 */
	get lastChunk() {
		return this._commandChunks[this._commandChunks.length - 1] || [];
	}
	/**
	 *
	 * @param {Object} command
	 */
	addCommand(command) {
		if (!this._enableDispatch) {
			// 準備中
			return;
		}
		if (!command.type || !command.chunkName) {
			// 不正なコマンド
			log(`不正なコマンドです. 係りの人を呼んでください`);
			throw new Error(command.message);
		}
		if (this._commandNum >= maxCommandNum) {
			// コマンドが多すぎる => invalid (ロックマン死亡)
			log(`コマンドが多すぎます！！
ロックマンは ${command.chunkName} かえってしまいました`);
			this._enableDispatch = false;
			this.behavior = BehaviorTypes.Dead;
			return;
		}
		// チャンクに追加
		this.lastChunk.push(command);
		this._commandNum++; // インクリメント
		if (this._commandNum === 1) {
			// これが唯一のコマンドである場合, その瞬間に実行する
			this.executeNextCommand();
		}
	}
	/**
	 * 動きをキューイングする
	 * @param {string} direction 向きキーワード
	 * @param {number} amount マスの数
	 */
	move(direction, amount) {
		const command = {
			chunkName: this._chunkName,
			type: 'move',
			message: `this.move('${direction}', ${amount});`,
			value: {}
		};
		switch (direction) {
			case 'ひだりから':
				command.value.type = 'absolute';
				command.value.x = amount * 32 + this.offset.x;
				break;
			case 'うえから':
				command.value.type = 'absolute';
				command.value.y = amount * 32 + this.offset.y;
				break;
			case 'みぎから':
				command.value.type = 'absolute';
				command.value.x = (15 - amount) * 32 + this.offset.x;
				break;
			case 'したから':
				command.value.type = 'absolute';
				command.value.y = (10 - amount) * 32 + this.offset.y;
				break;
			case 'ひだりへ':
				command.value.type = 'relative';
				command.value.x = -32 * amount;
				break;
			case 'うえへ':
				command.value.type = 'relative';
				command.value.y = -32 * amount;
				break;
			case 'みぎへ':
				command.value.type = 'relative';
				command.value.x = 32 * amount;
				break;
			case 'したへ':
				command.value.type = 'relative';
				command.value.y = 32 * amount;
				break;
			default:
				command.type = 'invalid';
				command.message = `
${command.chunkName}() {
	${command.message} ←このコマンドは 実行されませんでした.
}
${direction} は正しい向きではないからです`;
				break;
		}
		this.addCommand(command);
	}
	executeNextCommand() {
		if (this.behavior === BehaviorTypes.Dead) {
			return; // もう死んでいる
		}
		if (this.currentChunk.length < 1) {
			// チャンクが空になった
			// アトミックファイヤーが残っていれば発射
			if (this._atomicFirePower > 0) {
				this.shootAtomicFire(); // アトミックファイヤー発射
				return;
			}
			// 空のチャンクの消去
			this._commandChunks.shift();
			if (this._commandChunks.length > 0) {
				// まだ残っていれば再帰的に実行
				this.executeNextCommand();
				return;
			}
		}

		const rockman = this;
		const command = this.currentChunk[0];

		// アトミックファイヤー
		if (this._atomicFirePower > 0) {
			if (!command || command.type !== 'アトミックファイヤー') {
				// アトミックファイヤー発射
				this.shootAtomicFire();
				return;
			}
		}

		// コマンドがない
		if (!command) {
			this.behavior = BehaviorTypes.Idle;
			return; // 待機
		}

		switch (command.type) {
			case 'move':
				const target = new Vector2(this.x, this.y);
				if (typeof command.value.x === 'number') {
					if (command.value.type === 'relative') {
						target.x += command.value.x;
					} else {
						target.x = command.value.x;
					}
				}
				if (typeof command.value.y === 'number') {
					if (command.value.type === 'relative') {
						target.y += command.value.y;
					} else {
						target.y = command.value.y;
					}
				}
				if (this._leafShield && this._leafShieldInstance) {
					// リーフシールドの発射
					const dir = target
						.subtract(new Vector2(this.x, this.y))
						.normalize()
						.scale(10);
					this._leafShieldInstance.velocity(dir.x, dir.y);
					this._leafShieldInstance.destroy(50);
					this._leafShield = false;
				} else {
					// 歩行開始
					this.behavior = BehaviorTypes.Walk; // 歩き始める
					this._target = target;
				}
				break;
			case 'エアーシューター':
				// WIP
				this.become('AirShooter');
				for (const vx of [2, 3, 4]) {
					const wind = this.summon(Skin.エアーシューター);
					this.shoot(wind, this.forward, vx);
					wind.force(0, -0.5);
					wind.destroy(80);
				}
				this.once('becomeidle', () => {
					// モーションが終わったら次へ
					energy -= 100;
					this.next();
				});
				break;
			case 'アトミックファイヤー':
				// WIP
				this.become('AtomicFire');
				this._atomicFirePower = Math.min(3, this._atomicFirePower + 1);
				if (this._atomicFirePower === 1) {
					const fire = this.summon(Skin.アトミックファイヤー);
					fire.x += this.forward.x * 32;
					this._atomicFireInstance = fire;
				}
				this._atomicFireInstance.behavior = `power-${this._atomicFirePower}`;
				this.setTimeout(() => {
					// 一定フレームが経過したら次へ
					energy -= 100;
					this.next();
				}, 30);
				break;
			case 'ジェミニレーザー':
				// WIP
				this.become('GeminiLaser');
				const laser = new Laser({
					origin: new Vector2(this.center.x, this.center.y),
					direction: new Vector2(this.forward.x, this.forward.y),
					length: 20,
					speed: 10,
					thickness: 4,
					color: 'rgb(255,255,255)',
					damage: 1
				});
				registerServant(this, laser);
				laser.on('reflect', event => {
					if (event.count === 1) {
						// 最初にぶつかった時のみ斜めに跳ね返る
						const dx = Math.sign(event.reflectDirection.x);
						event.setReflectDirection(new Vector2(dx, -1));
					}
					if (event.count === 11) {
						// １０回ぶつかったらなくなる
						event.cancel();
					}
				});
				this.once('becomeidle', () => {
					// モーションの後、次へ
					energy -= 100;
					this.next();
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
					// シールドに触れた弾を消す
					this._leafShieldInstance.on('triggerenter', event => {
						if (event.hit.name === 'Rockman/Bullet') {
							event.hit.destroy();
						}
					});
					this.once('becomeidle', () => {
						// モーションが終わったら次へ
						this.next();
					});
				} else {
					// シールドを解除
					if (this._leafShieldInstance) {
						this._leafShieldInstance.destroy();
					}
					// すぐに次へ
					this.next();
				}
				break;
			case 'スーパーアーム':
				if (!this._superArm) {
					this.become('SuperArm');
					// 手元のオブジェクトを持ち上げる
					const hand = getHandyObject(this.mapX, this.mapY);
					if (hand) {
						hand.onenterframe = () => {
							hand.moveTo(this.x, this.y - 24);
							hand.updateCollider();
						};
						hand.collisionFlag = false;
						this._superArmInstance = hand;
						this._superArm = true;
					} else {
						// 平常時に戻る
						this.behavior = BehaviorTypes.Idle;
						this.next();
						return;
					}
				} else {
					// 持っているオブジェクトをそこに置く
					this.become('SuperArm');
					this._superArmInstance.collisionFlag = true;
					this._superArmInstance.locate(this.mapX, this.mapY);
					this._superArmInstance.onenterframe = null;
					this._superArmInstance = null;
					this._superArm = false;
				}
				// アニメーションの後, 次へ
				this.once('becomeidle', () => {
					this.next();
				});
				break;
			case 'タイムストッパー':
				// WIP
				this.toggleTimeStopper();
				break;
			default:
				log(command.message);
				// 不正なコマンドを受けるとロックマンはかえってしまう
				this.behavior = BehaviorTypes.Dead;
				break;
		}
	}
	next() {
		const previousCommand = this.currentChunk.shift();
		if (previousCommand) {
			this._commandNum--; // デクリメント
		}
		// 次の動作へ
		this.executeNextCommand();
	}
	/**
	 * 特殊武器を発動（あるいは停止）する
	 * @param {string} weapon 特殊武器の名前
	 */
	cmd(weapon) {
		const command = {
			chunkName: this._chunkName,
			message: `this.cmd('${weapon}');`
		};
		// バリデーション
		switch (weapon) {
			case 'エアーシューター':
			case 'アトミックファイヤー':
			case 'ジェミニレーザー':
			case 'リーフシールド':
			case 'スーパーアーム':
			case 'タイムストッパー':
				command.type = weapon;
				break;
			default:
				command.type = 'invalid';
				command.message = `
${command.chunkName}() {
${command.message} ←このコマンドは 実行されませんでした.
}
${weapon} は正しい武器の名前ではないからです`;
				break;
		}
		this.addCommand(command);
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
		// リーフシールド解除
		if (this._leafShield && this._leafShieldInstance) {
			this._leafShieldInstance.destroy();
		}
		// タイムストッパー解除
		if (this._timeStopper) {
			this.toggleTimeStopper();
		}
		// アトミックファイヤー消去
		if (this._atomicFireInstance) {
			this._atomicFireInstance.destroy();
		}
		// スーパーアームで持ち上げたオブジェクトの消去
		if (this._superArm && this._superArmInstance) {
			this._superArmInstance.locate(this.mapX, this.mapY);
			this._superArmInstance.onenterframe = null;
			this._superArmInstance.collisionFlag = true;
			this._superArmInstance = null;
		}
	}
	/**
	 * "〜たら" イベントを発火させる
	 * @param {String} name "〜たら" というイベントの名前
	 * @param {Array} args イベントを発火させるパラメータ
	 */
	dispatch(name, args) {
		if (!this._enableDispatch) {
			// 準備中
			return;
		}
		// 新たなコマンドチャンクを作る
		this._chunkName = name;
		this._commandChunks.push([]);
		if (typeof this[name] === 'function') {
			// "〜たら" をコール
			this[name].apply(this, args);
		}
	}
	/**
	 * アトミックファイヤー発射
	 */
	shootAtomicFire() {
		const damage = this._atomicFirePower;
		this._atomicFireInstance.mod(Hack.createDamageMod(damage));
		this.shoot(this._atomicFireInstance, this.forward, 10);
		this._atomicFireInstance.destroy(50);
		this._atomicFirePower = 0;
		this._atomicFireInstance = null;
		this.setTimeout(() => {
			// 少しのディレイののち, 次の動作へ
			this.next();
		}, 6);
	}
	/**
	 * タイムストッパー
	 */
	toggleTimeStopper() {
		this._timeStopper = !this._timeStopper; // フラグ反転
		if (this._timeStopper) {
			this.become('TimeStopper');
			// ストップ
			this._timeStopperInstances = new WeakSet(); // 止めたオブジェクトを弱参照で保持
			for (const item of RPGObject.collection) {
				// プレイヤー陣営以外のオブジェクト全てをストップ
				if (item.family !== Family.Player) {
					item.stop();
					console.log(item);
					this._timeStopperInstances.add(item);
				}
			}
			this.once('becomeidle', () => {
				// モーションが終わったら次へ
				this.next();
			});
		} else {
			// ストッパー解除
			for (const item of RPGObject.collection) {
				// 元に戻す
				if (this._timeStopperInstances.has(item)) {
					item.resume();
				}
			}
			// すぐに次へ
			this.next();
		}
	}
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

let handies = new WeakSet();

export function registerHandyObject(obj) {
	handies.add(obj);
}

function getHandyObject(x, y) {
	return RPGObject.collection.find(item => {
		return handies.has(item) && item.mapX === x && item.mapY === y;
	});
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
			// 次のコマンドへ
			rockman.next();
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
