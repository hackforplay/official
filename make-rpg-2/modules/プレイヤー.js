import '../game'

rule.this = 'プレイヤー'

rule.つくられたとき(async function() {
	Player.set(this)
	await this.costume(('▼ みため', 'ゆうしゃ男'))
	
	this.family = ('▼ なかま', Family.プレイヤー)
	
	this.n('たいりょく', ('▼ を', 'イコール'), 3)
	
	this.n('こうげきりょく', ('▼ を', 'イコール'), 1)
	
	/*+ つくられたとき */
})

rule.たおされたとき(async function() {
	Hack.gameover() // ゲームオーバー
	this.destroy() // プレイヤーを消す
	
	/*+ たおされたとき */
})
