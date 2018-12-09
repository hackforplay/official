import '../game';

rule.this = 'ワープ_イエロー';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ワープ_イエロー)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', Rule.Anyone);
rule.ふまれたとき(async function(item) {
	item.warp(this); // ふんだキャラクターがワープする
	/*+ ふまれたとき */
});
