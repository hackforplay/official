class MyRockman extends Rockman {
	しょうかんされたら() {
		Hack.log('こんにちは！');
	}
	プレイヤーがあるいたら(left, top, pLeft, pTop) {
		this.move(('▼ いどう', 'ひだりから'), pLeft);
		this.move(('▼ いどう', 'うえから'), pTop);
	}
	とうちゃくしたら(left, top) {}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
