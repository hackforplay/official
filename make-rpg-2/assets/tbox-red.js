import '../game';

rule.this = 'たからばこ_レッド';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.とじたたからばこ_レッド)); // とじている
	this.あいた = false; // まだ、あいていない（変数）
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.こうげきされたとき(async function(item) {
	if (this.あいた === true) return; // もし、あいていたら、ここで終わる（変数）
	this.mod(('▼ スキン', Skin.ひらいたたからばこ_レッド)); // ひらいた！
	this.しょうかんする('コイン'); // コインを出す
	this.あいた = true; // あいた（変数）
	/*+ こうげきされたとき */
});
