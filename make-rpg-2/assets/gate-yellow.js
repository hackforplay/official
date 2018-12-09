import '../game';

rule.this = 'ゲート_イエロー';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.とじたゲート_イエロー)); // とじている
	this.collisionFlag = true; // はいれないようにする
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'かぎ_イエロー');
rule.メッセージされたとき(async function() {
	this.mod(('▼ スキン', Skin.ひらいたゲート_イエロー)); // ひらく！
	this.collisionFlag = false; // はいれるようにする
	/*+ メッセージされたとき */
});

rule.item = ('▼ あいて', 'プレイヤー'); // ふむ キャラクター
rule.ふまれたとき(async function(item) {
	item.warp(this); // ゲートのもう片方にワープ
	/*+ ふまれたとき */
});
