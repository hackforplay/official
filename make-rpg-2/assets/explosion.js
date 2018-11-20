import '../game';

rule.this = 'ばくはつ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.バクエン)); // 見た目をきめる
	this.mod(Hack.createDamageMod()); // ダメージオブジェクトにする
	this.velocityY = -1; // 上にむかってたちのぼらせる

	await this.wait(1); // この秒数だけ待つ
	this.destroy(); // ばくはつ を けす
	/*+ つくられたとき */
});
