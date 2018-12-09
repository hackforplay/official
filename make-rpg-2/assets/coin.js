import '../game';

rule.this = 'コイン';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.コイン)); // 見た目をきめる
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'プレイヤー');
rule.ぶつかったとき(async function(item) {
	this.destroy(); // このアイテムを消す
	Hack.score += 1; // スコアをアップする
	/*+ ぶつかったとき */
});
