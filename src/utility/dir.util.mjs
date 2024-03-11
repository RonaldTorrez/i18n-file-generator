import { promises as fs } from 'fs'
import * as path from 'path'
import { appConfig } from '../config/index.mjs'
import { consoleError } from './general.util.mjs'

export const pathFrom = (fromRoot = false, ...dir) => path.join(fromRoot ? process.cwd() : '', dir.join('/'))

export const readDir = async (path, returnFullPath = false) => {
	try {
		const files = await fs.readdir(path).then(data => data)
		return !returnFullPath ? files : files.map(file => pathFrom(false, path, file))
	} catch (error) {
		if (appConfig.printMessagesForDev) {
			consoleError('readDir()', path, error)
		}
	}
}

export const readFile = async (path) => {
	try {
		return await fs.readFile(path, 'utf8').then(data => data)
	} catch (error) {
		if (appConfig.printMessagesForDev) {
			consoleError('readFile()', path, error)
		}
	}
}

export const writeFile = async (path, data) => {
	try {
		await fs.writeFile(path, data, 'utf8')
	} catch (error) {
		if (appConfig.printMessagesForDev) {
			consoleError('writeFile()', path, error)
		}
	}
}

export const isFile = async (path) => {
	try {
		return await fs.stat(path).then(file => file.isFile())
	} catch (error) {
		if (appConfig.printMessagesForDev) {
			consoleError('isFile()', path, error)
		}
	}
}

export const isDirectory = async (path) => {
	try {
		return await fs.stat(path).then(file => file.isDirectory())
	} catch (error) {
		if (appConfig.printMessagesForDev) {
			consoleError('isDirectory()', path, error)
		}
	}
}

export const existPath = async (path) => {
	try {
		await fs.access(path)
		return true
	} catch (error) {
		if (appConfig.printMessagesForDev) {
			consoleError('existPath()', path, error)
		}
		return false
	}
}

export const extName = (file) => path.extname(file)