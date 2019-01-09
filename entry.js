if (FEELES_OFFILE_MODE) {
	window.h4p = require('feeles-ide/umd/index').h4p
	load()
} else {
	const script = document.createElement('script')
	script.src = 'https://unpkg.com/feeles-ide@latest/umd/index.js'
	document.body.appendChild(script)
	script.addEventListener('load', load)
}

function load() {
	fetch('https://storage.googleapis.com/hackforplay-assets/beta-1')
		.then(response => response.text())
		.then(text => {
			window.h4p({
				jsonURL: './index.json',
				asset: JSON.parse(text),
				rootElement: document.querySelector('.h4p__app')
			})
		})
}
