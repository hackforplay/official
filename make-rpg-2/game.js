import '__FEELES_COMMON_REGISTER__';

rule.ゲームがはじまったとき(async function() {
	// マップ（β版）のコードは、この下に貼り付ける
	
	await Hack.changeMap('map1'); // map1 をロード
	
	const player = rule.つくる('プレイヤー', 3, 5, 'map1', ('▼ むき', Dir.した));
	window.player = player;
	
	
	/*+ ゲームがはじまったとき */
});
