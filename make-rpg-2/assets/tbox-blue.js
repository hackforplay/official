import '../game';

rule.this = 'たからばこ_ブルー';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.とじたたからばこ_ブルー)); // とじている
	this.あいた = false; // まだ、あいていない（変数）
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'プレイヤー');
rule.こうげきされたとき(async function(item) {
	if (this.あいた === true) return; // もし、あいていたら、ここで終わる（変数）
	this.mod(('▼ スキン', Skin.ひらいたたからばこ_ブルー)); // ひらいた！
	this.しょうかんする('コイン'); // コインを出す
	this.あいた = true; // あいた（変数）
	/*+ こうげきされたとき */
});
