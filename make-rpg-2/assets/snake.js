import '../game';

rule.this = 'ウロボロス';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ウロボロス));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 10;
	this.atk = 1;
});

rule.つねに(async function() {
	await this.wait(4); // 少しやすむ
	await this.attack(); // こうげきする
	/*+ このキャラクターになにかする 条件 */
});

rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
