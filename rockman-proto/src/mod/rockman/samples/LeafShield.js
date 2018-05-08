class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'リーフシールド'));
	}
	プレイヤーがあるいたら(left, top, pleft, ptop) {
		this.move(('▼ いどう', 'ひだりから'), left);
		this.move(('▼ いどう', 'うえから'), top);
		this.cmd(('▼ ブキ', 'リーフシールド'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
