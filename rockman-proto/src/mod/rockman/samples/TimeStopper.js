class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'タイムストッパー'));
	}
	プレイヤーがあるいたら(left, top, pleft, ptop) {
		this.move(('▼ いどう', 'みぎへ'), 1);
		this.cmd(('▼ ブキ', 'タイムストッパー'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
