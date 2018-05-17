import { Core, Sprite } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import RPGObject from 'hackforplay/object/object';
import BehaviorTypes from 'hackforplay/behavior-types';
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

		this._atomicFire = false; // アトミックファイヤーを使っているフラグ
		this._timeStopper = false; // タイムストッパーを使っているフラグ
		this._leafShield = false; // リーフシールドを使っているフラグ
		this._superArm = false; // スーパーアーム使用中フラグ
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

		let _pMapX = player.mapX;
		let _pMapY = player.mapY;
		player.on('walkend', () => {
			this.dispatch('プレイヤーがあるいたら', [
				player.mapX - _pMapX,
				player.mapY - _pMapY
			]);
			_pMapX = player.mapX;
			_pMapY = player.mapY;
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
	}
	/**
	 * あるイベントで作られたコマンドが全て追加された時, 修正を行う
	 */
	afterDispatch() {
		const commands = this.lastChunk;
		// アトミックファイヤーのカウントを設定, 発射コマンドを挿入
		let atomicCount = 0;
		for (let index = 0; index < commands.length; index++) {
			const item = commands[index];
			if (item.type === 'アトミックファイヤー') {
				item.value = ++atomicCount; // カウントをインクリメント
			}
			if (atomicCount === 3) {
				// 発射コマンドを追加
				const shootCommand = {
					chunkName: this._chunkName,
					type: 'shootAtomicFire',
					message: `{Shoot Atomic Fire}`,
					value: atomicCount
				};
				// 現在のコマンドの次の位置に追加
				commands.splice(index + 1, 0, shootCommand);
				atomicCount = 0; // カウントリセット
				this._commandNum++; // コマンド数をインクリメント
			}
		}
		if (atomicCount > 0) {
			// 溜まったまま残っている => 発射コマンドを追加
			const shootCommand = {
				chunkName: this._chunkName,
				type: 'shootAtomicFire',
				message: `{Shoot Atomic Fire}`,
				value: atomicCount
			};
			// 末尾に追加
			commands.push(shootCommand);
			atomicCount = 0; // カウントリセット
			this._commandNum++; // コマンド数をインクリメント
		}
		// もしチャンクの中身が空なら撤去
		if (commands.length === 0) {
			this._commandChunks.pop(); // lastChunk を削除
		}
		// もし, これが唯一のコマンドチャンクである場合, その瞬間に実行する
		if (this._commandChunks.length === 1) {
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
			// チャンクが空になったので消去
			this._commandChunks.shift();
			if (this._commandChunks.length > 0) {
				// まだ残っていれば再帰的に実行
				this.executeNextCommand();
				return;
			}
		}

		const rockman = this;
		const command = this.currentChunk[0];

		// コマンドがない
		if (!command) {
			this.behavior = this._superArm ? 'SuperArmIdle' : BehaviorTypes.Idle;
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
				const towardX = Math.sign(target.x - this.x);
				if (towardX !== 0) {
					this.forward.x = towardX;
				}
				// 今いる地点とのベクトル
				const dir = target.subtract(new Vector2(this.x, this.y));
				if (
					this._leafShield &&
					this._leafShieldInstance &&
					dir.magnitudeSqr() >= 1
				) {
					this.shootLeafShield(dir);
				} else {
					// 歩行開始
					this.behavior = this._atomicFire
						? 'AtomicFireWalk'
						: this._superArm
							? 'SuperArmWalk'
							: BehaviorTypes.Walk; // 歩き始める
					this._target = target;
				}
				break;
			case 'shootAtomicFire':
				this.shootAtomicFire(command.value); // アトミックファイヤー発射
				break;
			case 'エアーシューター':
				// WIP
				this.become('AirShooter');
				for (const vx of [2, 3, 4]) {
					const wind = this.summon(Skin.エアーシューター);
					this.shoot(wind, this.forward, vx);
					wind.mod(Hack.createDamageMod(1));
					wind.force(0, -0.5);
					wind.destroy(80);
				}
				this.once('becomeidle', () => {
					// モーションが終わったら次へ
					energy -= 0;
					this.next();
				});
				break;
			case 'アトミックファイヤー':
				// WIP
				this._atomicFire = true;
				this.become('AtomicFireIdle');
				if (!this._atomicFireInstance) {
					// アトミックファイヤーのインスタンスを生成
					const fire = this.summon(Skin.アトミックファイヤー);
					fire.onenterframe = () => {
						// ロックマンの前に火球を固定
						fire.moveTo(this.x, this.y);
						fire.moveBy(-this.offset.x, -this.offset.y);
						fire.moveBy(fire.offset.x, fire.offset.y);
						fire.moveBy(this.forward.x * 32, 0);
					};
					this._atomicFireInstance = fire;
				}
				this._atomicFireInstance.behavior = `power-${command.value}`;
				this.setTimeout(() => {
					// 一定フレームが経過したら次へ
					energy -= 0;
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
					energy -= 0;
					this.next();
				});
				break;
			case 'ハイパーボム':
				this.toggleHyperBomb();
				break;
			case 'リーフシールド':
				this.toggleLeafShield();
				break;
			case 'スーパーアーム':
				if (!this._superArm) {
					this.become('SuperArmIdle');
					// 手元のオブジェクトを持ち上げる
					const hand = getHandyObject(this.mapX, this.mapY);
					if (hand) {
						hand.onenterframe = () => {
							hand.moveTo(this.x, this.y - 18);
							hand.updateCollider();
						};
						hand.collisionFlag = false;
						this._superArmInstance = hand;
						this._superArm = true;
						this.setTimeout(() => {
							// 少しのディレイのあと, 次へ
							this.next();
						}, 5);
					} else {
						// 平常時に戻る
						this.behavior = BehaviorTypes.Idle;
						this.next();
						return;
					}
				} else {
					// 持っているオブジェクトをそこに置く
					this.behavior = BehaviorTypes.Idle;
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
			case 'サンダービーム':
				this.shootThunderBeam();
				break;
			case 'タイムストッパー':
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
			case 'ハイパーボム':
			case 'リーフシールド':
			case 'スーパーアーム':
			case 'サンダービーム':
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
		// ボムを消す
		if (this._hyperBombInstance) {
			this._hyperBombInstance.destroy();
			this._hyperBombInstance = null;
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
		this.afterDispatch();
	}
	/**
	 * アトミックファイヤー発射
	 */
	shootAtomicFire(power) {
		this.become('AtomicFireAttack');
		const damage = power;
		this._atomicFireInstance.onenterframe = null;
		this._atomicFireInstance.mod(Hack.createDamageMod(damage));
		this.shoot(this._atomicFireInstance, this.forward, 10);
		this._atomicFireInstance.destroy(50);
		this._atomicFireInstance = null;
		this._atomicFire = false;
		this.once('becomeidle', () => {
			// 少しのディレイののち, 次の動作へ
			this.next();
		});
	}
	/**
	 * ハイパーボムを投げる/爆破させる
	 */
	toggleHyperBomb() {
		this._hyperBomb = !this._hyperBomb; // フラグ反転
		if (this._hyperBomb) {
			this.become('HyperBomb'); // 投げる動作
			const bomb = this.summon(Skin.ハイパーボム);
			bomb.force(0, 0.5);
			bomb.velocity(this.forward.x * 5, -5);
			bomb.collisionFlag = false;
			let startY = bomb.y;
			bomb.onenterframe = () => {
				if (bomb.y >= startY) {
					// 上がって落ちて止まる
					bomb.velocity(0, 0);
					bomb.force(0, 0);
				}
			};
			this.once('becomeidle', () => {
				// モーションが終わったら次へ
				this.next();
			});
			this._hyperBombInstance = bomb;
		} else {
			// 爆破させる
			this._hyperBombInstance.mod(Hack.createDamageMod(1));
			this._hyperBombInstance.behavior = BehaviorTypes.Dead;
			this._hyperBombInstance = null;
		}
	}
	/**
	 * リーフシールドの展開/解除
	 */
	toggleLeafShield() {
		this._leafShield = !this._leafShield; // フラグ反転
		if (this._leafShield) {
			this.become('LeafShield');
			// 見えないシールドを展開
			const shield = this.summon(Skin.リーフシールド);
			// シールドにはダメージ効果がある
			shield.mod(Hack.createDamageMod(1));
			// シールドに触れた弾を消す
			shield.on('triggerenter', event => {
				if (event.hit.name === 'Rockman/Bullet') {
					event.hit.destroy();
				}
			});
			// だんだん大きくなる
			shield.scale(0, 0);
			shield.tl.scaleTo(1, 1, 6).then(() => {
				// モーションが終わったら次へ
				this.next();
			});
			this._leafShieldInstance = shield;
		} else {
			// シールドを解除
			if (this._leafShieldInstance) {
				this._leafShieldInstance.destroy();
			}
			// すぐに次へ
			this.next();
		}
	}
	/**
	 * リーフシールドの発射
	 */
	shootLeafShield(dir) {
		// リーフシールドの発射
		this.become('LeafShieldAttack');
		const speed = 10;
		const v = dir.normalize().scale(speed);
		this._leafShieldInstance.velocity(v.x, v.y);
		this._leafShieldInstance.destroy(50);
		this._leafShieldInstance = null;
		this._leafShield = false;
		this.once(
			'becomeidle',
			() => {
				// モーションのあと、歩行に戻る
				this.executeNextCommand();
			},
			5
		);
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
					this._timeStopperInstances.add(item);
				}
			}
			for (let index = 0; index < 10; index++) {
				// １０個のキラキラエフェクト
				const effect = new RPGObject(Skin.タイムストッパー);
				const moveRandom = () => {
					if (this._timeStopper) {
						effect.x = Math.random() * 448 + effect.offset.x;
						effect.y = Math.random() * 288 + effect.offset.y;
					} else {
						effect.destroy();
					}
				};
				moveRandom();
				effect.setInterval(moveRandom, effect.getFrame().length);
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
	/**
	 * サンダービーム
	 */
	shootThunderBeam() {
		this.become('ThunderBeam');
		const makeBeamBase = (behavior, vx, vy) => {
			const above = this.summon(Skin.サンダービーム);
			above.mod(Hack.createDamageMod(1));
			above.moveBy(vx, vy);
			above.moveBy(this.forward.x * this.width, 0);
			above.scale(-this.forward.x, 1);
			// アニメーションに合わせてスプライトを動かす
			above.behavior = behavior;
			let previousFrame = 0;
			above.on('prerender', () => {
				if (previousFrame !== above.frame) {
					above.moveBy(vx, vy);
					above.updateCollider();
				}
				previousFrame = above.frame;
			});
		};
		makeBeamBase('vertical', 0, -7);
		makeBeamBase('vertical', 0, 7);
		makeBeamBase('horizontal', this.forward.x * 7, 0);
		// アニメーションの後, 次へ
		this.once('becomeidle', () => {
			this.next();
		});
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
	if (
		rockman.behavior === BehaviorTypes.Walk ||
		rockman.behavior === 'AtomicFireWalk' ||
		rockman.behavior === 'SuperArmWalk'
	) {
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
			console.log('---- stop ----');
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
		energy -= 0; // 使用中は常に減り続ける
	}
	// リーフシールド
	if (rockman._leafShield) {
		energy -= 0; // 使用中は常に減り続ける
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
