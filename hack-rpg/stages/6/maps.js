export function createMap1() {
	// map1 というマップを作る
	const mapName = 'map1';

	// 15, 10 の大きさにする ( 32 の部分は書き換えないでください )
	const map = new RPGMap(32, 32, 15, 10);

	map.imagePath = 'resources/enchantjs/x2/dotmat.gif';

	const ___ = -1;

	// マップの地形をつくる
	map.bmap.loadData(
		[
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			],
			[
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342,
				342
			]
		],
		[
			[
				321,
				321,
				321,
				341,
				341,
				341,
				___,
				___,
				___,
				341,
				341,
				___,
				___,
				321,
				321
			],
			[
				321,
				321,
				321,
				___,
				___,
				___,
				___,
				422,
				___,
				___,
				___,
				___,
				___,
				321,
				321
			],
			[
				321,
				321,
				321,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				321,
				321
			],
			[
				341,
				341,
				341,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				341,
				341
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___
			],
			[
				321,
				321,
				321,
				___,
				___,
				___,
				321,
				341,
				321,
				___,
				___,
				___,
				___,
				321,
				321
			],
			[
				321,
				321,
				321,
				___,
				___,
				___,
				321,
				402,
				321,
				___,
				___,
				___,
				___,
				321,
				321
			],
			[
				341,
				341,
				341,
				341,
				341,
				341,
				341,
				341,
				341,
				341,
				341,
				___,
				___,
				341,
				341
			]
		]
	);

	// マップの歩ける場所を決める
	// 1 なら歩けないし、 0 なら歩ける
	map.cmap = [
		[1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
		[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1]
	];

	Hack.maps[mapName] = map;
}

export function createMap2() {
	//　map2 というマップを作る
	const mapName = 'map2';

	// 15, 10 の大きさにする ( 32 の部分は書き換えないでください )
	const map = new RPGMap(32, 32, 15, 10);

	map.imagePath = 'resources/enchantjs/x2/dotmat.gif';

	const ___ = -1;

	// マップの地形をつくる
	map.bmap.loadData([
		[323, 54, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
		[35, 15, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
		[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
		[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
		[75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
		[323, 323, 323, 323, 323, 323, 323, 323, 323, 323, 323, 323, 323, 323, 323],
		[35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
		[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
		[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
		[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55]
	]);

	// マップの歩ける場所を決める
	// 1 なら歩けないし、 0 なら歩ける
	map.cmap = [
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];

	Hack.maps[mapName] = map;
}

export function createMap3() {
	// map3 というマップを作る
	const mapName = 'map3';

	// 15, 10 の大きさにする ( 32 の部分は書き換えないでください )
	const map = new RPGMap(32, 32, 15, 10);

	map.imagePath = 'resources/enchantjs/x2/dotmat.gif';

	const ___ = -1;

	// マップの地形をつくる
	map.bmap.loadData(
		[
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
			[55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55]
		],
		[
			[
				323,
				54,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___
			],
			[35, 15, ___, ___, ___, ___, ___, ___, ___, ___, ___, ___, ___, ___, ___],
			[___, ___, 16, 75, 75, 75, 75, 75, 17, ___, ___, ___, ___, ___, ___],
			[___, ___, 56, 323, 323, 323, 323, 323, 54, ___, ___, ___, ___, ___, ___],
			[75, 75, 76, 323, 323, 323, 323, 323, 74, 75, 75, 75, 75, 75, 75],
			[
				323,
				323,
				323,
				323,
				323,
				323,
				323,
				323,
				323,
				323,
				323,
				323,
				323,
				323,
				323
			],
			[35, 35, 36, 323, 323, 323, 323, 323, 34, 35, 35, 35, 35, 35, 35],
			[___, ___, 56, 323, 323, 323, 323, 323, 54, ___, ___, ___, ___, ___, ___],
			[___, ___, 14, 35, 35, 35, 35, 35, 15, ___, ___, ___, ___, ___, ___],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___
			]
		]
	);

	// マップの歩ける場所を決める
	// 1 なら歩けないし、 0 なら歩ける
	map.cmap = [
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
		[0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];

	Hack.maps[mapName] = map;
}

export function createMap4() {
	// map4 というマップを作る
	const mapName = 'map4';

	// 15, 10 の大きさにする ( 32 の部分は書き換えないでください )
	const map = new RPGMap(32, 32, 15, 10);

	map.imagePath = 'resources/enchantjs/x2/dotmat.gif';

	const ___ = -1;

	// マップの地形をつくる
	map.bmap.loadData(
		[
			[
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				206,
				322,
				322,
				322
			],
			[
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				206,
				322,
				322,
				322
			],
			[
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				206,
				322,
				322,
				322
			],
			[
				166,
				225,
				225,
				225,
				167,
				205,
				205,
				205,
				205,
				205,
				205,
				206,
				322,
				322,
				322
			],
			[
				206,
				322,
				322,
				322,
				224,
				225,
				225,
				225,
				225,
				225,
				225,
				226,
				322,
				322,
				322
			],
			[
				206,
				322,
				322,
				322,
				322,
				322,
				322,
				322,
				322,
				322,
				322,
				322,
				322,
				322,
				322
			],
			[
				206,
				322,
				322,
				322,
				184,
				185,
				185,
				185,
				185,
				185,
				185,
				186,
				322,
				322,
				322
			],
			[
				164,
				185,
				185,
				185,
				165,
				205,
				205,
				205,
				205,
				205,
				205,
				206,
				322,
				322,
				322
			],
			[
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				206,
				322,
				322,
				322
			],
			[
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				205,
				206,
				322,
				322,
				322
			]
		],
		[
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				461,
				462,
				461
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				481,
				482,
				481
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				421,
				421,
				461
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				421,
				421,
				481
			],
			[
				___,
				421,
				421,
				421,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				421,
				421,
				___
			],
			[
				___,
				421,
				___,
				421,
				421,
				421,
				421,
				421,
				421,
				421,
				421,
				421,
				421,
				421,
				___
			],
			[
				___,
				421,
				421,
				421,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				421,
				421,
				461
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				421,
				421,
				481
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				461,
				462,
				461
			],
			[
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				___,
				481,
				482,
				481
			]
		]
	);

	// マップの歩ける場所を決める
	// 1 なら歩けないし、 0 なら歩ける
	map.cmap = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]
	];

	Hack.maps[mapName] = map;
}
