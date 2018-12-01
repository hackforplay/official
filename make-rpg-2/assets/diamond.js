import '../game';

rule.this = 'ダイヤモンド';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ダイヤモンド)); // 見た目をきめる
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ぶつかったとき(async function(item) {
	this.destroy(); // このアイテムを消す
	Hack.score += 1; // スコアをアップする
	/*+ ぶつかったとき */
});
