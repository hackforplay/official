class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'ハイパーボム'));
	}
	プレイヤーがあるいたら(left, top, pleft, ptop) {
		this.move(('▼ いどう', 'ひだりから'), pleft);
		this.move(('▼ いどう', 'うえから'), ptop);
		this.cmd(('▼ ブキ', 'ハイパーボム'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
