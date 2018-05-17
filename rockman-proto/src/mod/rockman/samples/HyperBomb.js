class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'ハイパーボム'));
	}
	プレイヤーがあるいたら(x, y) {
		this.move(('▼ いどう', 'みぎへ'), x);
		this.move(('▼ いどう', 'したへ'), y);
		this.cmd(('▼ ブキ', 'ハイパーボム'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
