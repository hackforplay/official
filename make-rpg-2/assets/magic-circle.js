import '../game';

rule.this = 'まほうじん';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.マホウジン)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	this.mod(('▼ スキン', Skin.マホウジン2)); // 見た目をかえる
	item.スキル = 'ビーム'; // プレイヤーがビームを打てるようにする
	/*+ ふまれたとき */
});
