import '../game';

rule.this = 'かぎ_イエロー';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.かぎ_イエロー)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	this.message('ゲート_イエロー'); // ゲート_イエローをひらく
	Hack.log('きいろの ゲートが ひらいた！');
	this.destroy(); // このアイテムを消す
	/*+ ふまれたとき */
});
