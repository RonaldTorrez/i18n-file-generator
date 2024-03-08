import { promises as fs } from 'fs'

const jsonFromFile = async (fileName) =>
	await fs.readFile(fileName, 'utf8')

const jsonParse = (obj) => JSON.parse(obj)

module.exports = {
	jsonFromFile,
	jsonParse
}