import '../game';

rule.this = 'スライム';

rule.つくられたとき(function() {
	this.mod(('▼ スキン', Skin.スライム));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 3;
	this.atk = 1;
	/*+ つくられたとき */
});

rule.つねに(async function() {
	await this.attack();
	/*+ つねに */
});

rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ たおされたとき */
});
