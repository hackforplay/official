import 'hackforplay/enchantjs-kit';
import 'mod/stop';
import 'mod/coordinate';

import 'hackforplay/hack';
import 'hackforplay/rpg-kit-rpgobjects';
import 'hackforplay/rpg-kit-color';

import { Group } from 'enchantjs/enchant';
import Camera from 'hackforplay/camera';

import { CanvasRenderer } from 'enchantjs/enchant';
import { KeyClass } from 'mod/key';

import Keyboard from 'hackforplay/keyboard';
import { stringToArray, dakuten, handakuten } from 'hackforplay/utils/string-utils';

import RPGMap from './rpg-map';

const game = enchant.Core.instance;


game.preload('enchantjs/monster1.gif', 'enchantjs/monster2.gif', 'enchantjs/monster3.gif', 'enchantjs/monster4.gif', 'enchantjs/bigmonster1.gif', 'enchantjs/bigmonster2.gif', 'enchantjs/x2/map1.gif', 'enchantjs/x2/dotmat.gif', 'enchantjs/x1.5/chara0.png', 'enchantjs/x1.5/chara5.png', 'hackforplay/enchantbook.png', 'enchantjs/icon0.png', 'enchantjs/x2/effect0.png', 'hackforplay/madosyo_small.png', 'enchantjs/shadow.gif', 'enchantjs/x1.5/chara7.png',
	'hackforplay/clear.png', 'hackforplay/gameover.png', 'hackforplay/button_retry.png', 'hackforplay/new_button_replay.png', 'hackforplay/new_button_retry.png', 'hackforplay/menu-button-menu.png', 'hackforplay/menu-button-restage.png', 'hackforplay/menu-button-hint.png', 'hackforplay/menu-button-comment.png', 'hackforplay/menu-button-retry.png', 'hackforplay/new_button_next.png', 'hackforplay/new_button_comment.png', 'hackforplay/new_button_restage.png', 'hackforplay/attack.png',
	'hackforplay/magician_girl.png');

game.keybind(' '.charCodeAt(0), 'a');



Hack.on('load', function() {
	// Appending to Hack.maps
	if (Hack.maps && !Hack.maps['next']) {
		Object.defineProperty(Hack.maps, 'next', {
			get: function() {
				var next = null;
				Object.keys(Hack.maps).reduce(function(previousKey, currentKey, index) {
					next = Hack.map === Hack.maps[previousKey] ? currentKey : next;
				});
				return next;
			}
		});
	}
	if (Hack.maps && !Hack.maps['current']) {
		Object.defineProperty(Hack.maps, 'current', {
			get: function() {
				var current = null;
				Object.keys(Hack.maps).forEach(function(key) {
					current = Hack.map === Hack.maps[key] ? key : current;
				});
				return current;
			}
		});
	}
	if (Hack.maps && !Hack.maps['previous']) {
		Object.defineProperty(Hack.maps, 'previous', {
			get: function() {
				var previous = null;
				Object.keys(Hack.maps).reduceRight(function(previousKey, currentKey) {
					previous = Hack.map === Hack.maps[previousKey] ? currentKey : previous;
				});
				return previous;
			}
		});
	}
});

