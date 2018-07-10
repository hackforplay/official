import test from 'ava';
import createCompatibleMap from '../common/hackforplay/create-compatible-map';
import enchant from './helpers/enchant';

test('create new instance from enchant.Game', t => {
	enchant();
	const core = new enchant.Game(480, 320);
	t.is(core.width, 480);
	t.is(core.height, 320);
});

// Data URL
const dataURL = {
	transparent:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAChJREFUWAnt0IEAAAAAw6D5Ux/khVBhwIABAwYMGDBgwIABAwYMvA8MECAAAc4qtccAAAAASUVORK5CYII=',
	white:
		'data:image/png,base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADJJREFUWAnt0EENAAAIAzHAv2cgmODTGbil2bt4XD22L+0AAQIECBAgQIAAAQIECBAgME2IBDzy317fAAAAAElFTkSuQmCC',
	black:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAADVJREFUWAnt0LENAEAIAkD8/XdWi9/B5kioIVdJenuWd7b8hx0gQIAAAQIECBAgQIAAAQIEBiESAT/N9/smAAAAAElFTkSuQmCC'
};

test('Hack.createCompatibleMap', t => {
	const exampleMap = {
		tables: [
			[
				[101, 101, 101, 101, 101, 101, 101, 101, 101, 101],
				[101, 101, 101, 101, 101, 101, 101, 101, 101, 101],
				[101, 101, 101, 101, 101, 101, 101, 101, 101, 101],
				[101, 101, 101, 101, 101, 101, 101, 101, 101, 101],
				[101, 101, 101, 101, 101, 101, 101, 101, 101, 101],
				[101, 101, 101, 101, 101, 101, 101, 101, 101, 101]
			],
			[
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
				[100, 100, 100, 102, 102, 102, 102, 100, 100, 100],
				[100, 100, 100, 102, 102, 102, 102, 100, 100, 100],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
			],
			[
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 102],
				[100, 100, 103, 103, 100, 100, 100, 100, 100, 102],
				[100, 100, 103, 103, 100, 100, 100, 100, 100, 102],
				[100, 100, 103, 103, 100, 100, 100, 100, 100, 102],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 102],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 102]
			]
		],
		squares: {
			'100': {
				tile: {
					size: [32, 32],
					image: {
						type: 'data-url',
						value: dataURL.transparent
					},
					order: 'Inherit',
					isAutoTile: false,
					isAnimation: false,
					collider: [false, false, false, false],
					authors: []
				},
				order: 'Inherit',
				collider: [false, false, false, false]
			},
			'101': {
				tile: {
					size: [32, 32],
					image: {
						type: 'data-url',
						value: dataURL.black
					},
					order: 'Inherit',
					isAutoTile: false,
					isAnimation: false,
					collider: [false, false, false, false],
					authors: []
				},
				order: 'Inherit',
				collider: [false, false, false, false]
			},
			'102': {
				tile: {
					size: [32, 32],
					image: {
						type: 'data-url',
						value: dataURL.white
					},
					order: 'Object',
					isAutoTile: false,
					isAnimation: false,
					collider: [true, true, true, true],
					authors: []
				},
				order: 'Object',
				collider: [true, true, true, true]
			},
			'103': {
				tile: {
					size: [32, 32],
					image: {
						type: 'data-url',
						value: dataURL.black
					},
					order: 'Above',
					isAutoTile: false,
					isAnimation: false,
					collider: [false, false, false, false],
					authors: []
				},
				order: 'Above',
				collider: [false, false, false, false]
			}
		}
	};

	const result = createCompatibleMap(exampleMap, {
		RPGMap,
		Surface: enchant.Surface
	});

	t.true(result instanceof RPGMap);
	if (!(result instanceof RPGMap)) return;
	t.is(
		result.image.width * result.image.height,
		32 * 32 * 4,
		'32x32のタイル4枚分のバッファが必要です'
	);
	t.false(result.hitTest(0, 0), 'すべてのテーブルで通路です');
	t.false(result.hitTest(3 * 32, 2 * 32), '壁を通路で上書きします');
	t.true(result.hitTest(4 * 32, 2 * 32), '継承されても壁のままです');
	t.true(result.hitTest(9 * 32, 5 * 32), '最も手前のタイルが壁です');
	t.deepEqual(result.bmap.data, [
		[
			/*データ*/
		]
	]);
	t.deepEqual(result.fmap.data, [
		[
			/*データ*/
		]
	]);
});

class RPGMap {
	constructor() {
		this.bmap = new enchant.Map();
		this.fmap = new enchant.Map();
		this.image = new enchant.Surface();
	}
	hitTest(x, y) {}
}
