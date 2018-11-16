import '../game';

rule.this = 'ドラゴン';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ドラゴン));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 10;
	this.atk = 1;
	this.scale(2); // 大きさ
	this.breath({
		skin: ('▼ スキン', Skin.バクエン),
		speed: 5,
		scale: 1
	});
	/*+ つくられたとき */
});

rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ たおされたとき */
});