game.on('load', () => {

	// マウス座標
	let mouseX = null;
	let mouseY = null;
	// 正規化されたマウス座標
	let normalizedMouseX = null;
	let normalizedMouseY = null;

	game._element.onmousemove = function({ x, y }) {
		const rect = this.getBoundingClientRect();
		mouseX = x;
		mouseY = y;
		normalizedMouseX = x / rect.width;
		normalizedMouseY = y / rect.height;
	};

	Object.defineProperties(Hack, {
		mouseX: { get: () => mouseX },
		mouseY: { get: () => mouseY },
		normalizedMouseX: { get: () => normalizedMouseX },
		normalizedMouseY: { get: () => normalizedMouseY }
	});

	// マウスの入力状態
	Hack.mouseInput = new KeyClass();
	let mousePressed = false;
	game.rootScene.on('touchstart', () => mousePressed = true);
	game.rootScene.on('touchend', () => mousePressed = false);
	game.on('enterframe', () => Hack.mouseInput.update(mousePressed));

	// カメラグループ
	const cameraGroup = new Group();
	cameraGroup.name = 'CameraGroup';
	cameraGroup.order = 100;

	Hack.cameraGroup = cameraGroup;
	game.rootScene.addChild(cameraGroup);

	// デフォルトのカメラを作成する
	const camera = Hack.camera = Camera.main = new Camera();

	// ゲーム開始時にデフォルトのカメラのターゲットが存在しないならプレイヤーを割り当てる
	game.on('load', () => {
		if (!camera.target) camera.target = Hack.player;
	});


	// コントローラーグループ
	const controllerGroup = new enchant.Group();
	controllerGroup.name = 'ControllerGroup';
	controllerGroup.order = 300;


	Hack.controllerGroup = controllerGroup;

	game.rootScene.addChild(controllerGroup);


	var pad = new Pad();
	pad.moveTo(20, 200);
	pad.onenterframe = function() {
		game.rootScene.addChild(this);
	};
	game.rootScene.addChild(pad);
	Hack.pad = pad;

	var apad = new Sprite(64, 64);
	apad.image = game.assets['hackforplay/attack.png'];
	apad.buttonMode = 'a';
	apad.moveTo(400, 250);
	apad.onenterframe = function() {
		game.rootScene.addChild(this);
	};
	game.rootScene.addChild(apad);
	Hack.apad = apad;

	// Enchant book
	Hack.enchantBookIcon = Hack.createSprite(64, 64, {
		image: game.assets['hackforplay/enchantbook.png'],
		defaultParentNode: Hack.menuGroup,
		visible: !!Hack.hint,
		ontouchend: function() {
			Hack.textarea.hide();
			Hack.openEditor();
		}
	});
	Hack.onhintset = function(event) {
		Hack.enchantBookIcon.visible = true;
	};

	// Textarea
	Hack.textarea.moveTo(64, 0);
	Hack.textarea.width = 340;
	Hack.textarea.height = 32;

	// Life label
	Hack.lifeLabel = Hack.player && (function() {
		var maxhp, hp;
		maxhp = hp = this.life = Hack.player.hp;
		Hack.player.on('hpchange', function() {
			var hp = Hack.player.hp;
			maxhp = Math.max(maxhp, hp);
			Hack.lifeLabel.life = maxhp < Hack.lifeLabel._maxlife ? hp : (hp / maxhp) * Hack.lifeLabel._maxlife;
		});
		Hack.menuGroup.addChild(this);
		return this;

	}).call(new LifeLabel(Hack.menuGroup.x + 10, Hack.menuGroup.y + 72, 9));

	Hack.scoreLabel = (function(self, source) {
		Object.keys(source).filter(function(key) {
			var desc = Object.getOwnPropertyDescriptor(source, key);
			return desc !== undefined && desc.enumerable;
		}).forEach(function(key) {
			self[key] = source[key];
		});
		Hack.menuGroup.addChild(self);
		return self;
	})(new ScoreLabel(Hack.menuGroup.x + 10, Hack.menuGroup.y + 88), Hack.scoreLabel);

	feeles.setAlias('Hack', Hack);
	feeles.setAlias('game', game);
});

// 互換性維持
MapObject._dictionary = {};
Object.defineProperty(MapObject, 'dictionary', {
	configurable: true,
	enumerable: true,
	get: function() {
		return this._dictionary;
	},
	set: function(value) {
		Object.keys(value).forEach(function(key) {
			this._dictionary[key] = value[key];
		}, this);
	}
});
MapObject.dictionary = MapObject.Dictionaly || {}; // 旧仕様ユーザー定義
MapObject.dictionary = {
	// 新仕様公式定義
	clay: 320,
	clayWall: 340,
	clayFloor: 323,
	stone: 321,
	stoneWall: 341,
	stoneFloor: 342,
	warp: 324,
	warpRed: 325,
	warpGreen: 326,
	warpYellow: 327,
	magic: 328,
	usedMagic: 329,
	pot: 400,
	rock: 401,
	upStair: 402,
	box: 420,
	flower: 421,
	downStair: 422,
	trap: 440,
	usedTrap: 441,
	step: 442,
	castle: 500,
	village: 501,
	caveGate: 502,
	tree: 520,
	table: 521,
	openedBox: 522,
	beam: 540,
	diamond: 560,
	sapphire: 561,
	ruby: 562,
	heart: 563,
	skull: 564,
	coin: 565,
	star: 566,
	key: 567,
	bomb: 580,
	coldBomb: 581,
	egg: 582,
	poo: 583,
	sandySoil: 45,
	claySoil: 323,
	grassland: 322,
	waterside: 205,
	flatGray: 135,
	squareGray: 93,
};

// １枚ずつ切り分けたsurface
MapObject.surfaces = {};
Object.keys(MapObject.dictionary).forEach(function(name) {
	Object.defineProperty(MapObject.surfaces, name, {
		enumerable: true,
		configurable: true,
		get: function() {
			return tryFetchMapImage(name);
		},
		set: function(value) {
			Object.defineProperty(MapObject.surfaces, name, {
				value: value
			});
		}
	});
});

function tryFetchMapImage(name) {
	if (game.assets['enchantjs/x2/dotmat.gif']) {
		var length = 20,
			w = 32,
			h = 32;
		var frame = MapObject.dictionary[name],
			x = (frame % length) * w,
			y = ((frame / length) >> 0) * h;
		var s = new Surface(w, h);
		s.draw(game.assets['enchantjs/x2/dotmat.gif'], x, y, w, h, 0, 0, w, h);
		return MapObject.surfaces[name] = s;
	}
	return undefined;
}

Object.keys(MapObject.dictionary).forEach(function(name) {
	Hack.assets[name] = function() {
		this.image = MapObject.surfaces[name];
		this.width = 32;
		this.height = 32;
		this.offset = {
			x: 0,
			y: 0
		};
		this.directionType = 'single';
		this.forward = [0, -1];
	};
});

