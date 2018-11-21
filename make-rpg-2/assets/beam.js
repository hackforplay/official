import '../game';

rule.this = 'ビーム';

rule.item = Rule.Anyone;
rule.しょうかんされたとき(async function(item) {
	this.mod(('▼ スキン', Skin.ビーム)); // 見た目をきめる
	this.mod(Hack.createDamageMod(item.atk, item)); // ダメージオブジェクトにする
	item.shoot(this, item.forward, 10); // このスピードで打ち出される
	await this.wait(1); // この秒数だけ待つ

	this.destroy(); // ビーム を けす
	/*+ しょうかんされたとき */
});
