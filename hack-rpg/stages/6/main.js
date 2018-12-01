import { enchant, Hack, register } from '__FEELES_COMMON_INDEX__';
import main2 from './main2';
import main3 from './main3';
import main4 from './main4';
import extra from '../extra';
import { createMap1, createMap2, createMap3, createMap4 } from './maps';
import { prepareUtils } from '../../utils';

register(window);
prepareUtils();

game.preload(
	'resources/hackforplay/bar_green.png',
	'resources/hackforplay/bar_red.png'
);

function gameStart() {
	game.dispatchEvent(new enchant.Event('awake'));

	// map1 を読み込む
	Hack.changeMap('map1');

	// 魔道書を開く
	feeles.openCode('stages/6/code1.js');

	// 解説の youtube を開く
	// const youtube = new RPGObject();
	// youtube.mod(Hack.assets.village);
	// youtube.locate(0, 4);
	// youtube.on('addtrodden', event => {
	// 	if (event.item === Hack.player) {
	// 		feeles.openMedia({
	// 			url: 'https://youtu.be/yfwUHmf0DYA',
	// 			playing: true,
	// 			controls: true,
	// 			volume: 0.2
	// 		});
	// 	}
	// });

	// 説明書を開く
	// feeles.openReadme('stages/6/README.md');

	// プレイヤー（騎士）
	const player = (Hack.player = new Player(('▼ スキン', _kきし)));
	player.mod(('▼ スキン', _kきし));
	// プレイヤーを　7, 6 の位置に移動する
	player.locate(7, 6);
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

	// 	HP Gage
	// 体力のゲージを作る
	// 体力は最大で 9999
	const MAX = 9999;
	const bar = new Sprite(480, 32);
	bar.image = game.assets['resources/hackforplay/bar_green.png'];
	// 体力ゲージの位置
	bar.moveTo(0, 300);
	// 体力ゲージを更新する...
	bar.onenterframe = () => {
		// プレイヤーの体力が、体力の最大値を超えないようにする
		Hack.player.hp = Math.min(Hack.player.hp, MAX);
		// 体力ゲージの長さを更新する
		bar.width = (480 * Hack.player.hp) / MAX;
	};
	Hack.menuGroup.addChild(bar);

	// コウモリ
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _kこうもり));
	// コウモリを 11, 5 の位置に移動する ( map1 )
	item1.locate(11, 5, 'map1');
	// コウモリを更新する...
	item1.onつねに = () => {
		//　コウモリの横の位置をプレイヤーと同じにする
		item1.y = Hack.player.y;
		item1.updateCollider();
	};
	item1.onattacked = () => {
		Hack.logFunc('こうげきは かわされた\nけんは あたらないようだ`', true);
	};

	// 魔道書にコウモリを登録する
	feeles.setAlias('コウモリ', item1);

	Hack.logFunc(next =>
		player.mapX >= item1.mapX
			? next()
			: '今なら あの コウモリを こえて\nかいだんに たどりつけるだろう'
	);

	// かいだん
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _nのぼりかいだん));
	// 階段を 14, 5　の位置に配置する ( map1 )
	item2.locate(14, 5, 'map1');
	// 階段を下の方に置く
	item2.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item2.onふまれた = event => {
		if (event.item === Hack.player) {
			// 説明書 2 を開く
			// feeles.openReadme('stages/6/README2.md');
			// 魔道書の 2 ページ目を開く
			feeles.openCode('stages/6/code2.js');
			// マップ map2 に移動する
			Hack.changeMap('map2');
			// プレイヤーを 0, 5 の位置に移動する ( map2 )
			Hack.player.locate(0, 5, 'map2');
		}
	};

	// このステージを改造
	extra(0, 5, 'map1', 'stages/6/main.js');
}

game.onload = gameStart;
game.on('load', main2);
game.on('load', main3);
game.on('load', main4);
Hack.on('load', createMap1);
Hack.on('load', createMap2);
Hack.on('load', createMap3);
Hack.on('load', createMap4);
Hack.start();
