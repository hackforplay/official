const cwd = 'mod/rockman/resources/';

export const fileNames = [
	'./AirShooter.png',
	'./AtomicFire.png',
	'./GeminiLaser.png',
	'./HyperBomb.png',
	'./LeefShield.png',
	'./Rockman.png',
	'./SuperArm.png',
	'./ThunderBeam.png',
	'./TimeStopper.png'
].map(s => s.replace('./', cwd));

export const metadata = {
	AirShooter: {
		name: `${cwd}AirShooter.png`,
		width: 40,
		height: 40,
		offsetX: -4,
		offsetY: -8
	},
	AtomicFire: {
		name: `${cwd}AtomicFire.png`,
		width: 40,
		height: 40,
		offsetX: -4,
		offsetY: -8
	},
	GeminiLaser: {
		name: `${cwd}GeminiLaser.png`,
		width: 40,
		height: 40,
		offsetX: -4,
		offsetY: -8
	},
	HyperBomb: {
		name: `${cwd}HyperBomb.png`,
		width: 40,
		height: 40,
		offsetX: -4,
		offsetY: -8
	},
	LeefShield: {
		name: `${cwd}LeefShield.png`,
		width: 40,
		height: 40,
		offsetX: -4,
		offsetY: -8
	},
	Rockman: {
		name: `${cwd}Rockman.png`,
		width: 32,
		height: 32,
		offsetX: 0,
		offsetY: 0
	},
	SuperArm: {
		name: `${cwd}SuperArm.png`,
		width: 40,
		height: 40,
		offsetX: -4,
		offsetY: -8
	},
	ThunderBeam: {
		name: `${cwd}ThunderBeam.png`,
		width: 40,
		height: 40,
		offsetX: -4,
		offsetY: -8
	},
	TimeStopper: {
		name: `${cwd}TimeStopper.png`,
		width: 40,
		height: 40,
		offsetX: -4,
		offsetY: -8
	}
};
