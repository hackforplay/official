const Skin = {};

// あとで mod 関数から名前を取得するための対応表
Object.defineProperty(Skin, '__name', {
	enumerable: false,
	value: new WeakMap()
});

export default Skin;
