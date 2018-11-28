import 'https://unpkg.com/@hackforplay/common@^0.10/dist/register.js';

// ここからゲームがはじまったときのルール
rule.ゲームがはじまったとき(async function() {
	Hack.changeMap('map1'); // map1 をロード
	
	const player = rule.つくる('プレイヤー');
	window.player = player;
	player.locate(3, 5); // いる ばしょ
	
	/*+ キャラクター アイテム */
});
// ここまでゲームがはじまったときのルール
