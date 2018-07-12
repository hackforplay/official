import 'hackforplay/core';
import { gameclear, log } from 'utils';
import extra from '../extra';

function gameStartLazy() {
	// プレイヤーが map3 に入ったら
	Hack.maps['map3'].onload = () => {
		// コードをとじる
		feeles.closeCode();
		// YouTubeをとじる
		feeles.closeMedia();
	};

	// かいだん
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _nのぼりかいだん));
	// 階段を 14, 5 の位置に移動する　( map3 )
	item1.locate(14, 5, 'map3');
	// 階段を下の方に置く ( Under )
	item1.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item1.onふまれた = event => {
		if (event.item === Hack.player) {
			// プレイヤーを 2, 5 の位置に移動する ( map4 )
			Hack.player.locate(2, 5, 'map4');
			// マップ map4 に移動する
			Hack.changeMap('map4');
			// 説明書 4 を表示する
			// feeles.openReadme('stages/6/README4.md');
		}
	};

	// 宝箱とコインをたくさん作る
	// 0 なら何も出ないけど、
	// 1 なら宝箱が出るし、
	// 2 ならコインが出る！
	// ためしに数値を書き換えてみよう！
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	].forEach((array, y) => {
		array.forEach((value, x) => {
			// もし数値が 1 なら...
			if (value === 1) {
				// 宝箱を出す！
				appearBox(x, y);
			}
			// もし数値が 2 なら...
			if (value === 2) {
				// コインを出す！
				appearCoin(x, y);
			}
		});
	});

	// 宝箱を作るコード （ 関数 ）
	function appearBox(x, y) {
		// はこ
		const item1 = new RPGObject();
		item1.mod(('▼ スキン', _tたからばこ));
		// 宝箱を x, y の位置に移動する ( map3 )
		item1.locate(x, y, 'map3');
		// 宝箱にプレイヤーが乗ったら...
		item1.onふまれた = event => {
			if (event.item === Hack.player) {
				// 宝箱を削除する
				item1.destroy();
				// スコアを 400　アップ！！！！
				Hack.score += 400;
			}
		};
		return item1;
	}

	//　コインを作るコード （ 関数 ）
	function appearCoin(x, y) {
		// コイン
		const item1 = new RPGObject();
		item1.mod(('▼ スキン', _kコイン));
		// コインを x, y の位置に作る　( map3 )
		item1.locate(x, y, 'map3');
		// コインにプレイヤーが乗ったら...
		item1.onふまれた = event => {
			if (event.item === Hack.player) {
				// コインを削除する
				item1.destroy();
				// スコアを 400 アップ！！！！
				Hack.score += 400;
			}
		};
		return item1;
	}

	// このステージを改造
	extra(0, 0, 'map3', 'stages/6/main3.js');
}

game.on('load', gameStartLazy);
