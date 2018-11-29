import '../game';

rule.this = 'ゲート_レッド';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.とじたゲート_レッド)); // とじている
	this.collisionFlag = true; // ふめないようにする
	/*+ つくられたとき */
});

rule.item = 'かぎ_レッド';
rule.メッセージされたとき(async function() {
	this.mod(('▼ スキン', Skin.ひらいたゲート_レッド)); // ひらく！
	this.collisionFlag = false; // ふめないようにする
	/*+ メッセージされたとき */
});

rule.item = 'プレイヤー'; // ふむ キャラクター
rule.ふまれたとき(async function(item) {
	item.warp(this); // ゲートのもう片方にワープ
	/*+ ふまれたとき */
});
