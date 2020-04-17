import 'https://cdn.hackforplay.xyz/common/0.32/register.min.js';

rule.ゲームがはじまったとき(async function() {
	await Hack.changeMap('map1'); // map1 をロード
	
	const player = rule.つくる('プレイヤー', 3, 5, 'map1', むき.した);
	window.player = player;
	
	
	/*+ ゲームがはじまったとき */
});
