import '../game';

rule.this = 'ワープ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ワープ)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = Rule.Anyone;
rule.ふまれたとき(async function(item) {
	item.warp(this); // ふんだキャラクターがワープする
	/*+ ふまれたとき */
});
