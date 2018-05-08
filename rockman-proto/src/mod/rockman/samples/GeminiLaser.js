class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'ジェミニレーザー'));
	}
	プレイヤーがあるいたら(left, top, pleft, ptop) {
		this.move(('▼ いどう', 'ひだりから'), pleft);
		this.move(('▼ いどう', 'うえから'), ptop);
		this.cmd(('▼ ブキ', 'ジェミニレーザー'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
