// Proposal of Hack.time

let _time = null
let _enabled = false
let _label = null

export default function install({ Hack, enchant }) {
	Object.defineProperty(Hack, 'time', {
		enumerable: true,
		configurable: true,
		set(value) {
			if (typeof value === 'number' && value !== NaN) {
				// START TIMER
				_time = value * enchant.Core.instance.fps
				_enabled = true
			} else {
				// STOP TIMER
				_time = value
				_enabled = false
			}
			if (_label) {
				_label.render()
			}
		},
		get() {
			if (typeof _time === 'number') {
				return Math.floor(_time / enchant.Core.instance.fps)
			}
			return _time
		}
	})

	enchant.Core.instance.on('awake', () => {
		const label = new enchant.ui.MutableText(10, 136)
		label.label = 'TIME:'
		label.render = () => {
			if (_enabled || _time === 0) {
				label.text = label.label + Math.floor(_time / enchant.Core.instance.fps)
			} else {
				label.text = ''
			}
		}
		label.onenterframe = () => {
			if (!_enabled || !Hack.isPlaying || Hack.world._stop) return
			_time-- // COUNT DOWN
			if (_time <= 0) {
				_enabled = false
				_time = 0
				const event = new enchant.Event('timeup')
				Hack.dispatchEvent(event)
			}
			label.render()
		}
		Hack.menuGroup.addChild(label)
		Hack.timeLabel = label
	})
}
