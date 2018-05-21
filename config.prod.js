module.exports = {
	// ビルド対象のソースコードが入ったディレクトリ
	source: ['./hack-rpg', './make-rpg'],
	// Dev server の port
	port: 3000,
	// オフラインで開発したい場合 true にする
	// node_modules のファイルを直接参照するので,
	// 本番では false にする
	offline: false
};
