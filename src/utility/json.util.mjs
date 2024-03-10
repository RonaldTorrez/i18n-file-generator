import { extName, isDirectory, isFile, pathFrom, readDir, readFile } from './index.mjs'

export const jsonParse = (data) => JSON.parse(data)
export const jsonStringify = (data) => JSON.stringify(data, null, 2)

export const mergeJson = async (path, subFolder = false) => {
	const readdir = await readDir(path)

	if (!readdir.length) {
		return
	}

	const data = []

	for (const file of readdir) {
		const filePath = pathFrom(false, path, file)

		if (subFolder && await isDirectory(filePath)) {
			const subData = await mergeJson(filePath, subFolder)
			if (subData && subData.length > 0) {
				data.push(...subData)
			}
		}

		if (await isFile(filePath) && extName(filePath) === '.json') {
			const content = await readFile(filePath)
			data.push(jsonParse(content))
		}
	}

	return data
}