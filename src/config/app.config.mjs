import { pathFrom } from '../utility/index.mjs'

const configCliFileName = 'i18n.generator.config.mjs'

export const readConfigCli = import(pathFrom(true, configCliFileName))
export const appConfig = {
	printMessagesForDev: true
}