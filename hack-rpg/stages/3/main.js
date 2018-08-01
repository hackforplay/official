import 'hackforplay/core';
import { gameclear } from 'utils';
import extra from '../extra';
import './maps';

function gameStart() {
	game.dispatchEvent(new enchant.Event('awake'));

	// map1 を読み込む
	Hack.changeMap('map1');

	// コードをとじる
	feeles.closeCode();

	// 解説の youtube を開く
	const youtube = new RPGObject();
	youtube.mod(Hack.assets.village);
	youtube.locate(0, 4);
	youtube.on('addtrodden', event => {
		if (event.item === Hack.player) {
			feeles.openMedia({
				url: 'https://youtu.be/Xvnw8kE-EXw',
				playing: true,
				controls: true,
				volume: 0.2
			});
		}
	});

	// 説明書を表示する
	// feeles.openReadme('stages/3/README.md');

	// プレイヤー（騎士）
	const player = (Hack.player = new Player(('▼ スキン', _kきし)));
	player.mod(('▼ スキン', _kきし));
	// プレイヤーを 3, 5 の位置に移動する
	player.locate(3, 5);
	// プレイヤーの体力
	player.hp = 3;
	// プレイヤーの攻撃力
	player.atk = 1;
	// プレイヤーがやられたら...
	player.onたおれたとき = function() {
		// プレイヤーを削除
		this.destroy();
		// ゲームオーバー
		Hack.gameover();
	};

	// 魔道書にプレイヤーを登録する
	feeles.setAlias('プレイヤー', player);

	// まどうしょ
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', Skin.マドウショ));
	// 魔道書を 5, 3 の位置に移動する
	item1.locate(5, 3);
	// 魔道書にプレイヤーが乗ったら...
	item1.onふまれた = event => {
		if (event.item === Hack.player) {
			// 説明書 2 を開く
			// feeles.openReadme('stages/3/README2.md');
			// 魔道書を開く
			feeles.openCode('stages/3/code.js');
			// 魔道書を削除
			item1.destroy();
			Hack.logFunc('マドウショが あらわれた！\nじっくりと よんでみよう');
		}
	};

	// スライム
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _sスライム));
	// スライムの体力
	item2.hp = 999;
	// スライムを 7, 5 の位置に移動する ( map1 )
	item2.locate(7, 5, 'map1');

	// 魔道書にスライムを登録する
	feeles.setAlias('スライム', item2);

	// イモムシ
	const item3 = new RPGObject();
	item3.mod(('▼ スキン', _iいもむし));
	// イモムシの体力
	item3.hp = 9999;
	// イモムシを 5, 7 の位置に移動する ( map1 )
	item3.locate(5, 7, 'map1');

	// 魔道書にスライムを登録する
	feeles.setAlias('イモムシ', item3);

	// かいだん
	const item4 = new RPGObject();
	item4.mod(('▼ スキン', _kくだりかいだん));
	// 階段を 7, 9 の位置に移動する ( map1 )
	item4.locate(7, 9, 'map1');
	// 階段は下の方に配置する ( Under )
	item4.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item4.onふまれた = event => {
		if (event.item === Hack.player) {
			// 次のステージに！
			gameclear('stages/4/index.html');
		}
	};

	// まどうしょがやってくるぞ…
	const logほんを = next =>
		item1.parentNode ? 'ほんを ひろってみよう' : next();
	let story = () => {
		item2.removeEventListener('attacked', story);
		item3.removeEventListener('attacked', story);
		// 魔道書: 60f まつ -> 下に32 ずれる -> 45f まつ -> 下に32 ずれる
		item1.tl
			.delay(60)
			.moveBy(0, 32, 30)
			.then(() => item1.updateCollider())
			.delay(45)
			.moveBy(0, 32, 30)
			.then(() => item1.updateCollider())
			.then(() => {
				Hack.logFunc(logほんを);
			});
	};
	item2.on('attacked', story);
	item3.on('attacked', story);
	const logそのままだとスライム = next =>
		item2.hp > 900
			? `
そのままだと あと${item2.hp / Hack.player.atk}回
こうげきしないと たおせないぞ
右にある マドウショを よもう`
			: next();
	item2.on('attacked', () => {
		if (!item1.parentNode) {
			// 魔道書を拾ったのに攻撃し続けている
			Hack.logFunc(logそのままだとスライム, true);
		}
	});
	const logそのままだとイモムシ = next =>
		item3.hp > 9000
			? `
そのままだと あと${item3.hp / Hack.player.atk}回
こうげきしないと たおせないぞ
右にある マドウショを よもう`
			: next();
	item3.on('attacked', () => {
		if (!item1.parentNode) {
			// 魔道書を拾ったのに攻撃し続けている
			Hack.logFunc(logそのままだとイモムシ, true);
		}
	});

	// このステージを改造
	extra(5, 1, 'map1', 'stages/3/main.js');
}

game.onload = gameStart;

Hack.start();
