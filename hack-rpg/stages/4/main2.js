import 'hackforplay/core';
import { gameclear, log } from 'utils';
import extra from '../extra';

function gameStartLazy() {
	// サファイア
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _sサファイア));
	// サファイアを 13, 2 の位置に移動する ( map2 )
	item1.locate(13, 2, 'map2');
	// サファイアにプレイヤーが乗ったら...
	item1.onのった = () => {
		// サファイアを削除する
		item1.destroy();
		// スコアを　１００ アップ！
		Hack.score += 100;
		log(`
サファイアを 手に入れた！
さっきのへやに もどろう`);
	};

	// 魔道書にサファイアを登録
	feeles.setAlias('サファイア', item1);

	// かいだん
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _nのぼりかいだん));
	// 階段を 7, 8 の位置に移動する ( map2 )
	item2.locate(7, 8, 'map2');
	// 階段は下の方に置く ( Under )
	item2.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら...
	item2.onのった = () => {
		// マップ map1 に移動する
		Hack.changeMap('map1');
		// プレイヤーを 7, 2 の位置に移動する ( map1 )
		Hack.player.locate(7, 2, 'map1');
		// もしスコアが 100 以上なら...
		if (Hack.score >= 100) {
			// 次のステージに！
			gameclear('stages/5/index.html');
		}
	};

	// スライム軍団をつくる

	// 0 ならスライムは出ないけど、
	// 1 ならスライムが出る！
	// ためしに数値を書き換えてみよう！
	let count = 0;
	[
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	].forEach((array, y) => {
		array.forEach((flag, x) => {
			if (!flag) return;

			// スライム
			const item3 = new RPGObject();
			item3.mod(('▼ スキン', _sスライム));
			// スライムの体力
			item3.hp = 999;
			// スライムを　x, y の位置に配置する ( map2 )
			item3.locate(x, y, 'map2');
			// スライムが倒されたら...
			item3.onたおれたとき = function() {
				// スコアアップ！
				Hack.score++;
			};
			item3.on('attacked', function needAtk() {
				log(
					() =>
						Hack.player.atk < 100
							? `
もっと こうげきりょくが ひつようだ

こうげきりょく（atk）：${Hack.player.atk}`
							: ''
				);
			});

			// 魔道書にスライムを登録する
			feeles.setAlias([`スライム${++count}`], item3);
		});
	});

	// このステージを改造
	extra(9, 9, 'map2', 'stages/4/main2.js');
}

game.on('load', gameStartLazy);
