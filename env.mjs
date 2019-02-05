// 本番環境と同じにする（インターネットアクセスが必要）
export const __FEELES_COMMON_INDEX__ = 'https://unpkg.com/@hackforplay/common@^0.10' // hack-rpg, make-rpg
export const __FEELES_COMMON_REGISTER__ = 'https://unpkg.com/@hackforplay/common@^0.13/dist/register.js' // make-rpg-2

// localhost の common を取得
// export const __FEELES_COMMON_REGISTER__ = 'http://localhost:8080/register.js' // hack-rpg, make-rpg
// export const __FEELES_COMMON_INDEX__ = 'http://localhost:8080/main.js' // make-rpg-2

// マップ選択用の設定ファイル（インターネットアクセスが必要）
export const __FEELES_MAP_TEMPLATE__ = 'https://www.hackforplay.xyz/api/templateMaps' // make-rpg-2
