import 'hackforplay/core';
// import 'mod/3d/core';

async function gameFunc() {

	Hack.changeMap('map1'); // map1 をロード

	self.player = new Player(); // プレイヤーをつくる
	player.mod(('▼ スキン', _kきし)); // 見た目
	player.locate(3, 5); // はじめの位置

	Hack.log('おしろがみえるだろう あれがゴールだ'); // メッセージを出す

	const item1 = new RPGObject();
	item1.mod(('▼ スキン', _sしろ));
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
