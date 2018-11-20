import '../game';

rule.this = 'ばくだん';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ボム)); // 見た目をきめる
	this.atk = 1; // ばくはつ の ダメージ
	await this.wait(3); // この秒数だけまつ

	const item1 = this.つくる('ばくはつ'); // ばくはつ を おこす
	item1.atk = this.atk;
	this.destroy(); // ばくだん を けす
	/*+ つくられたとき */
});
