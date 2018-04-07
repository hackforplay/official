import Assets from 'hackforplay/Assets';
import {
	gameclear
} from 'utils';
import extra from '../extra';
import './maps';


function gameStart() {

	// map1 を読み込む
	Hack.changeMap('map1');

	// 解説の youtube を開く
	const youtube = new RPGObject();
	youtube.mod(Hack.assets.village);
	youtube.locate(6, 3);
	youtube.onplayerenter = () => {
		feeles.openMedia({
			url: 'https://youtu.be/VDPRV91o984',
			playing: true,
			controls: true,
			volume: 0.2
		});
	};

	// 説明書を表示する
	// feeles.openReadme('stages/1/README.md');

	// プレイヤー（騎士）
	const player = Hack.player = new Player();
	player.mod(('▼ スキン', _kきし));
	// プレイヤーを　3,　5 の位置に移動する
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



	/*+ ゲーム */


	// スライム
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _sスライム));
	// スライムの体力
	item1.hp = 3;
	// スライムの攻撃力
	item1.atk = 1;
	// スライムを 9, 5 の位置に移動する ( map1 )
	item1.locate(9, 5, 'map1');
	// スライムが攻撃されたら
	item1.on('attacked', () => {
		// 1.4秒後に...
		setTimeout(() => {
			if (item1.behavior === BehaviorTypes.Idle) {
				// 反撃する！（攻撃する）
				item1.attack();
			}
		}, 1400);
		// 1400 は、 1.4 秒のこと
	});



	// 階段
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _kくだりかいだん));
	// 階段を 12, 5 の位置に移動 ( map1 )
	item2.locate(12, 5, 'map1');
	// 階段にプレイヤーが乗ったら...
	item2.onのった = () => {
		// 次のステージに！
		feeles.replace('stages/3/index.html');
	};

	// そうさせつめい (1)
	const {
		mapX,
		mapY
	} = player; // もとのいち
	setTimeout(() => {
		// ６秒たったら...
		if (player.mapX === mapX && player.mapY === mapY) {
			// プレイヤーのいちが同じなら、せつめいを出す
			Hack.log('十字のボタンを おしてみて');
		}
	}, 6000);

	// そうさせつめい (2)
	let isAttacked = false; // こうげき したことがあるか
	player.on('becomeattack', () => isAttacked = true);
	setTimeout(() => {
		// １５秒たったら...
		if (!isAttacked) {
			Hack.log('剣のボタンを おしてみて');
		}
	}, 15000);

	// そうさせつめい (3)
	const {
		hp
	} = item1; // もとの HP (スライム)
	setTimeout(() => {
		// ２０秒たったら...
		if (item1.hp === hp) {
			Hack.log('スライムに ちかづいて こうげきしよう！');
		}
	}, 20000);


	// このステージを改造
	extra(6, 9, 'map1', 'stages/1/main.js');
}


game.onload = gameStart;
Hack.start();