Object.defineProperty(window, 'RPGMap', {
	get: function() {
		return RPGMap;
	}
});



RPGMap.Layer = {
	Over: 4,
	Player: 3,
	Middle: 2,
	Shadow: 1,
	Under: 0,
};

Hack.changeMap = function(mapName) {
	(function(current, next) {
		if (next === undefined) {
			switch (typeof mapName) {
				case 'string':
					Hack.log(mapName + ' は、まだつくられていない');
					break;
				case 'object':
					Hack.log('まだ マップが つくられていないようだ');
					break;
				case 'number':
					Hack.log(mapName + ' ではなく \'map' + mapName + '\' ではありませんか？');
					break;
				default:
					Hack.log('Hack.changeMap(\'map2\'); の ように かいてみよう');
					break;
			}
		} else if (!current) {
			// 最初のマップをロード
			next.load();
		} else if (current !== next) {
			var r = function(n) {
				game.rootScene.removeChild(n);
			};
			r(Hack.map.bmap);
			r(Hack.map.scene);
			r(Hack.map.fmap);
			next.load();
			current.dispatchEvent(new Event('leavemap'));
			next.dispatchEvent(new Event('entermap'));
		}
	})(Hack.map, Hack.maps[mapName]);
};

/*  Dir2Vec
directionをforwardに変換する。 0/down, 1/left, 2/right, 3/up
*/
Hack.Dir2Vec = function(dir) {
	switch (dir) {
		case 0:
			return {
				x: 0,
				y: 1
			};
		case 1:
			return {
				x: -1,
				y: 0
			};
		case 2:
			return {
				x: 1,
				y: 0
			};
		case 3:
			return {
				x: 0,
				y: -1
			};
		default:
			return null;
	}
};
/*  Vec2Dir
forwardをdirectionに変換する。およそのベクトルをまるめて近い向きに直す
*/
Hack.Vec2Dir = function(vec) {
	if (vec.x === undefined || vec.y === undefined) {
		return null;
	}
	if (vec.x === 0 && vec.y === 0) {
		return null;
	}
	var deg = Math.atan2(vec.y, vec.x) / Math.PI * 180;
	if (-135 <= deg && deg <= -45) {
		return 3;
	} // up
	if (-45 <= deg && deg <= 45) {
		return 2;
	} // right
	if (45 <= deg && deg <= 135) {
		return 0;
	} // down
	return 1; // left
};

Hack.Attack = function(x, y, damage, pushX, pushY) {
	RPGObject.collection.filter(function(item) {
		return item.mapX === x && item.mapY === y && item !== this;
	}, this).forEach(function(item) {
		var e = new Event('attacked');
		e.attacker = this;
		e.damage = damage || 0;
		item.dispatchEvent(e);
	}, this);
};

/**
 * Hack.score
 * Generic scoring property
 * Invoke Hack.onscorechange
 */
var scorechangeFlag = false;
Object.defineProperty(Hack, 'score', {
	enumerable: true,
	configurable: false,
	get: function() {
		return Hack.scoreLabel.score;
	},
	set: function(value) {
		if (Hack.scoreLabel.score !== value) {
			Hack.scoreLabel.score = value;
			scorechangeFlag = true;
		}
	}
});
Hack.scoreLabel = Object.create(null); // 仮オブジェクト
Hack.score = 0; // Fire a event and Initialize score
game.on('enterframe', function() {
	if (scorechangeFlag && Hack.isPlaying) {
		Hack.dispatchEvent(new Event('scorechange'));
		scorechangeFlag = false;
	}
});

/* Timeline Extention
 * become(type[, time])
 * time フレームが経過した時、behavior typeを指定する
 */
enchant.Timeline.prototype.become = function(type, time) {
	this.add(new enchant.Action({
		onactionstart: function() {
			var capital = type[0].toUpperCase() + type.substr(1).toLowerCase();
			if (this instanceof RPGObject && BehaviorTypes.hasOwnProperty(capital)) {
				this.behavior = BehaviorTypes[capital];
			}
		},
		time: time || 0
	}));
	return this;
};

/* random
 * Random value between min to max (Detection type)
 * (int, int) ===> int
 * (float, int|float) ====> float
 * (value, value) ====> value ~ value
 * (value) ====> 0 ~ value
 * (Array) ====> value in Array
 * () ====> 0 ~ 1
 */
window.random = window.random || function(min, max) {
	if (arguments.length === 0) return Math.random();
	if (min instanceof Array) {
		var keys = Object.keys(min);
		return min[keys[random(keys.length)]];
	}
	var _min = arguments.length >= 2 ? Math.min(min, max) : 0;
	var _sub = arguments.length >= 2 ? Math.max(min, max) - _min : min;
	if (min % 1 === 0 && (max === undefined || max % 1 === 0)) {
		return _min + Math.random() * _sub >> 0; // integer
	} else {
		return _min + Math.random() * _sub;
	}
};
