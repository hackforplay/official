class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'エアーシューター'));
	}
	プレイヤーがあるいたら(x, y) {
		this.move(('▼ いどう', 'みぎへ'), x);
		this.move(('▼ いどう', 'したへ'), y);
		this.cmd(('▼ ブキ', 'エアーシューター'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
