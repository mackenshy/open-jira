export const validateMongoID = (mongoID: string) => {
	const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$')
	if (!mongoID) return false

	return checkMongoIDRegExp.test(mongoID)
}
