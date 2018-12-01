import '../game';

rule.this = 'かぎ_ブルー';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.かぎ_ブルー)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	this.message('ゲート_ブルー'); // ゲート_ブルーをひらく
	Hack.log('あおい ゲートが ひらいた！');
	this.destroy(); // このアイテムを消す
	/*+ ふまれたとき */
});
