//  LANGUAGES ABBREVIATIONS VALIDATION
const regISO2 = /^[a-zA-Z]{2}$/ // es, en, fr, de
const regISO4 = /^[a-z]{2}[A-Z]{2}$/ // esES, enUS, frFR, deDE
const regISO47 = /^[a-z]{2}[-_][A-Z]{2}$/ // es-ES, en_US, fr-FR, de_DE

module.exports = {
	regISO2,
	regISO4,
	regISO47
}