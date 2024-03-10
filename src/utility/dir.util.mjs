import { promises as fs } from 'fs'
import * as path from 'path'
import { appConfig } from '../config/index.mjs'
import { consoleError } from './general.util.mjs'

export const pathFrom = (fromRoot = false, ...dir) => path.join(fromRoot ? process.cwd() : '', dir.join('/'))

export const readDir = async (path, returnFullPath = false) => {
	const {printMessagesForDev} = appConfig

	try {
		const files = await fs.readdir(path).then(data => data)
		return !returnFullPath ? files : files.map(file => pathFrom(false, path, file))
	} catch (error) {
		if (printMessagesForDev) {
			consoleError('readDir()', path, error)
		}
	}
}
export const readFile = async (path) => await fs.readFile(path, 'utf8').then(data => data)
export const writeFile = async (path, data) => await fs.writeFile(path, data, 'utf8')
export const getFilesFromPath = async (path) => {
	const files = await readDir(path)
	return files.map(file => pathFrom(true, path, file))
}

export const isFile = async (path) => await fs.stat(path).then(file => file.isFile())
export const isDirectory = async (path) => await fs.stat(path).then(file => file.isDirectory())
export const existPath = async (path) => await fs.access(path)

export const extName = (file) => path.extname(file)