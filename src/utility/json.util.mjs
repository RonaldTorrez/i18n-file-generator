import { appConfig } from '../config/index.mjs'
import { consoleError, extName, isDirectory, isFile, isNull, readDir, readFile } from './index.mjs'

export const jsonParse = (data) => JSON.parse(data)
export const jsonStringify = (data) => JSON.stringify(data, null, 2)

export const mergeDataFromPath = async (path, fromSubFolder = false) => {
	const mergedData = []

	const mergeDataRecursively = async (path, fromSubFolder = false) => {
		try {
			const files = await readDir(path, true)

			if (!files || isNull(files)) {
				return
			}

			for (const file of files) {
				if (fromSubFolder && await isDirectory(file)) {
					await mergeDataRecursively(file, fromSubFolder)
				} else if ((
					           await isFile(file)
				           ) && extName(file) === '.json'
				) {
					const content = await readFile(file)
					mergedData.push(jsonParse(content))
				}
			}
		} catch (error) {
			if (appConfig.printMessagesForDev) {
				consoleError('mergeDataRecursively()', path, error)
			}
		}
	}

	await mergeDataRecursively(path, fromSubFolder)

	return mergedData
}

export const mergeObjs = (array) => {
	const mergedData = {}

	array.forEach(obj => {
		for (const key in obj) {
			if (mergedData.hasOwnProperty(key)) {
				mergedData[key] = mergeValues(mergedData[key], obj[key])
			} else {
				mergedData[key] = obj[key]
			}
		}
	})

	return mergedData
}
export const mergeValues = (actualObj, newObj) => {
	const mergedObj = {...actualObj}

	for (const key in newObj) {
		if (mergedObj.hasOwnProperty(key)) {
			if (typeof mergedObj[key] === 'object' && typeof newObj[key] === 'object') {
				mergedObj[key] = mergeValues(mergedObj[key], newObj[key])
			} else {
				mergedObj[key] = newObj[key]
			}
		} else {
			mergedObj[key] = newObj[key]
		}
	}

	return mergedObj
}

export const getDeepKeys = (obj) => {
	const languages = []

	const getKey = (obj) => {
		for (const key in obj) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				getKey(obj[key])
			} else if (!languages.includes(key)) {
				languages.push(key)
			}
		}
	}

	getKey(obj)

	return languages
}