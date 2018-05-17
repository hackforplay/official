class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'ジェミニレーザー'));
	}
	プレイヤーがあるいたら(x, y) {
		this.move(('▼ いどう', 'みぎへ'), x);
		this.move(('▼ いどう', 'したへ'), y);
		this.cmd(('▼ ブキ', 'ジェミニレーザー'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
