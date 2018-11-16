import '../game';

rule.this = 'コイン';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.コイン)); // 見た目をきめる
	this.velocity(1, 0); // スピードを決める
	this.force(0, 0.5); // 加速度を決める
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ぶつかったとき(async function(item) {
	this.destroy(); // このアイテムを消す
	Hack.score += 1; // スコアをアップする
	/*+ ぶつかったとき */
});
