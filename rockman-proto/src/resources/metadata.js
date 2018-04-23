const cwd = 'resources/';
const abs = rel => rel.replace('./', cwd);

export const metadatas = {
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
	}
};

export const fileNames = Object.values(metadatas).map(value => value.fileName);
