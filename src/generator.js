'use strict'

// const fs = require('fs').promises
import { promises as fs } from 'fs'

const {configDefaultGenerator} = require('./config/i18n.generator.config.default')
const {loadFromRoot, loadFrom} = require('./utility/dir.util')
const {getLanguages} = require('./utility/lang.util')
const {jsonParse} = require('./utility/json.util')

const IMPORT_FROM_FOLDER = configDefaultGenerator.importFromFolder
const EXPORT_TO_FOLDER = configDefaultGenerator.exportToFolder
const path = require('path')

const dirname = (fielName) => path.join(__dirname, fielName)

// TODO : Create function to read files bases to generate languages
// Read files bases from generator.importFromFolder config
const jsonFile = dirname('lang.json')


async function saveLanguageFile(language, obj) {
	const langDataFiltered = await filterLanguage(obj, language)
	const fileName = `${language}.json`
	const saveTo = `${__dirname}/../${fileName}`
	await fs.promises.writeFile(saveTo, JSON.stringify(langDataFiltered, null, 2))
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

async function generateFiles(obj) {
	const languages = await getLanguages(obj)
	for (const language of languages) {
		await saveLanguageFile(language, obj)
	}
}

generateFiles(jsonParse(jsonFile))
	.then(r => console.log(r))