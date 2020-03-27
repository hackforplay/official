import './game' // ルール定義をロードする
import maps from './maps'
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
	try {
		// GUI で切り替え可能なマップ (common~0.12)
		await Hack.loadMaps('maps.json')
	} catch (error) {
		console.error(error)
		// 後方互換性を残す
		maps()
		// マップエディタが完成するまでのデフォルトマップ
		await Hack.loadMap(
			'map1',
			'https://storage.googleapis.com/hackforplay-ugc/e6ac1ed6-9b50-4429-8c79-46253acb7449.json'
		)
		await Hack.loadMap(
			'map2',
			'https://storage.googleapis.com/hackforplay-ugc/a0edeac0-7171-4144-90f2-affb34683d38.json'
		)
		await Hack.loadMap(
			'map3',
			'https://storage.googleapis.com/hackforplay-ugc/ece88d4e-7f25-463d-b4d2-b03e6867ab83.json'
		)
	}
}

// ゲームスタート
Hack.start()
