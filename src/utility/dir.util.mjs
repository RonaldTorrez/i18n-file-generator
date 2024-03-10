import { promises as fs } from 'fs'
import * as path from 'path'

export const pathFrom = (fromRoot = false, ...dir) => path.join(fromRoot ? process.cwd() : '', dir.join('/'))

export const readDir = async (path) => await fs.readdir(path).then(data => data)
export const readFile = async (path) => await fs.readFile(path, 'utf8').then(data => data)
export const writeFile = async (path, data) => await fs.writeFile(path, data, 'utf8')

export const isFile = async (path) => await fs.stat(path).then(file => file.isFile())
export const isDirectory = async (path) => await fs.stat(path).then(file => file.isDirectory())
export const existPath = async (path) => await fs.access(path)

export const extName = (file) => path.extname(file)