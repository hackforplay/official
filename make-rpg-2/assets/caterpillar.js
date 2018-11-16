import '../game';

rule.this = 'イモムシ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.イモムシ)); // 見た目をきめる
	this.family = ('▼ ファミリー', Family.ドクリツ); // ファミリーを決める
	this.hp = 2; // 体力を決める
	this.atk = 1; // こうげき力を決める
	/*+ つくられたとき */
});

rule.つねに(async function() {
	await this.walk(); // あるく
	await this.turn(1); // ターンする
	/*+ つねに */
});

rule.たおされたとき(async function() {
	Hack.score += 1; // スコアをアップする
	/*+ たおされたとき */
});
