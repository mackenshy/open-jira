import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
	message: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (process.env.NODE_ENV === 'production') {
		return res
			.status(400)
			.json({ message: 'You can not access to this endpoint on Production' })
	}

	if (req.method !== 'POST') {
		return res.status(400).json({ message: 'Invalid request' })
	}

	await db.connect()
	await Entry.deleteMany()
	await Entry.insertMany(seedData.entries)
	await db.disconnect()

	return res.status(400).json({ message: 'Success' })
}
