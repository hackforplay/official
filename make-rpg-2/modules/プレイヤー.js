import '../game';

rule.this = 'プレイヤー';

rule.つくられたとき(async function() {
	Player.set(this);
	this.skin = Hack.skin('ゆうしゃ男'); // 見た目をきめる
	this.family = ('▼ なかま', Family.プレイヤー); // だれと仲間か
	this.n('たいりょく', ('▼ を', 'イコール'), 3);
	this.n('こうげきりょく', ('▼ を', 'イコール'), 1);

	/*+ つくられたとき */
});

rule.たおされたとき(async function() {
	Hack.gameover(); // ゲームオーバー
	this.destroy(); // プレイヤーを消す

	/*+ たおされたとき */
});
