import { Core } from 'enchantjs/enchant';
import Hack from 'hackforplay/hack';
import 'hackforplay/core';
// import 'mod/3d/core';
import { setEnergy, registerHandyObject } from './mod/rockman/index';
import Vector2 from 'hackforplay/math/vector2';
import Family from 'hackforplay/family';

const game = Core.instance;
game._debug = true;

async function gameFunc() {
	game.rootScene.removeChild(Hack.controllerGroup); // バーチャルパッドを消す
	Hack.scoreLabel.label = 'E :';

	Hack.changeMap('map1'); // map1 をロード

	self.player = new Player(('▼ スキン', _kきし)); // プレイヤーをつくる
	player.family = Family.Player;
	player.mod(('▼ スキン', _kきし)); // 見た目
	player.locate(3, 5); // はじめの位置

	feeles.openCode('code.js');

	const item1 = new RPGObject(Skin.ネオメットール);
	item1.locate(10, 5);
	item1.hp = 1;
	item1.turn();
	item1.on('becomeattack', () => {
		const bullet = item1.summon(Skin['Rockman/Bullet']);
		item1.shoot(bullet, item1.forward, 4);
		bullet.mod(Hack.createDamageMod(1));
		bullet.destroy(100);
	});
	item1.setInterval(() => {
		item1.attack();
	}, 30 * 4);

	const item2 = new RPGObject(Skin.エネルギー缶);
	item2.locate(6, 7);
	item2.on('playerenter', () => {
		item2.destroy();
		setEnergy(100);
	});

	const item3 = new RPGObject(Skin.ロック);
	item3.locate(6, 3);
	registerHandyObject(item3);

	/*+ モンスター アイテム せっち システム */

	/*+ スキル */
}

export default gameFunc;
