import { promises as fs } from 'fs'
import * as path from 'path'

export const loadFromRoot = (...args) => path.join(process.cwd(), args.join('/'))
export const loadFrom = (...args) => path.join(args.join('/'))

export const readDir = async (path) => await fs.readdir(path).then(data => data)
export const readFile = async (path) => await fs.readFile(path, 'utf8').then(data => data)
export const isFile = async (path) => await fs.stat(path).then(file => file.isFile())
export const isDirectory = async (path) => await fs.stat(path).then(file => file.isDirectory())
export const extName = (file) => path.extname(file)