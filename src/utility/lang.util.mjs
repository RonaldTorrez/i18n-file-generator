import { regISO2, regISO4, regISO47 } from '../models/index.mjs'
import { isArray, isNull, isObj, isText } from './index.mjs'

export const isLangAbbrValid = (lang) => {
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