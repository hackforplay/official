class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'サンダービーム'));
	}
	プレイヤーがあるいたら(left, top, pleft, ptop) {
		this.move(('▼ いどう', 'ひだりから'), pleft);
		this.move(('▼ いどう', 'うえから'), ptop);
		this.cmd(('▼ ブキ', 'サンダービーム'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
