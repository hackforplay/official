import 'hackforplay/rpg-kit-main';
import 'hackforplay/camera';
import 'hackforplay/loader';
import 'hackforplay/rpg-kit-rpgobjects';

import Hack from './hack';
import * as synonyms from './synonyms';
import Skin from './skin';
import Family from './family';
import './mod/collider-debugger';
import RPGObject from './object/object';
import MapObject from './object/map-object';
import Player from './object/player';
import Effect from './object/effect';
import BehaviorTypes from './behavior-types';
import find from './find';
import Key from './key';

// Global
self.Hack = self.Hack || Hack;
self.Skin = self.Skin || Skin;
self.Family = self.Family || Family;
self.RPGObject = self.RPGObject || RPGObject;
self.BehaviorTypes = self.BehaviorTypes || BehaviorTypes;
self.MapObject = self.MapObject || MapObject;
self.Player = self.Player || Player;
self.Effect = self.Effect || Effect;
self.Key = self.Key || Key;

// Assign synonyms
Hack.assets = Hack.assets || {};
for (const [from, _global, _skin] of synonyms.assets) {
	const mod = Hack.assets[from];
	if (typeof mod === 'function') {
		self[_global] = Skin[_skin] = mod; // synonym
		Skin.__name.set(mod, _skin); // Skin.__name.get(mod) === 'mod name'
	}
}

// find
/**
 * その name をもつオブジェクトを取得する
 * @param {string} name オブジェクトの名前
 * @returns {RPGObject|null} オブジェクトあるいは null
 */
Hack.find = find;
