import 'hackforplay/core';
// import 'mod/3d/core';
import './mod/rockman/index';

async function gameFunc() {
	Hack.changeMap('map1'); // map1 をロード

	self.player = new Player(); // プレイヤーをつくる
	player.mod(('▼ スキン', _kきし)); // 見た目
	player.locate(3, 5); // はじめの位置

	feeles.openCode('code.js');

	/*+ モンスター アイテム せっち システム */

	/*+ スキル */
}

export default gameFunc;
