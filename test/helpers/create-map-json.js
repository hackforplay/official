import * as pipoya from './pipoya';

export default function createMapJson() {
	return {
		tables: [
			[
				[103, -88, -88, -88, -88, -88, -88, -88, -88, 101],
				[103, -88, 102, 102, -88, -88, -88, -88, -88, 101],
				[103, -88, 102, 102, -88, -88, -88, -88, -88, 101],
				[-88, -88, 102, 102, -88, -88, -88, -88, -88, 101],
				[-88, -88, -88, -88, -88, -88, -88, -88, -88, 101],
				[-88, -88, -88, -88, -88, -88, -88, -88, -88, 101]
			],
			[
				[102, -88, -88, -88, -88, -88, -88, -88, -88, -88],
				[102, -88, -88, -88, -88, -88, -88, -88, -88, -88],
				[102, -88, -88, 101, 101, 101, 101, -88, -88, -88],
				[102, -88, -88, 103, 103, 103, 103, -88, -88, -88],
				[102, -88, -88, -88, -88, -88, -88, -88, -88, -88],
				[102, -88, -88, -88, -88, -88, -88, -88, -88, -88]
			],
			[
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
				[100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
			]
		],
		squares: [
			{
				index: 100,
				tile: {
					size: [32, 32],
					image: {
						type: 'data-url',
						src: pipoya.grass
					},
					order: 'Below',
					isAutoTile: false,
					isAnimation: false,
					collider: [false, false, false, false],
					author: {
						name: 'ぴぽや',
						url: 'http://blog.pipoya.net/'
					}
				}
			},
			{
				index: 101,
				tile: {
					size: [32, 32],
					image: {
						type: 'data-url',
						src: pipoya.rock
					},
					order: 'Object',
					isAutoTile: false,
					isAnimation: false,
					collider: [true, true, true, true],
					author: {
						name: 'ぴぽや',
						url: 'http://blog.pipoya.net/'
					}
				}
			},
			{
				index: 102,
				tile: {
					size: [32, 32],
					image: {
						type: 'data-url',
						src: pipoya.roof
					},
					order: 'Above',
					isAutoTile: false,
					isAnimation: false,
					collider: [],
					author: {
						name: 'ぴぽや',
						url: 'http://blog.pipoya.net/'
					}
				}
			},
			{
				index: 103,
				tile: {
					size: [32, 32],
					image: {
						type: 'data-url',
						src: pipoya.flower
					},
					order: 'Inherit',
					isAutoTile: false,
					isAnimation: false,
					collider: [], // Inherit
					author: {
						name: 'ぴぽや',
						url: 'http://blog.pipoya.net/'
					}
				}
			}
		]
	};
}
