let _x = 5,
	_y = 5;
class MyRockman extends Rockman {
	しょうかんされたら() {
		Hack.log('こんにちは！');
	}
	プレイヤーがあるいたら(x, y) {
		this.locate(_x, _y);
		_x = x;
		_y = y;
	}
}

// ロックマンをしょうかん！
summonRockman(MyRockman);
