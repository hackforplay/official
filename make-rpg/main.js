import {
	enchant,
	Hack,
	register
} from 'https://unpkg.com/@hackforplay/common@^0.7';

import gameFunc from './game';
import maps from './maps';
import update from './update';

register(window);

let gameOnLoad, hackOnLoad;

if (gameFunc._bundled) {
	// (後方互換性) hackforplay.xyz 移植バージョン
	gameOnLoad = gameFunc.gameOnLoad;
	hackOnLoad = gameFunc.hackOnLoad;
} else {
	// ふつうはこちら
	gameOnLoad = gameFunc;
	hackOnLoad = maps;
}

// ゲームをつくる
game.onload = async () => {
	// gameOnLoad より先に実行するイベント
	// lifelabel などが gameOnLoad 時に参照できない対策
	game.dispatchEvent(new enchant.Event('awake'));

	await gameOnLoad();

	// Hack.player がないとき self.player を代わりに入れる
	if (self.player && !Hack.player) {
		Hack.player = self.player;
	}

	// update 関数を開始
	game.on('enterframe', update);

	// ゲームクリアの測定（hackforplay.xyz の新仕様）
	Hack.on('gameclear', () => {
		if (feeles.dispatchOnMessage) {
			feeles.dispatchOnMessage({
				labelName: 'gameclear',
				labelValue: 'gameclear'
			});
		}
	});
};

// マップをつくる
Hack.onload = () => {
	// Hack.maps を事前に作っておく
	Hack.maps = Hack.maps || {};
	hackOnLoad();
};

// ゲームスタート
Hack.start();
