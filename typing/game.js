const odaihyou = [
	// level 0
	'FJ',
	// level 1
	'FGHJ',
	// level 2
	'ASDFGHJKL',
	// level 3
	'ZXCVBNM',
	// level 4
	'QWERTYUIOP',
	// level 5^
	'QWERTYUIOPASDFGHJKLZXCVBNM'
];
const kugiri = ' ';

const level = () => {
	return Math.floor(Hack.score / 20);
};

const mozisu = () => {
	const lv = level();
	if (lv === 0) return 3;
	if (lv === 1) return 4;
	if (lv === 2) return 5;
	if (lv === 3) return 6;
	if (lv === 4) return 7;
	else return 8;
};

const hp = () => {
	return 1 + level();
};

async function gameFunc() {
	Hack.changeMap('map1'); // map1 をロード
		
	// ラベル/UIを消す
	Hack.lifeLabel.parentNode.removeChild(Hack.lifeLabel);
	Hack.pad.parentNode.removeChild(Hack.pad);
	Hack.apad.parentNode.removeChild(Hack.apad);
	
	Hack.scoreLabel.y = 120;
	
	self.player = new Player(('▼ スキン', Skin.ナイト)); // プレイヤーをつくる
	player.name = 'プレイヤー';
	player.family = ('▼ ファミリー', Family.プレイヤー);
	player.locate(3, 5); // はじめの位置
	player.hp = 1; // 体力
	player.atk = 1; // こうげき力
	player.forward = [1, 0];
	
	Hack.time = 60;
	
	Hack.ontimeup = Hack.gameclear;
	
	Hack.on('gameclear', () => {
		showText(`☆ ${Hack.score} もじ うった！ ☆`);
	});
	Hack.on('gameover', () => {
		showText(`☆ ${Hack.score} もじ うった！ ☆`);
	});
	
	const current = new TextArea(480, 100);
	current.x = (480 - current.w) / 2;
	current.y = 0;
	current.margin = 14;
	current.defaultStyle = {
		color: '#fff',
		size: '36',
		family: 'PixelMplus, sans-serif',
		weight: 'bold',
		align: 'left',
		space: 0
	};
	Hack.menuGroup.addChild(current);
	
	let odai = getOdai();
	showOdai(odai);
	window.addEventListener('keydown', async e => {
		if (!Hack.isPlaying) {
			return;
		}
		if (e.key.toUpperCase() === odai[0]) {
			Hack.score += 1;			
			odai.shift();
			showOdai(odai);
			if (odai.length === 0) {
				player.attack();
				odai = getOdai();
				showOdai(odai);
			}
		}
	});
	
	function getOdai() {
		const lv = Math.min(level(), odaihyou.length - 1);
		const kouho = odaihyou[lv];
		let odai = [];
		for (let index = mozisu(); index > 0; index--) {
			const number = Math.random() * kouho.length >> 0;
			odai.push(kouho[number]);
		}
		return odai;
	}
	
	function showOdai(odai) {
		current.source = odai.map(capital => `<ruby value="${capital.toLowerCase()}">${capital}</ruby>`).join(kugiri);
		// current.source = odai.map(capital => `<ruby>${capital}<rt>${capital.toLowerCase()}</rt></ruby>`).join(kugiri);
		current.updateDocument();
		current.updateValues();
		current.show();
	}
	
	function showText(text) {
		current.source = text;
		current.updateDocument();
		current.updateValues();
		current.show();
	}
	
	async function koumori() {
		await player.wait(2);
		// ここからコウモリ
		const item1 = new RPGObject(('▼ スキン', Skin.コウモリ));
		item1.family = ('▼ ファミリー', Family.ドクリツ);
		item1.hp = hp();
		item1.atk = 1;
		item1.locate(11, 5, 'map1');
		item1.on(('▼ イベント', 'たおれたとき'), async () => {
			koumori();
		});
		item1.endless(async(self, count) => {
			const ターゲット = player;
			const moveX = 32 * Math.sign(ターゲット.mapX - self.mapX);
			const moveY = 32 * Math.sign(ターゲット.mapY - self.mapY);
			self.forward = [moveX, moveY];
			await self.walk(); // あるく
			await self.attack(); // こうげきする
			await self.wait(1); // やすむ
			/*+ じどう*/
		});
		// ここまでコウモリ
	}
	koumori();
	
	/*+ モンスター アイテム せっち システム */
	
	// ビーム
	player.on(('▼ イベント', 'こうげきするとき'), (event) => {
		const 使い手 = event.target;
		const ビーム = 使い手.summon(('▼ スキン', Skin.ビーム));
		ビーム.mod(Hack.createDamageMod(使い手.atk)); // ダメージオブジェクトにする
		使い手.shoot(ビーム, 使い手.forward, 10);
		ビーム.on('triggerexit', () => {
			ビーム.destroy(); // かんつうしない
		});
	});
	
	/*+ スキル */
	
	// game._debug = ('▼ フラグ', false);
}

export default gameFunc;
