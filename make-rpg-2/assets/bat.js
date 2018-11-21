import '../game';

rule.this = 'コウモリ';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.コウモリ)); // 見た目をきめる
	this.family = ('▼ ファミリー', Family.ドクリツ); // ファミリーを決める
	this.hp = 3; // 体力を決める
	this.atk = 1; // こうげき力を決める
	this.ターゲット = 'プレイヤー'; // プレイヤーをのことを追いかける
	/*+ つくられたとき */
});

rule.つねに(async function() {
	if (this.ターゲット === '') return; // ターゲットがない時はここで終わり
	await this.chase8(this.ターゲット); // ターゲットを追いかける（ナナメあり）
	await this.attack(); // こうげきする
	await this.wait(1); // やすむ
	/*+ つねに */
});

rule.たおされたとき(async function() {
	Hack.score += 1; // スコアをアップする
	/*+ たおされたとき */
});
