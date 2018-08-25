import Hack from '../hackforplay/hack';

export default function stopOnBlur() {
	const pause = document.createElement('h1');
	pause.textContent = 'PAUSE ⏸';
	pause.style.color = 'white';
	pause.style.textAlign = 'center';
	pause.style.position = 'absolute';
	pause.style.margin = '0';

	const updateStyle = () => {
		if (this._element) {
			this._element.style.opacity = document.hasFocus() ? 1.0 : 0.3;
		}
		if (Hack.world) {
			if (document.hasFocus()) {
				Hack.world.resume();
			} else {
				Hack.world.stop();
			}
		}
		if (document.hasFocus()) {
			if (pause.parentElement === document.body) {
				document.body.removeChild(pause);
			}
		} else {
			if (document.body.hasChildNodes()) {
				document.body.insertBefore(pause, document.body.firstChild);
			} else {
				document.body.appendChild(pause);
			}
		}
	};
	window.addEventListener('focus', updateStyle);
	window.addEventListener('blur', updateStyle);
	updateStyle();
}
