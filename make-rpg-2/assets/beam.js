import '../game';

rule.this = 'ビーム';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ビーム)); // 見た目をきめる
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', Rule.Anyone);
rule.しょうかんされたとき(async function(item) {
	this.mod(Hack.createDamageMod(item.atk, item)); // ダメージオブジェクトにする
	item.shoot(this, item.forward, 10); // このスピードで打ち出される
	await this.wait(1); // この秒数だけ待つ
	this.destroy(); // ビーム を けす
	/*+ しょうかんされたとき */
});
