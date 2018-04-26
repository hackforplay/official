class MyRockman extends Rockman {
	しょうかんされたら() {
		this.move(('▼ いどう', 'ひだりから'), 9);
		this.move(('▼ いどう', 'うえから'), 5);
	}
	プレイヤーがあるいたら(left, top, pLeft, pTop) {}
	とうちゃくしたら(left, top) {
		this.cmd(('▼ ブキ', 'エアーシューター'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
