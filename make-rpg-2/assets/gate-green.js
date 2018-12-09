import '../game';

rule.this = 'ゲート_グリーン';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.とじたゲート_グリーン)); // とじている
	this.collisionFlag = true; // はいれないようにする
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'かぎ_グリーン');
rule.メッセージされたとき(async function() {
	this.mod(('▼ スキン', Skin.ひらいたゲート_グリーン)); // ひらく！
	this.collisionFlag = false; // はいれるようにする
	/*+ メッセージされたとき */
});

rule.item = ('▼ あいて', 'プレイヤー'); // ふむ キャラクター
rule.ふまれたとき(async function(item) {
	item.warp(this); // ゲートのもう片方にワープ
	/*+ ふまれたとき */
});
