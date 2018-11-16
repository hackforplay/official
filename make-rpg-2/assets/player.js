import '../game';

rule.this = 'プレイヤー';

rule.つくられたとき(async function() {
	Player.set(this);
	this.mod(('▼ スキン', Skin.ナイト));
	this.family = ('▼ ファミリー', Family.プレイヤー);
	this.hp = 3; // 体力
	this.atk = 1; // こうげき力
	/*+ つくられたとき */
});

rule.たおされたとき(async function() {
	Hack.gameover(); // ゲームオーバー
	this.destroy(); // プレイヤーを消す
	/*+ たおされたとき */
});
