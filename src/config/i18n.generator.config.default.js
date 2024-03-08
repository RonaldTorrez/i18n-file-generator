const {loadFromRoot} = require('../utility/dir.util')
const {configFileName} = require('./app.config')

const config = require(loadFromRoot(configFileName))

const GENERATOR = 'generator' in config
const PRINT_MESSAGES = 'printMessages' in config

const configDefaultGenerator = {
	// GENERATOR CONFIG
	importFromFolder: GENERATOR ? config.generator.importFromFolder ?? '/messages/i18n' : '/messages/i18n',
	exportToFolder: GENERATOR ? config.generator.exportToFolder ?? '/messages' : '/messages',
	useStrictLangAbbr: GENERATOR ? config.generator.useStrictLangAbbr ?? true : true,
	// PRINT MASSAGES CONFIG
	printMessagesSuccess: PRINT_MESSAGES ? config.printMessages.printSuccess ?? false : false,
	printMessagesError: PRINT_MESSAGES ? config.printMessages.printError ?? false : false
}

module.exports = {configDefaultGenerator}