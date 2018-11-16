import '../game';

rule.this = 'ふしぎなカギ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.キー));
	this.locate(random(0, 15), random(0, 10), 'map1');
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function() {
	Hack.log('カチャリ という おと が きこえた');
	this.destroy();
	/*+ ふまれたとき */
});
