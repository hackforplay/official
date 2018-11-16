import '../game';

rule.this = 'スター';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.スター)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	item.damageTime = 100; // ムテキにする
	this.destroy(); // このアイテムを消す
	/*+ ふまれたとき */
});
