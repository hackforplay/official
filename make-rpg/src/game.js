import 'hackforplay/core';
// import 'mod/3d/core';

async function gameFunc() {
	Hack.changeMap('map1'); // map1 をロード

	self.player = new Player(('▼ スキン', Skin.ナイト)); // プレイヤーをつくる
	player.name = 'プレイヤー';
	player.family = ('▼ ファミリー', Family.プレイヤー);
	player.locate(3, 5); // はじめの位置

	Hack.log('おしろがみえるだろう あれがゴールだ'); // メッセージを出す

	const item1 = new RPGObject(('▼ スキン', Skin.キャッスル));
	item1.locate(10, 5, 'map1');
	item1.on(('▼ イベント', 'のった'), () => {
		Hack.gameclear(); // ゲームクリア
		player.destroy(); // プレイヤーをけす
		Hack.log('ゲームクリアです。おめでとう！'); // メッセージを出す
	});

	/*+ モンスター アイテム せっち システム */

	/*+ スキル */
}

export default gameFunc;
