/**
 * @param next String 次に読み込むHTMLのパス
 */
export function gameclear(next) {
	Hack.gameclear();

	const button = new Sprite(165, 69);
	button.image = game.assets['hackforplay/new_button_next.png'];
	button.moveTo(156, 320);
	button.ontouchend = () => {
		feeles.replace(next);
	};
	button.tl.delay(20).moveBy(0, -100, 10);
	Hack.overlayGroup.addChild(button);

	Hack.player.destroy();
}

const messages = []; // 一旦メッセージを貯めておくキュー

/**
 * 画面にメッセージと OK ボタンを表示する
 * @param {string|Function} text
 */
export function log(text) {
	const tail = messages[messages.length - 1];
	if (tail !== text) {
		// 全く同じでなければ追加
		messages.push(text);
	}
}

export function prepareUtils() {
	// canvas のテキストエリアを生成
	const textArea = new TextArea(480, 160);
	textArea.x = (480 - textArea.w) / 2;
	textArea.y = 0;
	textArea.margin = 14;
	textArea.defaultStyle = {
		color: '#fff',
		size: '20',
		family: 'PixelMplus, sans-serif',
		weight: 'bold',
		align: 'center',
		space: 0,
		ruby: null,
		rubyId: null
	};
	const okButton = new TextArea(200, 38);
	okButton.x = (480 - okButton.w) / 2;
	okButton.y = 96;
	okButton.margin = 0;
	okButton.padding = 8;
	okButton.background = 'rgb(251, 147, 36)';
	okButton.defaultStyle = {
		color: '#fff',
		size: '20',
		family: 'PixelMplus, sans-serif',
		weight: 'bold',
		align: 'center',
		space: 0,
		ruby: null,
		rubyId: null
	};
	okButton.ontouchend = () => {
		// OK ボタンが押された時
		messages.shift();
		if (messages.length === 0) {
			// 閉じる
			hide();
		}
	};
	Hack.on('gameclear', hide); // ゲームクリア時閉じる
	Hack.on('gameover', hide); // ゲームオーバー時閉じる
	okButton.push('OK');

	game.on('awake', () => {
		Hack.menuGroup.addChild(textArea);
		Hack.menuGroup.addChild(okButton);
	});

	game.on('enterframe', () => {
		const [currentMessage] = messages;
		switch (typeof currentMessage) {
			case 'string':
				// テキストをそのまま表示
				showText(currentMessage);
				break;
			case 'function':
				const text = currentMessage();
				showText(text);
			default:
				break;
		}
	});

	let preventText = '';
	function showText(text) {
		if (!text) {
			// 次のメッセージに移る (OK を押したことにする)
			okButton.ontouchend();
		} else if (preventText !== text) {
			textArea.clear(); // 前の文章をクリア
			textArea.push(text); // テキストを挿入
			textArea.show();
			okButton.show();
			preventText = text; // 同じ文章をスキップするために保持
		}
	}

	function hide() {
		textArea.hide();
		okButton.hide();
	}
}
