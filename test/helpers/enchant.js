import Window from 'window';
import 'canvas-prebuilt';

// enchant.js のための global injection
global.window = new Window();
Object.keys(window).forEach(key => {
	const d = Object.getOwnPropertyDescriptor(global, key);
	if (!d || (d.configurable && (d.writable || d.set))) {
		// set できるプロパティは全部入れる (適当)
		global[key] = window[key];
	}
});

const enchant = require('../../common/enchantjs/enchant');
export default enchant;