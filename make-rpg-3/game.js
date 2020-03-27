import 'https://cdn.hackforplay.xyz/common/0.30/register.min.js';

rule.ゲームがはじまったとき(async function() {
	await Hack.changeMap('map1'); // map1 をロード
	
	const player = rule.つくる('プレイヤー', 3, 5, 'map1', ('▼ むき', Dir.した));
	window.player = player;
	
	
	/*+ ゲームがはじまったとき */
});
