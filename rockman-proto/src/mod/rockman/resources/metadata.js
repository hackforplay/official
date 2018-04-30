const cwd = 'mod/rockman/resources/';
const abs = rel => rel.replace('./', cwd);
const fill = (num, length) => Array.from({ length }).fill(num);

export const metadatas = {
	AirShooterEffect: {
		name: 'エアーシューター',
		fileName: abs('./AirShooterEffect.png'),
		width: 32,
		height: 32,
		offsetX: 0,
		offsetY: 0,
		frames: {
			idle: [6, 6, 5, 5, 4, 4]
		},
		directionType: 'double'
	},
	AtomicFire: {
		name: 'アトミックファイヤー',
		fileName: abs('./AtomicFire.png'),
		width: 32,
		height: 32,
		offsetX: 0,
		offsetY: 0,
		frames: {
			idle: [4],
			'power-1': [5, 4],
			'power-2': [3, 2],
			'power-3': [1, 0]
		},
		directionType: 'double'
	},
	Bullet: {
		name: 'Rockman/Bullet',
		fileName: abs('./Bullet.png'),
		width: 8,
		height: 8,
		offsetX: 12,
		offsetY: 12,
		frames: {
			idle: [0]
		},
		directionType: 'single'
	},
	Rockman: {
		name: 'ロックマン',
		fileName: abs('./Rockman.png'),
		width: 32,
		height: 32,
		offsetX: 0,
		offsetY: 0,
		frames: {
			appear: fill(9, 10).concat(8, 7, 6, null),
			idle: fill(6, 30 * 6).concat(fill(5, 6)),
			walk: [4, 1, 1, 2, 2, 2, 3, 3, 2, 2, 2],
			attack: [null],
			damaged: [11, 11, 11, 11, 10, 10, 10, null],
			dead: fill(5, 13).concat([6, 7, 8], fill(9, 10)),
			AirShooter: fill(4, 8).concat(null),
			AtomicFire: [4],
			GeminiLaser: fill(4, 8).concat(null),
			LeafShield: fill(6, 6).concat(null),
			SuperArm: [1, 1, 1, 2, 2, 2].concat(null),
			TimeStopper: fill(0, 6).concat(null)
		},
		directionType: 'double'
	},
	NeoMetall: {
		name: 'ネオメットール',
		fileName: abs('./NeoMetall.png'),
		width: 21,
		height: 21,
		offsetX: 5,
		offsetY: 5,
		frames: {
			idle: [3],
			walk: [2, 2, 2, 3, 3, 3],
			attack: [3],
			damaged: [3, -1],
			dead: [3, 2, 1, 0, null]
		},
		directionType: 'double'
	},
	EnergyTank: {
		name: 'エネルギー缶',
		fileName: abs('./EnergyTank.png'),
		width: 16,
		height: 16,
		offsetX: 8,
		offsetY: 8,
		frames: {
			idle: [0]
		},
		directionType: 'single'
	},
	TimeStopper: {
		name: 'タイムストッパー',
		fileName: abs('./TimeStopper.png'),
		width: 16,
		height: 16,
		offsetX: 8,
		offsetY: 8,
		frames: {
			idle: [].concat(fill(2, 4), fill(1, 4), fill(0, 4))
		},
		directionType: 'single'
	}
};

export const fileNames = Object.values(metadatas).map(value => value.fileName);
