import '../game';

rule.this = 'たからばこ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.トレジャーボックス)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.こうげきされたとき(async function(item) {
	// こうげきされたときにはバグがあって, 一度の攻撃でなんども呼ばれてしまう.修正予定
	this.mod(('▼ スキン', Skin.トレジャーボックス2)); // 見た目をかえる
	const item1 = rule.つくる('コイン'); // コインを出す
	item1.locate(this.mapX, this.mapY + 1); // 自分よりひとつ下におく
	/*+ こうげきされたとき */
});
