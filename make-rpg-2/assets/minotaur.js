import '../game';

rule.this = 'ミノタウルス';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ミノタウルス)); // 見た目をきめる
	this.family = ('▼ ファミリー', Family.ドクリツ); // ファミリーを決める
	this.hp = 10; // 体力を決める
	this.atk = 1; // こうげき力を決める
	this.scale(2, 2);
	/*+ つくられたとき */
});

rule.つねに(async function() {
	await this.attack(); // こうげきする
	/*+ つねに */
});

rule.たおされたとき(async function() {
	Hack.score += 1; // スコアをアップする
	/*+ たおされたとき */
});
