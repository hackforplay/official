import Assets from 'hackforplay/Assets';
import {
	gameclear
} from 'utils';
import extra from '../extra';


function gameStartLazy() {


	


	// しろ
	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _sしろ));
	// 城の透明度（うすさ）を 0 にする（見えなくする）
	item1.opacity = 0;
	// 城を 13, 5 の位置に移動する ( map4 )
	item1.locate(13, 5, 'map4');
	// 城にプレイヤーが乗ったら...
	item1.onのった = () => {
		// 城を削除する
		item1.destroy();
		// ゲームクリアー！！！！！！
		gameclear();
	};


	// ゲームクリアのコード　（　関数 )
	function gameclear() {

		// 画面を暗くする
		const dark = Hack.overlay('rgb(0,0,0,1)');
		dark.opacity = 0;
		game.rootScene.addChild(dark);
		dark.tl.delay(30).then(function() {
			Hack.menuGroup.parentNode.removeChild(Hack.menuGroup);
		}).fadeIn(90, enchant.Easing.CUBIC_EASEOUT).then(function() {

			// ALL CLEAR と表示する
			const label = new Label('ALL CLEAR');
			label.width = 480;
			label.moveTo(0, 100);
			label.color = 'white';
			label.textAlign = 'center';
			label.opacity = 0;
			label.tl.fadeIn(20);
			game.rootScene.addChild(label);

			// ハートを表示する
			const treasure = new Sprite(32, 32);
			treasure.image = game.assets['enchantjs/x2/map1.gif'];
			treasure.moveTo(224, 150);
			treasure.frame = 563;
			treasure.opacity = 0;
			treasure.tl.delay(40).fadeIn(20).then(() => {
				// 最後の説明書を表示する
				feeles.openReadme('THANKS.md');
			});
			game.rootScene.addChild(treasure);

		});

	}

	// このステージを改造
	extra(13, 7, 'map4', 'stages/6/main4.js');
}


game.on('load', gameStartLazy);
