import './game' // ルール定義をロードする
import './autoload' // モジュールのオートロード

// ゲームをつくる
game.onload = async () => {
	// gameOnLoad より先に実行するイベント
	// lifelabel などが gameOnLoad 時に参照できない対策
	game.dispatchEvent(new enchant.Event('awake'))

	await rule.runゲームがはじまったとき()

	// Hack.player がないとき window.player を代わりに入れる
	if (window.player && !Hack.player) {
		Hack.player = window.player
	}

	// // update 関数を開始
	// game.on('enterframe', update);

	// ゲームクリアの測定（hackforplay.xyz の新仕様）
	Hack.on('gameclear', () => {
		if (feeles.dispatchOnMessage) {
			feeles.dispatchOnMessage({
				labelName: 'gameclear',
				labelValue: 'gameclear'
			})
		}
	})
}

// マップをつくる
Hack.onload = async () => {
	Hack.maps = Hack.maps || {}
	await Hack.loadMaps('maps.json')
}

// ゲームスタート
Hack.start()
