import { promises as fs } from 'fs'

export const jsonFromFile = async (fileName) =>
	await fs.readFile(fileName, 'utf8')

export const jsonParse = (obj) => JSON.parse(obj)