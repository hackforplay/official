class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'アトミックファイヤー'));
		this.cmd(('▼ ブキ', 'アトミックファイヤー'));
		this.cmd(('▼ ブキ', 'アトミックファイヤー'));
	}
	プレイヤーがあるいたら(x, y) {
		this.move(('▼ いどう', 'みぎへ'), x);
		this.move(('▼ いどう', 'したへ'), y);
		this.cmd(('▼ ブキ', 'アトミックファイヤー'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
