import { enchant, Hack, register } from 'https://unpkg.com/@hackforplay/common@^0.10';
import createMap from './maps';
import extra, { flag } from '../extra';
import { prepareUtils } from '../../utils';

register(window);
prepareUtils();

function gameStart() {
	game.dispatchEvent(new enchant.Event('awake'));

	// map1 を読み込む
	Hack.changeMap('map1');

	// プレイヤー（騎士）
	const player = (Hack.player = new Player(('▼ スキン', _kきし)));
	player.mod(('▼ スキン', _kきし));
	// プレイヤーを 7, 5 の位置に移動する
	player.locate(7, 5);
	// プレイヤーの体力
	player.hp = 3;
	// プレイヤーの攻撃力
	player.atk = 1;
	// プレイヤーがやられたら...
	player.onたおれたとき = function() {
		// プレイヤーを削除する
		this.destroy();
		// ゲームオーバー
		Hack.gameover();
	};

	// 神官
	const boy = new RPGObject();
	boy.mod(('▼ スキン', _o男の子));
	// 神官を 7, ３ の位置に移動する
	boy.locate(7, 3);
	// フラグが立っていたら...
	if (flag) {
		Hack.log('転移装置 の ふういんが とけた!');
		// 神官にぶつかったら...
		boy.onぶつかった = () => {
			Hack.log(
				'きみの そのちから、このせかいをもっと 自由にできるんじゃないかな'
			);
		};
	}
	// フラグが立っていなかったら...
	else {
		// 神官にぶつかったら...
		boy.onぶつかった = () => {
			Hack.log('きみが ふういんを といてくれるのかい？');
			// 魔道書を開く
			feeles.openEditor('stages/extra.js');
		};
	}

	// 転移装置

	// 4, 6 の位置に　明るい緑色（lightgreen） の転移装置を作る
	const warp1 = createWarp(
		4,
		6,
		'lightgreen',
		'ステージ１ "はじまりの森" に ワープしますか？',
		'stages/1/index.html'
	);

	// 5, 7 の位置に　オレンジ色（orange） の転移装置を作る
	const warp2 = createWarp(
		5,
		7,
		'orange',
		'ステージ2 "CODE の 魔法" に ワープしますか？',
		'stages/2/index.html'
	);

	// 6, 7 の位置に　青色（blue） の転移装置を作る
	const warp3 = createWarp(
		6,
		7,
		'blue',
		'ステージ3 "おかしな行き止まり" に ワープしますか？',
		'stages/3/index.html'
	);

	// 8, 7 の位置に　シアン（水色）（cyan） の転移装置を作る
	const warp4 = createWarp(
		8,
		7,
		'cyan',
		'ステージ4 "閉じられた群青の輝き" に ワープしますか？',
		'stages/4/index.html'
	);

	// 9, 7 の位置に　黄色（yellow） の転移装置を作る
	const warp5 = createWarp(
		9,
		7,
		'yellow',
		'ステージ5 "大グモ荒野" に ワープしますか？',
		'stages/5/index.html'
	);

	// 10, 8 の位置に紫色（purple)　の転移装置を作る
	const warp6 = createWarp(
		10,
		8,
		'purple',
		'ステージ6 "守りし者" に ワープしますか？',
		'stages/6/index.html'
	);

	// 魔道書にプレイヤーを登録する
	feeles.setAlias('プレイヤー', player);

	// このステージを改造
	extra(13, 8, 'map1', 'stages/7/main.js');
}

// 転移装置を作るコード （ 関数 ）
function createWarp(x, y, color, message, next) {
	// ワープ床
	const warp = new RPGObject();
	warp.mod(('▼ スキン', _wワープ));
	// ワープ床を x, y の位置に移動する ( map1 )
	warp.locate(x, y, 'map1');
	// ワープ床の色を color にする
	warp.color = color;
	// ワープ床は下の方に置く ( Under )
	warp.layer = RPGMap.Layer.Under;
	// もしフラグが立っていたら...
	if (flag) {
		// ワープ床にプレイヤーが乗ったら...
		warp.onふまれた = event => {
			if (event.item === Hack.player) {
				// 確認して...
				if (confirm(message)) {
					// ワープ！
					feeles.replace(next);
				}
			}
		};
	}
	// もしフラグが立っていなかったら...
	else {
		// ワープ床の透明度（うすさ）を0.2にする（ちょっと見える）
		warp.opacity = 0.2;
		// ワープ床にプレイヤーが乗ったら...
		warp.onふまれた = event => {
			if (event.item === Hack.player) {
				// メッセージ
				alert('見えない力で 閉ざされている');
			}
		};
	}
	return warp;
}

game.onload = gameStart;

feeles.closeReadme();
feeles.closeCode();
feeles.closeMedia();

Hack.on('load', createMap);
Hack.start();
