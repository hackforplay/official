import { Core } from '../../enchantjs/enchant';
import Hack from '../hack';
import RPGObject from '../object/object';

const game = Core.instance;

game.on('awake', () => {
	Hack.world.on('postrender', render);
});

function render(event) {
	if (!game._debug) return; // for debug only

	const { context } = event.canvasRenderer.targetSurface;
	for (const item of RPGObject.collection) {
		if (!item.collider) {
			continue;
		}
		// if (width) context.lineWidth = width;
		context.beginPath();
		const [start, ...points] = item.collider.calcPoints;
		context.moveTo(start.x, start.y);
		for (const point of points) {
			context.lineTo(point.x, point.y);
		}
		context.fillStyle = item.isDamageObject
			? 'rgba(255, 0, 0, 0.5)'
			: 'rgba(255, 255, 255, 0.5)';
		context.fill();
	}
}
