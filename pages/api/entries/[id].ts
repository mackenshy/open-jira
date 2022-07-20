import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { db } from '../../../database'
import { Entry } from '../../../models'
import { IEntry } from '../../../models/Entry'

type Data = { message: string } | IEntry

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { id } = req.query

	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).json({ message: 'Invalid ID' })
	}

	switch (req.method) {
		case 'GET':
			return getEntry(req, res)

		case 'PUT':
			return updateEntry(req, res)

		default:
			return res.status(400).json({ message: 'Endpoint not found' })
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	await db.connect()

	const { id } = req.query

	const entryToUpdate = await Entry.findById(id)

	if (!entryToUpdate) {
		await db.disconnect()
		return res.status(404).json({ message: 'Entry not found' })
	}

	const {
		description = entryToUpdate.description,
		status = entryToUpdate.status,
	} = req.body

	try {
		const updatedEntry = await Entry.findByIdAndUpdate(
			id,
			{
				description,
				status,
			},
			{ runValidators: true, new: true }
		)

		return res.status(200).json(updatedEntry!)
	} catch (error) {
		console.log(error)
		await db.disconnect()
		return res.status(400).json({ message: 'Bad Request' })
	}
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.query

	await db.connect()
	const entry = await Entry.findById(id)
	await db.disconnect()

	if (!entry) {
		return res.status(404).json({ message: 'Entry not found' })
	}

	return res.status(200).json(entry)
}
