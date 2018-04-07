import Assets from 'hackforplay/Assets';
import {
	gameclear
} from 'utils';
import extra from '../extra';


function gameStartLazy() {


	/*+ ゲーム */


	// クモ
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _kくも));
	// クモを 7, 4 の位置に移動する ( map2 )
	item1.locate(7, 4, 'map2');
	// クモを更新する...
	item1.onつねに = () => {
		// クモの横の位置をプレイヤーと同じにする
		item1.x = Hack.player.x;
	};

	// 魔道書にクモを登録する
	feeles.setAlias('spider', item1);

	// ダイアモンド
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _dダイヤモンド));
	// ダイアモンドを 4, 7 の位置に移動する ( map2 )
	item2.locate(4, 7, 'map2');
	// ダイアモンドにプレイヤーが乗ったら...
	item2.onのった = () => {
		// ダイアモンドを削除する
		item2.destroy();
		// スコアを 100 アップ！
		Hack.score += 100;
	};

	// 魔道書にクモを登録する
	feeles.setAlias('diamond', item2);

	// かいだん
	const item3 = new RPGObject();
	item3.mod(('▼ スキン', _kくだりかいだん));
	// 階段を 7, 0 の位置に移動する ( map2 )
	item3.locate(7, 0, 'map2');
	//　階段を下の方に置く ( Under )
	item3.layer = RPGMap.Layer.Under;
	// 階段にプレイヤーが乗ったら
	item3.onのった = () => {
		// マップ map1 に移動
		Hack.changeMap('map1');
		// プレイヤーを 7, 8 の位置に移動する ( map1 )
		Hack.player.locate(7, 8, 'map1');
		// もしスコアが 100 以上なら...
		if (Hack.score >= 100) {
			// 次のステージに！
			gameclear('stages/6/index.html');
		}
	};

	// このステージを改造
	extra(5, 1, 'map2', 'stages/5/main2.js');
}


game.on('load', gameStartLazy);
