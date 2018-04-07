import 'hackforplay/Assets';
import 'mod/key';

Player.prototype.input = {
	up: ['up', 'w'],
	down: ['down', 's'],
	left: ['left', 'a'],
	right: ['right', 'd'],
	attack: ['space']
};

Player.prototype.checkInput = function(type) {
	return this.input[type].map(function(name) {
		return Key[name].pressed;
	}).reduce(function(a, b) {
		return a + b;
	});
};

Player.prototype.onenterframe = function() {
	if (!Hack.isPlaying) return;
	if (this.behavior === BehaviorTypes.Idle) {
		if (this.checkInput('attack')) {
			this.attack();
		}
	}
	if (this.behavior === BehaviorTypes.Idle) {
		var hor = this.checkInput('right') - this.checkInput('left');
		var ver = hor ? 0 : this.checkInput('down') - this.checkInput('up');
		if (hor || ver) {
			// Turn
			this.forward = [hor, ver];
			this.walk(1);
		}
	}
};

