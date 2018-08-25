import enchant from '../enchantjs/enchant';
import Hack from '../hackforplay/hack';

export default function(code, raw) {
	// 魔道書の実行をフック
	try {
		// eval
		eval(code);
		const event = new enchant.Event('evaled');
		event.code = raw;
		event.evaledCode = code;
		Hack.dispatchEvent(event);
	} catch (error) {
		const message = errorMessage(error);
		// 次に eval されるか, OK ボタンが押されたら消える
		Hack.logFunc(message, true);
	}
}

function errorMessage(error) {
	switch (error.message) {
		// SyntaxError
		case 'Unexpected end of input':
			return 'すうじが きえてしまった みたいだ\n「=」の あとに なにか すうじを かこう';
		case 'Unexpected number':
			return 'こんなふうに かいてみよう\n〇〇.hp = 1\n「=」は けさずに すうじを かくよ\nこまったら「元にもどす」を つかおう';
		// Unknown Error
		default:
			return 'コードに エラーが あるみたいだ\nこまったら「元にもどす」して もういちど かこう';
	}
}
