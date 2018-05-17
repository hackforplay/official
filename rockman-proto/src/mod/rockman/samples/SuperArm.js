class MyRockman extends Rockman {
	しょうかんされたら() {
		this.move(('▼ いどう', 'ひだりから'), 6);
		this.move(('▼ いどう', 'うえから'), 3);
		this.cmd(('▼ ブキ', 'スーパーアーム'));
	}
	プレイヤーがあるいたら(x, y) {
		this.move(('▼ いどう', 'したへ'), 3);
		this.move(('▼ いどう', 'みぎへ'), 5);
		this.cmd(('▼ ブキ', 'スーパーアーム'));
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
