class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd('ジェミニレーザー');
		this.move(('▼ いどう', 'ひだりから'), 9);
		this.move(('▼ いどう', 'うえから'), 5);
	}
	プレイヤーがあるいたら(left, top, pLeft, pTop) {
		this.move(('▼ いどう', 'ひだりから'), pLeft);
		this.move(('▼ いどう', 'うえから'), pTop);
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
