import 'hackforplay/core';
// import 'mod/3d/core';
import './mod/rockman/index';
import './resources/preload';

async function gameFunc() {
	Hack.changeMap('map1'); // map1 をロード

	self.player = new Player(); // プレイヤーをつくる
	player.mod(('▼ スキン', _kきし)); // 見た目
	player.locate(3, 5); // はじめの位置

	feeles.openCode('code.js');

	const item1 = new RPGObject(Skin.ネオメットール);
	item1.locate(10, 5);
	item1.hp = 1;
	item1.turn();

	/*+ モンスター アイテム せっち システム */

	/*+ スキル */
}

export default gameFunc;
