import { gameclear } from '../../utils'
import extra from '../extra'

export default function gameStartLazy() {
	Hack.maps['map2'].onload = () => {
		setTimeout(() => {
			Hack.logFunc(`
ダイヤモンドを みつけた！
しかし クモが じゃまである`)
		}, 2000)
		const hint = next =>
			Hack.score < 100 && Hack.player.mapY < 4
				? `
【ヒント】
あなたのいる ばしょ (${Hack.player.mapX}, ${Hack.player.mapY})
ダイヤモンド ばしょ (${item2.mapX}, ${item2.mapY})`
				: next()
		setInterval(() => {
			Hack.logFunc(hint)
		}, 15000)
		Hack.maps['map2'].onload = null
	}

	// クモ
	const item1 = new RPGObject()
	item1.mod(('▼ スキン', _kくも))
	// クモを 7, 4 の位置に移動する ( map2 )
	item1.locate(7, 4, 'map2')
	// クモを更新する...
	item1.onつねに = () => {
		// クモの横の位置をプレイヤーと同じにする
		item1.x = Hack.player.x
		item1.updateCollider()
	}
	item1.onattacked = () => {
		Hack.logFunc('こうげきは かわされた\nけんは あたらないようだ', true)
	}

	// 魔道書にクモを登録する
	feeles.setAlias('spider', item1)

	// ダイアモンド
	const item2 = new RPGObject()
	item2.mod(('▼ スキン', _dダイヤモンド))
	// ダイアモンドを 4, 7 の位置に移動する ( map2 )
	item2.locate(4, 7, 'map2')
	// ダイアモンドにプレイヤーが乗ったら...
	item2.onふまれた = event => {
		if (event.item === Hack.player) {
			// ダイアモンドを削除する
			item2.destroy()
			// スコアを 100 アップ！
			Hack.score += 100
			Hack.logFunc(`
ダイヤモンドを 手に入れた！
さっきのへやに もどろう`)
		}
	}

	// 魔道書にクモを登録する
	feeles.setAlias('diamond', item2)

	// かいだん
	const item3 = new RPGObject()
	item3.mod(('▼ スキン', _kくだりかいだん))
	// 階段を 7, 0 の位置に移動する ( map2 )
	item3.locate(7, 0, 'map2')
	//　階段を下の方に置く ( Under )
	item3.layer = RPGMap.Layer.Under
	// 階段にプレイヤーが乗ったら
	item3.onふまれた = event => {
		if (event.item === Hack.player) {
			// マップ map1 に移動
			Hack.changeMap('map1')
			// プレイヤーを 7, 8 の位置に移動する ( map1 )
			Hack.player.locate(7, 8, 'map1')
			// もしスコアが 100 以上なら...
			if (Hack.score >= 100) {
				// 次のステージに！
				gameclear('stages/6/index.html')
			}
		}
	}

	// このステージを改造
	extra(5, 1, 'map2', 'stages/5/main2.js')
}
