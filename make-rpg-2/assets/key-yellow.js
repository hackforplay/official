import '../game';

rule.this = 'かぎ（きいろ）';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.キー)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	this.message('ゲート（きいろ）'); // ゲート（きいろ）をひらく
	Hack.log('黄色の ゲートが ひらいた！');
	this.destroy(); // このアイテムを消す
	/*+ ふまれたとき */
});
