import '../game';

rule.this = 'プリンセス';

rule.つくられたとき(function() {
	this.mod(('▼ スキン', Skin.プリンセス)); // 見た目をきめる
	/*+ つくられたとき */
});

rule.item = ('▼ あいて', 'プレイヤー'); // ぶつかるキャラクター
rule.ぶつかったとき(async function(item) {
	Hack.log('たすけてくれて ありがとう！'); // メッセージを出す
	await this.wait(1); // ちょっと まつ
	Hack.gameclear(); // ゲームクリア
	/*+ ぶつかったとき */
});
