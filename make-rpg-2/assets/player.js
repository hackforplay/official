import '../game';

rule.this = 'プレイヤー';

rule.つくられたとき(async function() {
	Player.set(this);
	this.mod(('▼ スキン', Skin.ナイト)); // 見た目をきめる
	this.family = ('▼ ファミリー', Family.プレイヤー); // ファミリーを決める
	this.hp = 3; // 体力を決める
	this.atk = 1; // こうげき力を決める
	/*+ つくられたとき */
});

rule.たおされたとき(async function() {
	Hack.gameover(); // ゲームオーバー
	this.destroy(); // プレイヤーを消す
	/*+ たおされたとき */
});
