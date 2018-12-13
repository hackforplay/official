import '../game';

rule.this = 'プレイヤー';

rule.つくられたとき(async function() {
	Player.set(this);
	this.skin = Hack.skin('ゆうしゃ男'); // 見た目をきめる
	this.family = ('▼ ファミリー', Family.プレイヤー); // ファミリーを決める
	this.hp = 3; // 体力を決める
	this.atk = 1; // こうげき力を決める
	this.スキル = ''; // 最初はスキルなし
	/*+ つくられたとき */
});

rule.たおされたとき(async function() {
	Hack.gameover(); // ゲームオーバー
	this.destroy(); // プレイヤーを消す
	/*+ たおされたとき */
});

rule.こうげきするとき(async function() {
	if (this.スキル === '') return; // スキルがないときはここで終わり
	this.しょうかんする(this.スキル);
});
