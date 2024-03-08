export const isText = (text) => {
	return typeof text === 'string' || text instanceof String
}

export const isObj = (obj) => {
	return typeof obj === 'object' &&
	       !Array.isArray(obj) &&
	       !isText(obj)
}

export const isArray = (arr) => {
	return Array.isArray(arr)
}

export const isNull = (value) => {
	if (isText(value) && value.trim() === '') {
		return true
	}

	if (isArray(value) && value.length === 0) {
		return true
	}

	return !!(
		isObj(value) && value !== null && Object.keys(value).length === 0
	)
}