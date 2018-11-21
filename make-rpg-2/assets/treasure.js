import '../game';

rule.this = 'たからばこ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.トレジャーボックス)); // 見た目をかえる
	this.あいた = false; // まだ、あいていない（変数）
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.こうげきされたとき(async function(item) {
	if (this.あいた === true) return; // もし、あいていたら、ここで終わる（変数）
	this.mod(('▼ スキン', Skin.トレジャーボックス2)); // 見た目をかえる
	const item1 = rule.つくる('コイン'); // コインを出す
	item1.locate(this.mapX, this.mapY + 1); // 自分よりひとつ下におく
	this.あいた = true; // あいた（変数）
	/*+ こうげきされたとき */
});
