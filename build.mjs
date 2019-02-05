import packager from '@hackforplay/packager'
import fs from 'fs'
import path from 'path'
import * as envs from './env.mjs'

const dirs = process.argv.slice(2)
const ignore = '.DS_Store'

if (!process.env.CI) {
	Object.assign(process.env, envs) // 開発用
}

if (!process.env.__FEELES_COMMON_REGISTER__)
	throw new Error('process.env.__FEELES_COMMON_REGISTER__ is not set')
if (!process.env.__FEELES_COMMON_INDEX__)
	throw new Error('process.env.__FEELES_COMMON_INDEX__ is not set')

const env = packager.parseReplaceVars(
	'__FEELES_COMMON_REGISTER__,__FEELES_COMMON_INDEX__'
)

for (const dir of dirs) {
	build(dir)
}

function build(dir) {
	const pathes = packager.readEntireDirs([dir], ignore)
	const json = JSON.stringify(pathes.map(p => packager.composeFile(p, env)))
	fs.writeFileSync(path.resolve('./public', dir, 'index.json'), json, 'utf8')
}
