import { loadFromRoot } from '../utility/index.mjs'

const configCliFileName = 'i18n.generator.config.mjs'

export const getConfigCli = import(loadFromRoot(configCliFileName))