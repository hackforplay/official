import '../game';

rule.this = 'まほうじん';

rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.まほうじん_オフ)); // 見た目をかえる
	/*+ つくられたとき */
});

rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	this.mod(('▼ スキン', Skin.まほうじん_オン)); // 見た目をかえる
	item.スキル = 'ビーム'; // プレイヤーがビームを打てるようにする
	/*+ ふまれたとき */
});
