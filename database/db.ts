import mongoose from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 * 99 = unitialized
 */
const mongoConnection = {
	isConnected: mongoose.ConnectionStates.disconnected,
}

export const connect = async () => {
	if (mongoConnection.isConnected) {
		console.log('Already DB connected')
		return
	}

	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState

		if (mongoConnection.isConnected === mongoose.ConnectionStates.connected) {
			console.log('Using current connection')
			return
		}

		await mongoose.disconnect()
	}

	await mongoose.connect(process.env.MONGO_URL || '')
	mongoConnection.isConnected = mongoose.ConnectionStates.connected
	console.log('Connect to DB: ', process.env.MONGO_URL)
}

export const disconnect = async () => {
	if (process.env.NODE_ENV === 'development') return

	if (mongoConnection.isConnected === mongoose.ConnectionStates.disconnected)
		return

	await mongoose.disconnect()
	mongoConnection.isConnected = mongoose.ConnectionStates.disconnected
	console.log('Disconnect from DB')
}
