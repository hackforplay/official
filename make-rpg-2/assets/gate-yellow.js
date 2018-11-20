import '../game';

rule.this = 'ゲート（きいろ）';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ロック)); // 見た目をかえる
	this.collisionFlag = true; // ふめないようにする
	/*+ つくられたとき */
});

rule.item = 'かぎ（きいろ）';
rule.メッセージされたとき(async function() {
	this.mod(('▼ スキン', Skin.キャッスル)); // 見た目をかえる
	this.collisionFlag = false; // ふめないようにする
	/*+ メッセージされたとき */
});

rule.item = 'プレイヤー'; // ふむ キャラクター
rule.ふまれたとき(async function(item) {
	item.warp(this); // ゲートのもう片方にワープ
	/*+ ふまれたとき */
});
