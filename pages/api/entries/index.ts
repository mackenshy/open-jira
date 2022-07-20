import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry } from '../../../models'
import { IEntry } from '../../../models/Entry'

type Data = { message: string } | IEntry[]

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getEntries(res)

		default:
			return res.status(400).json({ message: 'Endpoint notd found' })
	}
}

const getEntries = async (res: NextApiResponse<Data>) => {
	await db.connect()
	const entries = await Entry.find().sort({ createdAt: 'descending' })
	await db.disconnect()
	return res.status(200).json(entries)
}
