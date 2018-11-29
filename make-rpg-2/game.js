import 'http://localhost:8080/register.js';

// ここからゲームがはじまったときのルール
rule.ゲームがはじまったとき(async function() {
	Hack.changeMap('map1'); // map1 をロード
	
	const player = rule.つくる('プレイヤー', 3, 5, 'map1', ('▼ むき', Dir.した));
	window.player = player;
	
	/*+ キャラクター アイテム */
});
// ここまでゲームがはじまったときのルール
