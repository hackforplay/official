import '../game';

rule.this = 'ハート';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ハート));
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	item.hp += 1;
	this.destroy();
	/*+ ふまれたとき */
});
