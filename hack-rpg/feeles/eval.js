let isShowingErrorMessage = false;

export default function(code, raw) {
	// エラーメッセージを消す
	if (isShowingErrorMessage) {
		Hack.logFunc('', true);
	}
	// 魔道書の実行をフック
	try {
		// eval
		eval(code);
		const event = new enchant.Event('evaled');
		event.code = raw;
		event.evaledCode = code;
		Hack.dispatchEvent(event);
	} catch (error) {
		console.error(error);
		const message = errorMessage(error);
		// 次に eval されるか, OK ボタンが押されたら消える
		isShowingErrorMessage = true;
		Hack.logFunc(message, true).then(() => {
			isShowingErrorMessage = false;
		});
	}
}

function errorMessage(error) {
	switch (error.message) {
		// SyntaxError
		case 'Unexpected end of input':
			return 'すうじが きえてしまった みたいだ\n「=」の あとに なにか すうじを かこう';
		case 'Unexpected number':
			return '= を けして いませんか？\nもしくは\n, を けして いませんか？\nこまったら「元にもどす」を つかおう';
		// Unknown Error
		default:
			return 'コードに エラーが あるみたいだ\nこまったら「元にもどす」して もういちど かこう';
	}
}
