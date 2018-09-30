const odaihyou = [
	// Lv.0
	'FJ',
	// Lv.1
	'FGHJ',
	// Lv.2
	'ASDFGHJKL',
	// Lv.3
	'ZXCVBNM',
	// Lv.4
	'QWERTYUIOP',
	// Lv.5
	'QWERTYUIOPASDFGHJKLZXCVBNM'
];
const mozisu = 3;
const kugiri = ' ';


async function gameFunc() {
	Hack.changeMap('map1'); // map1 をロード
	
	// ラベルを消す
	Hack.lifeLabel.parentNode.removeChild(Hack.lifeLabel);
	// COUNT LABEL
	let count = 0; // 入力した回数
	Hack.scoreLabel.label = 'COUNT:';
	Hack.scoreLabel.onenterframe = () => {
		Hack.scoreLabel.score = count;
	};
	
	self.player = new Player(('▼ スキン', Skin.ナイト)); // プレイヤーをつくる
	player.name = 'プレイヤー';
	player.family = ('▼ ファミリー', Family.プレイヤー);
	player.locate(3, 5); // はじめの位置
	player.hp = 3; // 体力
	player.atk = 1; // こうげき力
	
	const t = new TextArea(480, 90);
	t.x = (480 - t.w) / 2;
	t.y = 0;
	t.margin = 14;
	t.defaultStyle = {
		color: '#fff',
		size: '36',
		family: 'PixelMplus, sans-serif',
		weight: 'bold',
		align: 'center',
		space: 0,
		ruby: null,
		rubyId: null
	};
	Hack.menuGroup.addChild(t);
	
	let odai = getOdai();
	
	t.push(odai.join(kugiri));
	t.show();
	
	window.addEventListener('keydown', e => {
		if (e.key.toUpperCase() === odai[0]) {
			odai.shift();
			if (odai.length === 0) {
				count++;
				odai = getOdai();
			}
			t.clear();
			t.push(odai.join(kugiri));
			t.show();
		}
	});
	
	function getOdai() {
		const level = Math.min( count / 5 >> 0, odaihyou.length - 1);
		const kouho = odaihyou[level];
		let odai = [];
		for (let index = 0; index < mozisu; index++) {
			const number = Math.random() * kouho.length >> 0;
			odai.push(kouho[number]);
		}
		return odai;
	}
	
	/*+ モンスター アイテム せっち システム */
	
	/*+ スキル */
	
	game._debug = ('▼ フラグ', false);
}

export default gameFunc;
