import 'https://unpkg.com/@hackforplay/common@0.10.1/dist/register';

// ここからゲームがはじまったときのルール
rule.ゲームがはじまったとき(async function() {
	Hack.changeMap('map1'); // map1 をロード
	
	const player = rule.つくる('プレイヤー');
	window.player = player;
	player.locate(3, 5); // いる ばしょ
	
	
	/*+ キャラクター アイテム */
});
// ここまでゲームがはじまったときのルール

// ここからプレイヤーのルール
rule.this = 'プレイヤー';
rule.つくられたとき(async function() {
	Player.set(this);
	this.mod(('▼ スキン', Skin.ナイト));
	this.family = ('▼ ファミリー', Family.プレイヤー);
	this.hp = 3; // 体力
	this.atk = 1; // こうげき力
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
rule.たおされたとき(async function () {
	Hack.gameover(); // ゲームオーバー
	this.destroy(); // プレイヤーを消す
});
/*+ ルールついか */
// ここまでプレイヤーのルール

// ここからスライムのルール
rule.this = 'スライム';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(function() {
	this.mod(('▼ スキン', Skin.スライム));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 3;
	this.atk = 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここからキャラクターがつくられたとき行うルール
// ここからキャラクターがつねに行うルール
rule.つねに(async function() {
	await this.attack();
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがつねに行うルール
// ここからキャラクターがたおされたときのルール
rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがたおされたときのルール
/*+ ルールついか */

// ここまでスライムのルール

// ここからゴールちてんのルール
rule.this = 'ゴールちてん';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(function() {
	this.mod(('▼ スキン', Skin.キャッスル));
	Hack.log('おしろがみえるだろう あれがゴールだ'); // ヒントをだす
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがつくられたとき行うルール
// ここからキャラクターがふまれたときのルール
rule.item = 'プレイヤー'; // ふむキャラクター
rule.ふまれたとき(async function(item) {
	Hack.gameclear(); // ゲームクリア
	item.destroy(); // ふんだキャラクターをけす
	Hack.log('ゲームクリアです。おめでとう！'); // メッセージを出す
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがふまれたときのルール
/*+ ルールついか */

// ここまでゴールちてんのルール

// ここからイモムシのルール
rule.this = 'イモムシ';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.イモムシ));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 2;
	this.atk = 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがつくられたとき行うルール
// ここからキャラクターがつねに行うルール
rule.つねに(async function() {
	await this.walk(); // あるく
	await this.turn(1); // ターンする
	/*+ このキャラクターになにかする 条件 */
});
// ここまでキャラクターがつねに行うルール
// ここからキャラクターがたおされたときのルール
rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがたおされたときのルール
/*+ ルールついか */

// ここまでイモムシのルール

// ここからコウモリ
rule.this = 'コウモリ';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.コウモリ));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 3;
	this.atk = 1;
});
// ここまでキャラクターがつくられたとき行うルール
// ここからキャラクターがつねに行うルール
rule.つねに(async function() {
	const moveX = 32 * Math.sign(player.mapX - this.mapX);
	const moveY = 32 * Math.sign(player.mapY - this.mapY);
	this.forward = [moveX, moveY];
	await this.walk(); // あるく
	await this.attack(); // こうげきする
	await this.wait(1); // やすむ
	/*+ このキャラクターになにかする 条件 */
});
// ここまでキャラクターがつねに行うルール
// ここからキャラクターがたおされたときのルール
rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがたおされたときのルール
/*+ ルールついか */

// ここまでコウモリ

// ここからウロボロス
rule.this = 'ウロボロス';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ウロボロス));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 10;
	this.atk = 1;
});
// ここからキャラクターがつねに行うルール
rule.つねに(async function() {
	await this.wait(4); // 少しやすむ
	await this.attack(); // こうげきする
	/*+ このキャラクターになにかする 条件 */
});
// ここまでキャラクターがつねに行うルール
// ここからキャラクターがたおされたときのルール
rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがたおされたときのルール
/*+ ルールついか */

// ここまでウロボロス

// ここからドラゴン
rule.this = 'ドラゴン';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ドラゴン));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 10;
	this.atk = 1;
	this.scale(2); // 大きさ
	this.breath({
		skin: ('▼ スキン', Skin.バクエン),
		speed: 5,
		scale: 1
	});
});
// ここからキャラクターがたおされたときのルール
rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがたおされたときのルール
/*+ ルールついか */

// ここまでドラゴン

// ここからミノタウルス
rule.this = 'ミノタウルス';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ミノタウルス));
	this.family = ('▼ ファミリー', Family.ドクリツ);
	this.hp = 10;
	this.atk = 1;
	this.scale(2, 2);
});
// ここからキャラクターがつねに行うルール
rule.つねに(async function() {
	await this.attack(); // こうげきする
	/*+ このキャラクターになにかする 条件 */
});
// ここまでキャラクターがつねに行うルール
// ここからキャラクターがたおされたときのルール
rule.たおされたとき(async function() {
	Hack.score += 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがたおされたときのルール
/*+ ルールついか */

// ここまでミノタウルス

// ここからハート
rule.this = 'ハート';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.ハート));
});
// ここからキャラクターがふまれたときのルール
rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	item.hp += 1;
	this.destroy();
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがふまれたときのルール
/*+ ルールついか */

// ここまでハート

// ここからコイン
rule.this = 'コイン';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.コイン));
	this.velocity(1, 0);
	this.force(0, 0.5);
});
// ここからキャラクターがぶつかったときのルール
rule.item = 'プレイヤー';
rule.ぶつかったとき(async function(item) {
	this.destroy();
	Hack.score += 1;
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがぶつかったときのルール
/*+ ルールついか */

// ここまでコイン

// ここからスター
rule.this = 'スター';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.スター));
});
// ここまでキャラクターがつくられたとき行うルール
// ここからキャラクターがふまれたときのルール
rule.item = 'プレイヤー';
rule.ふまれたとき(async function(item) {
	item.damageTime = 100;
	this.destroy();
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがふまれたときのルール
/*+ ルールついか */

// ここまでスター

// ここからふしぎなカギ
rule.this = 'ふしぎなカギ';

// ここからキャラクターがつくられたとき行うルール
rule.つくられたとき(async function() {
	this.mod(('▼ スキン', Skin.キー));
	this.locate(random(0, 15), random(0, 10), 'map1');
});
// ここまでキャラクターがつくられたとき行うルール
// ここからキャラクターがふまれたときのルール
rule.item = 'プレイヤー';
rule.ふまれたとき(async function() {
	Hack.log('カチャリ という おと が きこえた');
	this.destroy();
	/*+ このキャラクターになにかする ゲーム全体になにかする 条件 */
});
// ここまでキャラクターがふまれたときのルール
/*+ ルールついか */

// ここまでふしぎなカギ
