import Assets from 'hackforplay/Assets';
import './main2';
import './main3';
import './main4';
import './maps';

import extra from '../extra';

game.preload('hackforplay/bar_green.png', 'hackforplay/bar_red.png');


function gameStart() {

	// map1 を読み込む
	Hack.changeMap('map1');

	// 魔道書を開く
	feeles.openCode('stages/6/code1.js');

	// 解説の youtube を開く
	const youtube = new RPGObject();
	youtube.mod(Hack.assets.village);
	youtube.locate(0, 4);
	youtube.onplayerenter = () => {
		feeles.openMedia({
			url: 'https://youtu.be/yfwUHmf0DYA',
			playing: true,
			controls: true,
			volume: 0.2
		});
	};

	// 説明書を開く
	// feeles.openReadme('stages/6/README.md');


	// プレイヤー（騎士）
	const player = Hack.player = new Player();
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
	feeles.setAlias('player', player);


	/*+ ゲーム */


	// 	HP Gage
	// 体力のゲージを作る
	// 体力は最大で 9999
	const MAX = 9999;
	const bar = new Sprite(480, 32);
	bar.image = game.assets['hackforplay/bar_green.png'];
	// 体力ゲージの位置
	bar.moveTo(0, 300);
	// 体力ゲージを更新する...
	bar.onenterframe = () => {
		// プレイヤーの体力が、体力の最大値を超えないようにする
		Hack.player.hp = Math.min(Hack.player.hp, MAX);
		// 体力ゲージの長さを更新する
		bar.width = 480 * Hack.player.hp / MAX;
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
	};

	// 魔道書にコウモリを登録する
	feeles.setAlias('bat', item1);

	// かいだん
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _nのぼりかいだん));
	// 階段を 14, 5　の位置に配置する ( map1 )
	item2.locate(14, 5, 'map1');
	// 階段を下の方に置く
	item2.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item2.onのった = () => {
		// 説明書 2 を開く
		// feeles.openReadme('stages/6/README2.md');
		// 魔道書の 2 ページ目を開く
		feeles.openCode('stages/6/code2.js');
		// マップ map2 に移動する
		Hack.changeMap('map2');
		// プレイヤーを 0, 5 の位置に移動する ( map2 )
		Hack.player.locate(0, 5, 'map2');
	};

	// このステージを改造
	extra(0, 5, 'map1', 'stages/6/main.js');
}


game.onload = gameStart;

Hack.start();
