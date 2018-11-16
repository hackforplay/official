import '../game';

rule.this = 'コウモリ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.コウモリ));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 3;
	this.atk = 1;
	/*+ つくられたとき */
});

rule.つねに(async function() {
	const moveX = 32 * Math.sign(player.mapX - this.mapX);
	const moveY = 32 * Math.sign(player.mapY - this.mapY);
	this.forward = [moveX, moveY];
	await this.walk(); // あるく
	await this.attack(); // こうげきする
	await this.wait(1); // やすむ
	/*+ つねに */
});

rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ たおされたとき */
});
