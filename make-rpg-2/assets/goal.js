import '../game';

rule.this = 'ゴールちてん';

rule.つくられたとき(function() {
	this.mod(('▼ スキン', Skin.キャッスル)); // 見た目をきめる
	Hack.log('おしろがみえるだろう あれがゴールだ'); // ヒントをだす
	/*+ つくられたとき */
});

rule.item = 'プレイヤー'; // ふむキャラクター
rule.ふまれたとき(async function(item) {
	Hack.gameclear(); // ゲームクリア
	item.destroy(); // ふんだキャラクターをけす
	Hack.log('ゲームクリアです。おめでとう！'); // メッセージを出す
	/*+ ふまれたとき */
});
