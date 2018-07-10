/**
 * 新しいマップエディタで書き出されたデータをパースして, 今までの RPGMap と互換性のあるオブジェクトを出力する
 * @param {Object} mapJson マップエディタで出力されるマップデータ
 * @param {Object} injection ユニットテストのための機能
 */
export default function createCompatibleMap(mapJson, injection = {}) {
	// モックの注入
	const Surface = injection.Surface || require('../enchantjs/enchant').Surface;
	const RPGMap = injection.RPGMap || require('./rpg-map');
	// mapJson のパース
	// 大きさを割り出す
	// 画像を書き出す
	const image = new Surface();
	const rpgMap = new RPGMap(32, 32, 15, 10);
	rpgMap.image = image;
	// インデックスを指定する
	rpgMap.bmap.loadData([[]]);
	rpgMap.fmap.loadData([[]]);
	rpgMap.cmap = [[]];
	return rpgMap;
}
