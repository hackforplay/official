import '../game';

rule.this = 'ふしぎなカギ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.キー)); // 見た目をかえる
	this.locate(random(0, 15), random(0, 10), 'map1'); // いちをランダムにする
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function() {
	Hack.log('カチャリ という おと が きこえた'); // 文字を出す
	this.destroy(); // このアイテムを消す
	/*+ ふまれたとき */
});
