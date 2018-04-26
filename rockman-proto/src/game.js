import { Core } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import 'hackforplay/core';
// import 'mod/3d/core';
import { setEnergy } from './mod/rockman/index';

const game = Core.instance;
game._debug = true;

async function gameFunc() {
	game.rootScene.removeChild(Hack.controllerGroup); // バーチャルパッドを消す
	Hack.scoreLabel.label = 'E :';

	Hack.changeMap('map1'); // map1 をロード

	self.player = new Player(('▼ スキン', _kきし)); // プレイヤーをつくる
	player.mod(('▼ スキン', _kきし)); // 見た目
	player.locate(3, 5); // はじめの位置

	feeles.openCode('code.js');

	const item1 = new RPGObject(Skin.ネオメットール);
	item1.locate(10, 5);
	item1.hp = 1;
	item1.turn();

	const item2 = new RPGObject(Skin.エネルギー缶);
	item2.locate(6, 7);
	item2.forward = [0, -1];
	item2.on('playerenter', () => {
		item2.destroy();
		setEnergy(100);
	});

	/*+ モンスター アイテム せっち システム */

	/*+ スキル */
}

export default gameFunc;
