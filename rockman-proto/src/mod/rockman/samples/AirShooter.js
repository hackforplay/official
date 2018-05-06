class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'エアーシューター'));
	}
	プレイヤーがあるいたら(left, top, pleft, ptop) {
		this.move(('▼ いどう', 'ひだりから'), pleft);
		this.move(('▼ いどう', 'うえから'), ptop);
		this.cmd(('▼ ブキ', 'エアーシューター'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
