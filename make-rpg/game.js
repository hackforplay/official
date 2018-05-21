import 'hackforplay/core';
// import 'mod/3d/core';

async function gameFunc() {
	Hack.changeMap('map1'); // map1 をロード

	self.player = new Player(('▼ スキン', Skin.ナイト)); // プレイヤーをつくる
	player.name = 'プレイヤー';
	player.family = ('▼ ファミリー', Family.プレイヤー);
	player.locate(3, 5); // はじめの位置

	/*+ モンスター アイテム せっち システム */

	/*+ スキル */
}

game._debug = ('▼ フラグ', false);

export default gameFunc;
