import extra from '../extra';

export default function gameStartLazy() {
	const logたいりょく = next =>
		Hack.player.hp < 3
			? `
たいりょくが あぶない！
のこり hp : ${Hack.player.hp}`
			: next();
	Hack.player.on('hpchange', () => {
		Hack.logFunc(logたいりょく);
	});

	// ドラゴン
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _dドラゴン));
	// ドラゴンの体力
	item1.hp = 16;
	// ドラゴンの位置を調整する
	item1.offset = {
		x: -32,
		y: -60
	};
	item1.collider.setOffset({
		x: 16,
		y: 48
	});
	// ドラゴンを 11, 5 の位置に移動する ( map2 )
	item1.locate(11, 5, 'map2');
	// ドラゴンを拡大する ( ２　倍に　)
	item1.scale(2, 2);
	// ドラゴンの動きを設定する
	item1.setFrame('Idle', [10]);
	//　ドラゴンを更新する...
	item1.breath({
		skin: ('▼ スキン', Skin.バクエン),
		speed: 5,
		scale: 1
	});
	Object.defineProperty(item1, 'atk', {
		get: function() {
			const damage = Hack.player.hp <= 3 ? 1 : 450;
			return damage;
		}
	});

	// dragon をコードから利用可能に
	feeles.setAlias('ドラゴン', item1);

	// 	Life gage
	// 体力ゲージを作る
	const MAX = item1.hp;
	const bar1 = new Sprite(480, 32);
	bar1.image = game.assets['hackforplay/bar_red.png'];
	// 体力ゲージの位置
	bar1.moveTo(0, 0);
	// 体力ゲージを更新する...
	bar1.onenterframe = () => {
		// map2 じゃないなら表示しない
		bar1.visible = Hack.map === Hack.maps['map2'];
		item1.hp = Math.min(item1.hp, MAX);
		// ゲージの長さを設定する
		bar1.width = (480 * item1.hp) / MAX;
	};
	Hack.menuGroup.addChild(bar1);

	// ルビー
	const item2 = new RPGObject();
	item2.mod(('▼ スキン', _rルビー));
	// ルビーを 11, 5 の位置に移動する ( map2 )
	item2.locate(11, 5, 'map2');
	// ルビーにプレイヤーが乗ったら...
	item2.onふまれた = event => {
		if (event.item === Hack.player) {
			// 階段を作る！
			// もう少し下のところに階段を作るコードが書いてあるよ！
			appearDownStair();
			// ルビーを削除する
			item2.destroy();
		}
	};

	// ruby をコードから利用可能に
	feeles.setAlias('ルビー', item2);

	// 階段を作るコード （ 関数 )
	function appearDownStair() {
		// かいだん
		const item3 = new RPGObject();
		item3.mod(('▼ スキン', _kくだりかいだん));
		// 階段を 14, 5 の位置に移動する ( map2 )
		item3.locate(14, 5, 'map2');
		// 階段にプレイヤーが乗ったら...
		item3.onふまれた = event => {
			if (event.item === Hack.player) {
				// マップ map3 に移動する
				Hack.changeMap('map3');
				// プレイヤーを 2, 5 の位置に移動する ( map3 )
				Hack.player.locate(2, 5, 'map3');
				// 説明書 3 を表示する
				// feeles.openReadme('stages/6/README3.md');
			}
		};
	}

	// このステージを改造
	extra(0, 0, 'map2', 'stages/6/main2.js');
}
