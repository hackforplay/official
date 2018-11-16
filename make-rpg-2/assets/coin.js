import '../game';

rule.this = 'コイン';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.コイン));
	this.velocity(1, 0);
	this.force(0, 0.5);
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ぶつかったとき(async function(item) {
	this.destroy();
	Hack.score += 1;
	/*+ ぶつかったとき */
});
