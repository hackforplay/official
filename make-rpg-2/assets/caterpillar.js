import '../game';

rule.this = 'イモムシ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.イモムシ));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 2;
	this.atk = 1;
	/*+ つくられたとき */
});

rule.つねに(async function() {
	await this.walk(); // あるく
	await this.turn(1); // ターンする
	/*+ つねに */
});

rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ たおされたとき */
});
