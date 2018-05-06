class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'アトミックファイヤー'));
		this.cmd(('▼ ブキ', 'アトミックファイヤー'));
		this.cmd(('▼ ブキ', 'アトミックファイヤー'));
	}
	プレイヤーがあるいたら(left, top, pleft, ptop) {
		this.move(('▼ いどう', 'ひだりから'), pleft);
		this.move(('▼ いどう', 'うえから'), ptop);
		this.cmd(('▼ ブキ', 'アトミックファイヤー'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
