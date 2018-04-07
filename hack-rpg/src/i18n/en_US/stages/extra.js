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
			if (confirm('Would you like to HACK here?')) {
				feeles.openEditor(fileName);
			} else if (confirm('RETURN to the previous stage')) {
				feeles.replace('stages/7/index.html');
			}
		};
	} else {
		magic.mod(('▼ スキン', _mまほうじん));
		magic.onのった = () => {
			Hack.log('THIS PORTAL IS BROKEN');
			const { text } = Hack.textarea;
			feeles.setTimeout(() => {
				if (text === Hack.textarea.text) {
					Hack.textarea.hide();
				}
			}, 3000);
		};
	}
};
