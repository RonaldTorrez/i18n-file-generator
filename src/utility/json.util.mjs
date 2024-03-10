import { extName, isDirectory, isFile, readDir, readFile } from './index.mjs'

export const jsonParse = (data) => JSON.parse(data)
export const jsonStringify = (data) => JSON.stringify(data, null, 2)

export const mergeDataFromPath = async (path, fromSubFolder = false) => {
	const files = await readDir(path, true)

	if (files && !files.length) {
		return
	}

	const data = []

	for (const file of files) {
		if (fromSubFolder && await isDirectory(file)) {
			const subData = await mergeDataFromPath(file, fromSubFolder)
			if (subData && subData.length > 0) {
				data.push(...subData)
			}
		}

		if (await isFile(file) && extName(file) === '.json') {
			const content = await readFile(file)
			data.push(jsonParse(content))
		}
	}

	return data
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