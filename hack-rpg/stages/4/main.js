import { enchant, Hack, register } from 'https://unpkg.com/@hackforplay/common@^0.10';
import main2 from './main2';
import extra from '../extra';
import { createMap1, createMap2 } from './maps';
import { prepareUtils } from '../../utils';

register(window);
prepareUtils();

function gameStart() {
	game.dispatchEvent(new enchant.Event('awake'));

	// map1 を読み込む
	Hack.changeMap('map1');

	// コードをとじる
	feeles.closeCode();

	// 解説の youtube を開く
	// const youtube = new RPGObject();
	// youtube.mod(Hack.assets.village);
	// youtube.locate(0, 4);
	// youtube.on('addtrodden', event => {
	// 	if (event.item === Hack.player) {
	// 		feeles.openMedia({
	// 			url: 'https://youtu.be/laR6MY6IiJQ',
	// 			playing: true,
	// 			controls: true,
	// 			volume: 0.2
	// 		});
	// 	}
	// });

	// 説明書を開く
	// feeles.openReadme('stages/4/README.md');

	// プレイヤー（騎士）
	const player = (Hack.player = new Player(('▼ スキン', _kきし)));
	player.mod(('▼ スキン', _kきし));
	// プレイヤーを　3, 5 の位置に移動する
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

	// ATK Label
	// 攻撃力を画面に表示する
	var atkLabel = new ScoreLabel();
	// 攻撃力を表示するときの名称
	atkLabel.label = 'ATK:';
	// 攻撃力を表示する位置
	atkLabel.moveTo(Hack.menuGroup.x + 10, Hack.menuGroup.y + 104);
	atkLabel.onenterframe = () => {
		atkLabel.score = Hack.player.atk;
	};
	Hack.menuGroup.addChild(atkLabel);

	// コウモリ
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _kこうもり));
	// コウモリを 11, 5 の位置に移動する ( map1 )
	item1.locate(11, 5, 'map1');
	//　コウモリを更新する...
	item1.onつねに = () => {
		// コウモリの縦の位置をプレイヤーと同じにする
		item1.y = Hack.player.y;
		item1.updateCollider();
	};
	item1.onattacked = () => {
		Hack.logFunc('こうげきは かわされた\nけんは あたらないようだ', true);
	};

	// 魔道書にコウモリを登録する
	feeles.setAlias('コウモリ', item1);

	// かいだん
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _kくだりかいだん));
	// 階段を 7, 1 の位置に移動する ( map1 )
	item2.locate(7, 1, 'map1');
	// 階段を下の方に置く ( Under )
	item2.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item2.onふまれた = event => {
		if (event.item === Hack.player) {
			// 説明書 2 を表示する
			// feeles.openReadme('stages/4/README2.md');
			// 魔道書を開く
			feeles.openCode('stages/4/code.js');
			// マップ map2 に移動する
			Hack.changeMap('map2');
			// プレイヤーを 7, 7 の位置に移動する ( map2 )
			Hack.player.locate(7, 7, 'map2');
		}
	};

	// このステージを改造
	extra(0, 5, 'map1', 'stages/4/main.js');
}

game.onload = gameStart;
game.on('load', main2);
Hack.on('load', createMap1);
Hack.on('load', createMap2);
Hack.start();
