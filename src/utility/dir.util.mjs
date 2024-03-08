import * as path from 'path'

export const loadFromRoot = (...args) => path.join(process.cwd(), args.join('/'))
export const loadFrom = (...args) => path.join(args.join('/'))