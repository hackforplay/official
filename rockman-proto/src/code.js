class MyRockman extends Rockman {
	しょうかんされたら() {
		Hack.log('こんにちは！');
	}
	プレイヤーがあるいたら(left, top, pLeft, pTop) {
		this.move(('▼ いどう', 'ひだりから'), pLeft);
		this.move(('▼ いどう', 'うえから'), pTop);
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
