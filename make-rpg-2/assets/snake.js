import '../game';

rule.this = 'ウロボロス';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ウロボロス)); // 見た目を決める
	this.family = ('▼ ファミリー', Family.ドクリツ); // ファミリーを決める
	this.hp = 10; // 体力を決める
	this.atk = 1; // こうげき力を決める
});

rule.つねに(async function() {
	await this.wait(4); // 少しやすむ
	await this.attack(); // こうげきする
	/*+ つねに */
});

rule.たおされたとき(async function() {
	Hack.score += 1; // スコアをアップする
	/*+ たおされたとき */
});
