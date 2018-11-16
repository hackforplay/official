import '../game';

rule.this = 'ミノタウルス';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ミノタウルス));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 10;
	this.atk = 1;
	this.scale(2, 2);
	/*+ つくられたとき */
});

rule.つねに(async function() {
	await this.attack(); // こうげきする
	/*+ つねに */
});

rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ たおされたとき */
});
