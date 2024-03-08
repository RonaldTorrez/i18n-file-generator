import { getConfigCli } from './index.mjs'

const CONFIG_CLI = await getConfigCli.then(config => config.default)

const GENERATOR = 'generator' in CONFIG_CLI
const PRINT_MESSAGES = 'printMessages' in CONFIG_CLI

export const configDefaultGenerator = {
	// GENERATOR CONFIG
	importFromFolder: GENERATOR ? CONFIG_CLI.generator.importFromFolder ?? '/messages/i18n' : '/messages/i18n',
	exportToFolder: GENERATOR ? CONFIG_CLI.generator.exportToFolder ?? '/messages' : '/messages',
	useStrictLangAbbr: GENERATOR ? CONFIG_CLI.generator.useStrictLangAbbr ?? true : true,

	// PRINT MASSAGES CONFIG
	printMessagesSuccess: PRINT_MESSAGES ? CONFIG_CLI.printMessages.printSuccess ?? false : false,
	printMessagesError: PRINT_MESSAGES ? CONFIG_CLI.printMessages.printError ?? false : false
}