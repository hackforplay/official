/*
 * 〜　コードの世界(せかい)　〜
 * 転移装置(てんいそうち) はコードによって 封印(ふういん) されていた…
 * これでは ステージを 改造(かいぞう) しに行けない！
 * 下のコードによって、封印をとめられるらしいが…
 *
 * 『封印 を とめるには、
 * 　どうすればいいだろうか？』
 *
 */

export const じゅもん = ('▼ ふういん', 'する');














export const flag = じゅもん !== 'する';

export default function makeMagic(x, y, map, fileName) {

	/* Remove the tutorial hacking */
	return;

	const magic = new RPGObject();
	magic.locate(x, y, map);
	magic.layer = RPGMap.Layer.Under;
	magic.collisionFlag = false;
	if (flag) {
		magic.mod(('▼ スキン', _mまほうじんひかった));
		magic.onのった = () => {
			if (confirm('このステージを 改造(かいぞう) しますか？')) {
				feeles.openEditor(fileName);
			} else if (confirm('もどりますか？')) {
				feeles.replace('stages/7/index.html');
			}
		};
	} else {
		magic.mod(('▼ スキン', _mまほうじん));
		magic.onのった = () => {
			Hack.log('ふういんのせいで つかえない');
			const { text } = Hack.textarea;
			feeles.setTimeout(() => {
				if (text === Hack.textarea.text) {
					Hack.textarea.hide();
				}
			}, 3000);
		};
	}
};
