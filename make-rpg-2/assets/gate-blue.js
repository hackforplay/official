import '../game';

rule.this = 'ゲート_ブルー';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.とじたゲート_ブルー)); // とじている
	this.collisionFlag = true; // はいれないようにする
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'かぎ_ブルー');
rule.メッセージされたとき(async function() {
	this.mod(('▼ スキン', Skin.ひらいたゲート_ブルー)); // ひらく！
	this.collisionFlag = false; // はいれるようにする
	/*+ メッセージされたとき */
});

rule.item = ('▼ あいて', 'プレイヤー'); // ふむ キャラクター
rule.ふまれたとき(async function(item) {
	item.warp(this); // ゲートのもう片方にワープ
	/*+ ふまれたとき */
});
