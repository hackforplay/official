import 'hackforplay/core';
import extra from '../extra';
import TextArea from 'hackforplay/ui/textarea';

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
		Hack.overlayGroup.addChild(dark);
		dark.tl
			.delay(30)
			.then(function() {
				Hack.menuGroup.parentNode.removeChild(Hack.menuGroup);
			})
			.fadeIn(90, enchant.Easing.CUBIC_EASEOUT)
			.then(function() {
				const textArea = new TextArea(480, 320);
				textArea.x = (480 - textArea.w) / 2;
				textArea.y = 0;
				textArea.margin = 20;
				textArea.defaultStyle = {
					color: '#fff',
					size: '32',
					family: 'PixelMplus, sans-serif',
					weight: 'bold',
					align: 'center',
					space: 0,
					ruby: null,
					rubyId: null
				};
				Hack.overlayGroup.addChild(textArea);
				textArea.push(`
ゲームクリア おめでとう！
つぎは なにをしますか？`);
				textArea.show();

				button('ほかのステージであそぶ', 130).ontouchend = () => {
					window.open('https://www.hackforplay.xyz/lists/trending');
				};
				button('自分のステージをつくる', 180).ontouchend = () => {
					window.open('https://www.hackforplay.xyz/officials/make-rpg');
				};
				button('もういちどあそぶ', 230).ontouchend = () => {
					feeles.replace('stages/1/index.html');
				};
			});

		function button(text, y) {
			const btn = new TextArea(300, 38);
			btn.x = (480 - btn.w) / 2;
			btn.y = y;
			btn.margin = 0;
			btn.padding = 8;
			btn.background = 'rgb(251, 147, 36)';
			btn.defaultStyle = {
				color: '#fff',
				size: '20',
				family: 'PixelMplus, sans-serif',
				weight: 'bold',
				align: 'center',
				space: 0,
				ruby: null,
				rubyId: null
			};
			Hack.overlayGroup.addChild(btn);
			btn.push(text);
			btn.show();
			return btn;
		}
	}

	// このステージを改造
	extra(13, 7, 'map4', 'stages/6/main4.js');
}

game.on('load', gameStartLazy);
