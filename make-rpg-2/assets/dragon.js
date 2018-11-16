import '../game';

rule.this = 'ドラゴン';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ドラゴン)); // 見た目をきめる
	this.family = ('▼ ファミリー', Family.ドクリツ); // ファミリーを決める
	this.hp = 10; // 体力を決める
	this.atk = 1; // こうげき力を決める
	this.scale(2); // 大きさ
	this.breath({
		skin: ('▼ スキン', Skin.バクエン), // ブレスの見た目をきめる
		speed: 5,
		scale: 1
	});
	/*+ つくられたとき */
});

rule.たおされたとき(async function() {
	Hack.score += 1; // スコアをアップする
	/*+ たおされたとき */
});
