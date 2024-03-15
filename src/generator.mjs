import { promises as fs } from 'fs'
import { appConfig, configDefault } from './config/index.mjs'
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
	const langDataFiltered = filterByLang(obj, language)
	const fileName = `${language}.json`
	const saveTo = pathFrom(true, configDefault.exportToFolder, fileName)
	await fs.writeFile(saveTo, jsonStringify(langDataFiltered))
	console.log('🚀 ~ Generated:', fileName)
}

// TODO continue optimization of this function
function filterByLang(data, lang) {
	const result = {}

	const filterByLangRecursively = (data, lang) => {
		for (const key in data) {
			if (isObj(data[key])) {
				const filtered = filterByLangRecursively(data[key], lang)
				if (Object.keys(filtered).length > 0) {
					result[key] = filtered
				}
			} else if (key === lang) {
				return data[key]
			}
		}
	}

	filterByLangRecursively(data, lang)

	return result
}

async function generateFiles(data) {
	if (!isObj(data) || isArray(data)) {
		appConfig.printMessagesForDev && consoleError('Data base is not an object', 'generateFiles()', data)
		consoleError('Data base is not an object', data)
		return
	}
	if (isNull(data)) {
		appConfig.printMessagesForDev && consoleError('Data base is empty', 'generateFiles()', data)
		consoleError('Data base is empty', data)
		return
	}

	const languages = getDeepKeys(data)
	for (const language of languages) {
		await saveLanguageFile(language, data)
	}
}

generateFiles(data).then(r => console.log(r))