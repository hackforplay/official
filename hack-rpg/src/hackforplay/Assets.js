import 'hackforplay/core';
// import 'hackforplay/rpg-kit-main';
// import 'hackforplay/rpg-kit-rpgobjects';


// RPGObjectの生成を助けるヘルパークラス
export default class Assets {

	/**
	 * @param initializer function
	 */
	constructor(initializer) {
		return (...params) => new Promise((resolve, reject) => {
			if (!game.running || !Hack.defaultParentNode) {
				game.on('load', () => {
					resolve(initializer(...params));
				});
			} else {
				resolve(initializer(...params));
			}
		});
	}

	/**
	 * @param tag string|function(RPGObject):boolean
	 * @param multiple boolean
	 * @return RPGObject
	 */
	static get(tag, multiple = false) {
		const pred = typeof tag === 'function' ? tag : (i) => (i.tag === tag);
		const task = (resolve) => {
			if (multiple) {
				resolve(RPGObject.collection.filter(pred));
				return;
			}
			const found = RPGObject.collection.find(pred);
			if (found) {
				resolve(found);
			} else {
				setTimeout(() => {
					task(resolve);
				}, 100);
			}
		};
		return new Promise((resolve, reject) => {
			if (!game.running) {
				game.on('load', () => {
					task(resolve);
				});
			} else {
					task(resolve);
			}
		});
	}
}

/**
 * Assets.XXXX()
 * @param seed string|object
 * @return Promise:RPGObject
 */
Object.keys(Hack.assets).forEach((key) => {
	const mod = Hack.assets[key];
	if (typeof mod !== 'function') {
		return;
	}
	Assets[key] = new Assets((seed) => {
		var gen = new RPGObject();
		gen.mod(mod);
		if (typeof seed === 'object') {
			Object.assign(gen, seed);
		} else if (typeof seed === 'string') {
			gen.tag = seed;
		} else {
			gen.tag = '';
		}
		return gen;
	});
});

/**
 * Assets.map(mapName)
 * @param mapName string
 * @param width number
 * @param height number
 * @return Promise:RPGMap
 */
Assets.map = new Assets((name, width = 15, height = 10) => {
	if (!name) {
		throw 'Assets.map() にマップ名が入っていません';
	}
	if (Hack.maps[name]) {
		return Hack.maps[name];
	}
	Hack.maps[name] = new RPGMap(32, 32, width, height);
	Hack.maps[name].imagePath = 'enchantjs/x2/dotmat.gif';
	Hack.maps[name].type = 'grassland';
	return Hack.maps[name];
});






