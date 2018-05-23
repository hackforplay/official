import SAT from '../lib/sat.min';
import enchant from '../enchantjs/enchant';
import './enchantjs-kit';
import RPGObject from './object/object';

const game = enchant.Core.instance;
game.on('enterframe', trodden);

/**
 * isKinematic (velocity, force がない) な RPGObject の collider に
 * 任意の RPGObject の center が入ったときに "trodden" イベントを dispatch する
 */
export default function trodden() {
	const { collection } = RPGObject;
	const kinematics = collection.filter(item => item.isKinematic);
	for (const target of kinematics) {
		const colliders = target.colliders || [target.collider];
		target._currentTroddenObjects = target._currentTroddenObjects || new Set();
		// さっきまで踏んでいたオブジェクトが今も残っているか調べる
		// オブジェクトは collection から削除されている可能性があることに注意する
		for (const item of target._currentTroddenObjects) {
			if (!isTrodden(colliders, item.center)) {
				dispatch('removetrodden', target, item);
				target._currentTroddenObjects.delete(item);
			}
		}
		for (const item of collection) {
			if (target === item) continue;
			if (
				!target._currentTroddenObjects.has(item) &&
				isTrodden(colliders, item.center)
			) {
				dispatch('addtrodden', target, item);
				target._currentTroddenObjects.add(item);
			}
		}
	}
}

function isTrodden(colliders, center) {
	const p = new SAT.Vector(center.x, center.y);
	return colliders.some(poly => SAT.pointInPolygon(p, poly));
}

function dispatch(name, target, item) {
	const event = new Event(name);
	event.item = item;
	target.dispatchEvent(event);
}

export function unregister() {
	game.off('enterframe', trodden);
}
