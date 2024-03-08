export const getDeepObjectKey = async (obj) => {
	const languages = []

	for (const key in obj) {
		if (typeof obj[key] === 'object' && obj[key] !== null) {
			await getDeepObjectKey(obj[key])
		}

		if (!languages.includes(key)) {
			languages.push(key)
		}
	}

	return languages
}