import '../game';

rule.this = 'かぎ_グリーン';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.かぎ_グリーン)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'プレイヤー');
rule.ふまれたとき(async function(item) {
	this.message('ゲート_グリーン'); // ゲート_グリーンをひらく
	Hack.log('みどりの ゲートが ひらいた！');
	this.destroy(); // このアイテムを消す
	/*+ ふまれたとき */
});
