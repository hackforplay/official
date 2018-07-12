import 'hackforplay/core';
import { gameclear, log } from 'utils';
import extra from '../extra';
import './maps';

function gameStart() {
	game.dispatchEvent(new enchant.Event('awake'));

	// map1 を読み込む
	Hack.changeMap('map1');

	// 魔道書を使う
	feeles.openCode('stages/3/code.js');

	// 解説の youtube を開く
	feeles.openMedia({
		url: 'https://www.youtube.com/embed/no7ch0jTHRc'
	});

	// 説明書を表示する
	// feeles.openReadme('stages/3/README.md');

	// プレイヤー（騎士）
	const player = (Hack.player = new Player(('▼ スキン', _kきし)));
	player.mod(('▼ スキン', _kきし));
	// プレイヤーを　7, 1 の位置に移動する
	player.locate(7, 1);
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

	// かいだん
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _kくだりかいだん));
	// 階段を 14, 6 の位置に移動する ( map1 )
	item1.locate(14, 6, 'map1');
	// 階段の透明度（うすさ）を 0 にする（見えなくする）
	item1.opacity = 0;
	// 階段は下の方に置く ( Under )
	item1.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item1.onふまれた = event => {
		if (event.item === Hack.player) {
			// 次のステージに！
			gameclear('stages/4/index.html');
		}
	};

	// 魔道書に階段を登録する
	feeles.setAlias('カイダン', item1);

	// このステージを改造
	extra(7, 0, 'map1', 'stages/3/main.js');
}

game.onload = gameStart;

Hack.start();
