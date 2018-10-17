if (FEELES_OFFILE_MODE) {
	window.h4p = require('feeles-ide/umd/index').h4p;
	load();
} else {
	const script = document.createElement('script');
	script.src = 'https://unpkg.com/feeles-ide@latest/umd/index.js';
	document.body.appendChild(script);
	script.addEventListener('load', load);
}

function load() {
	window.h4p({
		jsonURL: './index.json',
		rootElement: document.querySelector('.h4p__app')
	});
}
