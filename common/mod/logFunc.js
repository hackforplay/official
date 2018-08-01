import Hack from '../hackforplay/hack';
import TextArea from '../hackforplay/ui/textarea';

const messages = []; // 一旦メッセージを貯めておくキュー

// 関数の戻り値が undefined であるときの挙動が不明瞭
// next() を複数回呼べるのはよくない
// そもそもキューイングは必要か？全部 immediately で良くないか？

/**
 * 画面にメッセージと OK ボタンを表示する
 * @param {string|Function} text
 * @param immediately
 */
export default function logFunc(text, immediately = false) {
	if (immediately) {
		// 他のメッセージを全て消去し, 直ちに表示する
		messages.splice(0, messages.length, text);
	} else {
		// 直前に追加したメッセージと全く同じでなければ追加
		// 参照を比べる方法はよくない. 全部 immediately にするか,
		// 厳密に toString() するなどして比較すべき
		const tail = messages[messages.length - 1];
		if (tail !== text) {
			messages.push(text);
		}
	}
	if (messages.length === 1) {
		show();
	}
}

/**
 * ある座標にいる時にだけログを表示する
 * @param {String} text
 * @param {Number} x
 * @param {Number} y
 */
export function logAtPoint(text, x, y) {
	logFunc(next => {
		const player = window.player || Hack.player;
		if (!player) return next();
		if (player.mapX !== x || player.mapY !== y) return next();
		return text;
	});
}

// canvas のテキストエリアを生成
const textArea = new TextArea(480, 200);
textArea.x = (480 - textArea.w) / 2;
textArea.y = 0;
textArea.margin = 14;
textArea.defaultStyle = {
	color: '#fff',
	size: '18',
	family: 'PixelMplus, sans-serif',
	weight: 'bold',
	align: 'center',
	space: 0,
	ruby: null,
	rubyId: null
};
const okButton = new TextArea(200, 38);
okButton.x = (480 - okButton.w) / 2;
okButton.y = textArea.h - 64;
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

export function goNext() {
	// OK ボタンが押された時
	messages.shift();
	if (messages.length === 0) {
		// 閉じる
		hide();
	} else {
		show();
	}
}

export function handleOkButtonPush() {
	if (!okButton.visible) return;
	// OK ボタンが押された時
	const [currentMessage] = messages;
	switch (typeof currentMessage) {
		case 'string':
			// テキスト送り
			messages.shift();
			if (messages.length === 0) {
				// 閉じる
				hide();
			}
			break;
		case 'function':
			// 一時的に隠す
			hide();
		default:
			break;
	}
}

okButton.on('touchend', handleOkButtonPush);

Hack.on('gameclear', hide); // ゲームクリア時閉じる
Hack.on('gameover', hide); // ゲームオーバー時閉じる
okButton.push('OK');

game.on('awake', () => {
	Hack.popupGroup.addChild(textArea);
	Hack.popupGroup.addChild(okButton);
});

game.on('enterframe', () => {
	const [currentMessage] = messages;
	switch (typeof currentMessage) {
		case 'string':
			// テキストをそのまま表示
			if (!currentMessage || textArea.source === currentMessage) {
				// 次のメッセージに移る
				goNext();
			} else {
				textArea.clear(); // 前の文章をクリア
				textArea.push(currentMessage); // テキストを挿入
			}
			break;
		case 'function':
			let text;
			try {
				text = currentMessage(goNext);
			} catch (error) {
				// 次のメッセージに移る
				goNext();
				break;
			}
			if (text === '' || textArea.source === text) {
				// もし空文字であれば, 一時的に隠す
				textArea.hide();
				okButton.hide();
			} else if (text) {
				textArea.clear(); // 前の文章をクリア
				textArea.push(text); // テキストを挿入
				updateVisibility();
			}
			break;
		default:
			break;
	}
});

let enabled = true;

export function hide() {
	enabled = false;
	updateVisibility();
}

export function show() {
	enabled = true;
	updateVisibility();
}

function updateVisibility() {
	if (enabled) {
		textArea.show();
		okButton.show();
	} else {
		textArea.hide();
		okButton.hide();
	}
}

/**
 *
 * @param {Number} height
 */
export function setHeight(height) {
	textArea.h = height;
	okButton.y = textArea.h - 64;
}
