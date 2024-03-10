export const isText = (text) => {
	return typeof text === 'string' || text instanceof String
}

export const isObj = (obj) => {
	return typeof obj === 'object' && !Array.isArray(obj) && !isText(obj)
}

export const isArray = (arr) => {
	return Array.isArray(arr)
}

export const isNull = (value) => {
	if (value === undefined || value === null) {
		return true
	}

	if (isText(value) && value.trim() === '') {
		return true
	}

	if (isArray(value) && value.length === 0) {
		return true
	}

	return !!(
		isObj(value) && true && Object.keys(value).length === 0
	)
}

export const consoleError = (...error) => {
	console.error('🚨 error:', error.join(' || '))
}

export const consoleSuccess = (...success) => {
	console.log('✅ success:', success.join(' || '))
}