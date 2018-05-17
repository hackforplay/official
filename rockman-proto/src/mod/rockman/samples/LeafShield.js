class MyRockman extends Rockman {
	しょうかんされたら() {
		this.cmd(('▼ ブキ', 'リーフシールド'));
	}
	プレイヤーがあるいたら(x, y) {
		this.move(('▼ いどう', 'みぎへ'), x);
		this.move(('▼ いどう', 'したへ'), y);
		this.cmd(('▼ ブキ', 'リーフシールド'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
