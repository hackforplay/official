import { Core } from 'enchantjs/enchant';
import { addSkin } from 'hackforplay/skin';

import { fileNames, metadatas } from './resources/metadata';

const game = Core.instance;
if (game) {
	// 画像のプリロード
	game.preload(fileNames);

	for (const key in metadatas) {
		if (metadatas.hasOwnProperty(key)) {
			const metadata = metadatas[key];
			// スキンを追加
			addSkin(metadata.name, function() {
				// this が bind されているかチェックする
				if (!this instanceof RPGObject) return;

				this.image = game.assets[metadata.fileName];
				this.width = metadata.width;
				this.height = metadata.height;
				this.offset = {
					x: metadata.offsetX,
					y: metadata.offsetY
				};
				for (const key in metadata.frames) {
					if (metadata.frames.hasOwnProperty(key)) {
						const frames = metadata.frames[key];
						this.setFrame(key, frames);
					}
				}
				this.directionType = metadata.directionType;
				this.forward = [1, 0];
			});
		}
	}
}
