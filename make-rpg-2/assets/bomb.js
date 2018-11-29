import '../game';

rule.this = 'ボム';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ボム)); // 見た目をきめる
	this.atk = 1; // ばくはつ の ダメージ
	await this.wait(3); // この秒数だけまつ

	const item1 = this.しょうかんする('ばくはつ'); // ばくはつ を おこす
	item1.locate(this.mapX, this.mapY); // ボムと同じ場所にする
	item1.atk = this.atk;
	this.destroy(); // ボム を けす
	/*+ つくられたとき */
});

rule.item = Rule.Anyone;
rule.しょうかんされたとき(async function(item) {
	this.atk = item.atk; // しょうかんした人と同じこうげき力にする
	/*+ しょうかんされたとき */
});
