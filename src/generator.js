'use strict'

const fs = require('fs').promises
const {configDefaultGenerator} = require('./config/i18n.generator.config.default')
const {loadFromRoot, loadFrom} = require('./utility/dir.util')
const {getLanguages} = require('./utility/lang.util')

const IMPORT_FROM_FOLDER = configDefaultGenerator.importFromFolder
const EXPORT_TO_FOLDER = configDefaultGenerator.exportToFolder
const path = require('path')

const dirname = (fielName) => path.join(__dirname, fielName)
// Lee el archivo lang.json
const jsonFile = dirname('lang.json')

// TODO : Generar archivos para JSON.util y luego crear funcion para cargar archivo json con validacion y otra funcion
// para jsonParse ya sea del objeto pasado o desde un archivo
async function jsonParse(file) {
	const fileContent = await fs.readFile(file, 'utf8')
	return JSON.parse(fileContent)
}

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