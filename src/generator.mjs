import { promises as fs } from 'fs'
import { configDefault } from './config/index.mjs'
import {
	consoleError,
	getDeepKeys,
	isArray,
	isNull,
	isObj,
	jsonStringify,
	mergeDataFromPath,
	mergeObjs,
	pathFrom
} from './utility/index.mjs'

const mergedData = await mergeDataFromPath(
	pathFrom(true, configDefault.importFromFolder),
	configDefault.importFromSubFolder
)
const data = mergeObjs(mergedData)

async function saveLanguageFile(language, obj) {
	const langDataFiltered = await filterLanguage(obj, language)
	const fileName = `${language}.json`
	const saveTo = pathFrom(true, configDefault.exportToFolder, fileName)
	await fs.writeFile(saveTo, jsonStringify(langDataFiltered))
	console.log('🚀 ~ Generated:', fileName)
}

function filterLanguage(obj, language) {
	const result = {}
	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			const filtered = filterLanguage(obj[key], language)
			if (Object.keys(filtered).length > 0) {
				result[key] = filtered
			}
		} else if (key === language) {
			return obj[key]
		}
	}
	return result
}

async function generateFiles(data) {
	if (isObj(data) || isArray(data)) {
		configDefault.printMessagesError && consoleError('Data base is not an object', data)
		return
	}
	if (isNull()) {
		configDefault.printMessagesError && consoleError('Data base is empty', data)
		return
	}

	const languages = getDeepKeys(data)
	for (const language of languages) {
		await saveLanguageFile(language, obj)
	}
}

generateFiles(data).then(r => console.log(r))