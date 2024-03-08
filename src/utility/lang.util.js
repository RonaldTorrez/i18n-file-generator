const {
	regISO2,
	regISO4,
	regISO47
} = require('../models/regex.model')
const {isText, isObj, isArray, isNull} = require('./general.util')
const {getDeepObjectKey} = require('./getDeepObjectKey.util')

const isLangAbbrValid = (lang) => {

	if (
		isNull(lang) ||
		!isText(lang) ||
		isObj(lang) ||
		isArray(lang)
	) {
		return false
	}

	return regISO2.test(lang) ||
	       regISO4.test(lang) ||
	       regISO47.test(lang)

}

const getLanguages = (obj) => {
	return getDeepObjectKey(obj)
}

module.exports = {
	isLangAbbrValid,
	getLanguages
}