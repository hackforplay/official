import '../game';

rule.this = 'かいだん';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ノボリカイダン)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'プレイヤー');
rule.ふまれたとき(async function(item) {
	item.warp(this); // ふんだキャラクターがワープする
	/*+ ふまれたとき */
});
