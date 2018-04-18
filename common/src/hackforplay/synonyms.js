export const assets = [
	/* Hack.assets.knight === self._kきし === Skin.きし */
	['magician', '_mまじょ', 'まじょ'],
	['knight', '_kきし', 'きし'],
	['darkKnight', '_aあんこくきし', 'あんこくきし'],
	['slime', '_sスライム', 'スライム'],
	['insect', '_iいもむし', 'いもむし'],
	['spider', '_kくも', 'くも'],
	['bat', '_kこうもり', 'こうもり'],
	['dragon', '_dドラゴン', 'ドラゴン'],
	['minotaur', '_mミノタウルス', 'ミノタウルス'],
	['boy', '_o男の子', '男の子'],
	['girl', '_o女の子', '女の子'],
	['woman', '_o女の人', '女の人'],
	['enchantBookItem', '_m魔道書', '魔道書'],
	['explosion', '_bばくえん', 'ばくえん'],
	['ouroboros', '_uウロボロス', 'ウロボロス'],
	['beam', '_bビーム', 'ビーム'],
	['downStair', '_kくだりかいだん', 'くだりかいだん'],
	['upStair', '_nのぼりかいだん', 'のぼりかいだん'],
	['warp', '_wワープ', 'ワープ'],
	['castle', '_sしろ', 'しろ'],
	['flower', '_hはな', 'はな'],
	['ruby', '_rルビー', 'ルビー'],
	['trap', '_wわな', 'わな'],
	['usedTrap', '_wわなかかった', 'わなかかった'],
	['heart', '_hハート', 'ハート'],
	['tree', '_k木', '木'],
	['rock', '_iいわ', 'いわ'],
	['clayWall', '_tつちかべ', 'つちかべ'],
	['stoneWall', '_iいしかべ', 'いしかべ'],
	['box', '_tたからばこ', 'たからばこ'],
	['openedBox', '_tたからばこひらいた', 'たからばこひらいた'],
	['skull', '_dドクロ', 'ドクロ'],
	['poo', '_uうんこ', 'うんこ'],
	['pot', '_tつぼ', 'つぼ'],
	['diamond', '_dダイヤモンド', 'ダイヤモンド'],
	['magic', '_mまほうじん', 'まほうじん'],
	['usedMagic', '_mまほうじんひかった', 'まほうじんひかった'],
	['coin', '_kコイン', 'コイン'],
	['sapphire', '_sサファイア', 'サファイア'],
	['star', '_hほし', 'ほし'],
	['key', '_kかぎ', 'かぎ'],
	['bomb', '_bばくだん', 'ばくだん']
];

export const events = {
	/* onplayerenter => onのった */
	playerenter: 'のった',
	playerstay: 'いる',
	playerexit: 'おりた',
	walkstart: 'あるきはじめた',
	walkmove: 'あるいている',
	walkend: 'あるきおわった',
	triggerenter: 'ふれはじめた',
	triggerstay: 'ふれつづけている',
	triggerexit: 'ふれおわった',
	collided: 'ぶつかった',
	hpchange: 'HPかわった',
	becomeidle: 'とまるとき',
	becomewalk: 'あるくとき',
	becomeattack: 'こうげきするとき',
	becomedamaged: 'くらったとき',
	becomedead: 'たおれたとき',
	attacked: 'こうげきされた',
	enterframe: 'つねに'
};
