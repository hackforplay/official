import 'hackforplay/rpg-kit-rpgobjects';

const makeHpLabel = (self) => {
	const label = new ScoreLabel();
	label.label = 'HP:';
	label.opacity = 0;
	self.parentNode.addChild(label);
	label.on('enterframe', e => {
		label.x = self.x;
		label.y = self.y;
		const diff = 1.01 - label.opacity;
		label.opacity = Math.max(0, label.opacity - diff / 10);
	});
	return label;
};

const initialize = RPGObject.prototype.initialize;
RPGObject.prototype.initialize = function () {
	initialize.apply(this, arguments);
	// デフォルトで表示
	this.showHpLabel = true
	this.on('hpchange', e => {
		if (typeof this.hp === 'number' && this.showHpLabel) {
			this.hpLabel = this.hpLabel || makeHpLabel(this);
			this.hpLabel.score = this.hp;
			this.hpLabel.opacity = 1;
		}
	});
};
