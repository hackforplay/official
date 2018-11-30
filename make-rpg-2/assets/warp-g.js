import '../game';

rule.this = 'ワープ_グリーン';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ワープ_グリーン)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = Rule.Anyone;
rule.ふまれたとき(async function(item) {
	item.warp(this); // ふんだキャラクターがワープする
	/*+ ふまれたとき */
});
