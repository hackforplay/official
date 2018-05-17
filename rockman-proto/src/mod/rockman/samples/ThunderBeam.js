class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'サンダービーム'));
	}
	プレイヤーがあるいたら(x, y) {
		this.move(('▼ いどう', 'みぎへ'), x);
		this.move(('▼ いどう', 'したへ'), y);
		this.cmd(('▼ ブキ', 'サンダービーム'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
