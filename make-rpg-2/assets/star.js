import '../game';

rule.this = 'スター';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.スター));
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	item.damageTime = 100;
	this.destroy();
	/*+ ふまれたとき */
});
