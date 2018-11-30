import '../game';

rule.this = 'ワープ_レッド';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ワープ_レッド)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = Rule.Anyone;
rule.ふまれたとき(async function(item) {
	item.warp(this); // ふんだキャラクターがワープする
	/*+ ふまれたとき */
});
