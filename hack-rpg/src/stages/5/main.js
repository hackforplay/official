import 'hackforplay/core';
import './main2';
import './maps';

import extra from '../extra';

function gameStart() {
	game.dispatchEvent(new enchant.Event('awake'));

	// map1 を読み込む
	Hack.changeMap('map1');

	// 魔道書を開く
	feeles.openCode('stages/5/code1.js');

	// 解説の youtube を開く
	const youtube = new RPGObject();
	youtube.mod(Hack.assets.village);
	youtube.locate(0, 4);
	youtube.onplayerenter = () => {
		feeles.openMedia({
			url: 'https://youtu.be/sHlxu5U94U0',
			playing: true,
			controls: true,
			volume: 0.2
		});
	};

	// 説明書を開く
	// feeles.openReadme('stages/5/README.md');

	// プレイヤー（騎士）
	const player = (Hack.player = new Player());
	player.mod(('▼ スキン', _kきし));
	// プレイヤーを　7, 2 の位置に移動する
	player.locate(7, 2);
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
	const item4 = new RPGObject();
	item4.mod(('▼ スキン', _kこうもり));
	// コウモリを 11, 5 の位置に移動する ( map1 )
	item4.locate(11, 5, 'map1');
	//　コウモリを更新する...
	item4.onつねに = () => {
		// コウモリの縦の位置をプレイヤーと同じにする
		item4.y = Hack.player.y;
	};

	// 魔道書にコウモリを登録する
	feeles.setAlias('コウモリ', item4);

	// かいだん
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _nのぼりかいだん));
	// 階段を 7, 8 の位置に移動する ( map1 )
	item2.locate(7, 8, 'map1');
	// 階段を下の方に置く ( Under )
	item2.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item2.onのった = () => {
		// 説明書 2 を開く
		// feeles.openReadme('stages/5/README2.md');
		// 魔道書の 2 ページ目をを開く
		feeles.openCode('stages/5/code2.js');
		// マップ map2 に移動する
		Hack.changeMap('map2');
		// プレイヤーを 7, 1 の位置に配置する ( map2 )
		Hack.player.locate(7, 1, 'map2');
	};

	// 赤スライム軍団

	// 0 ならスライムは出ないけど、
	// 1 ならスライムが出る！
	// ためしに数値を書き換えてみよう！
	let count = 0;
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
	].forEach((array, y) => {
		array.forEach((flag, x) => {
			if (!flag) return;

			// スライム
			const item3 = new RPGObject();
			item3.mod(('▼ スキン', _sスライム));
			// スライムの体力
			item3.hp = 999;
			// スライムの色を red (赤色) にする
			item3.color = 'red';
			// スライムを　x, y の位置に配置する ( map1 )
			item3.locate(x, y, 'map1');
			// スライムが倒されたら...
			item3.onたおれたとき = () => {
				// スコアアップ！
				Hack.score++;
			};

			// 魔道書にスライムを登録する
			feeles.setAlias([`スライム${++count}`], item3);
		});
	});

	// このステージを改造
	extra(0, 5, 'map1', 'stages/5/main.js');
}

game.onload = gameStart;

Hack.start();
