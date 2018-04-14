import Assets from 'hackforplay/Assets';
import {
	gameclear
} from 'utils';
import extra from '../extra';
import './maps';



function gameStart() {

	// map1 を読み込む
	Hack.changeMap('map1');

	// // 解説の youtube を開く
	feeles.openMedia({
		url: 'https://youtu.be/d6KR-zfLA7c',
		playing: true,
		controls: true,
		volume: 0.2
	});

	// 説明書を表示する
	// feeles.openReadme('stages/2/README.md');

	// プレイヤー（騎士）
	const player = Hack.player = new Player();
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
	feeles.setAlias('player', player);


	


	// まどうしょ
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _m魔道書));
	// 魔道書を 4, 4 の位置に移動する
	item1.locate(4, 4);
	// 魔道書にプレイヤーが乗ったら...
	item1.onのった = () => {
		// 説明書 2 を開く
		// feeles.openReadme('stages/2/README2.md');
		// 魔道書を開く
		feeles.openCode('stages/2/code.js');
		// 魔道書を削除
		item1.destroy();
	};

	// かいだん
	const item4 = new RPGObject();
	item4.mod(('▼ スキン', _kくだりかいだん));
	// 階段を 13, 6 の位置に移動する ( map1 )
	item4.locate(13, 6, 'map1');
	// 階段は下の方に配置する ( Under )
	item4.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item4.onのった = () => {
		// 次のステージに！
		feeles.replace('stages/3/index.html');
	};

	// このステージを改造
	extra(1, 1, 'map1', 'stages/2/main.js');
}


game.onload = gameStart;

Hack.start();
