import '../game';

rule.this = 'かぎ_レッド';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.かぎ_レッド)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'プレイヤー');
rule.ふまれたとき(async function(item) {
	this.message('ゲート_レッド'); // ゲート_レッドをひらく
	Hack.log('あかい ゲートが ひらいた！');
	this.destroy(); // このアイテムを消す
	/*+ ふまれたとき */
});
