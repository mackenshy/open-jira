interface SeedData {
	entries: SeedEntry[]
}

interface SeedEntry {
	description: string
	status: string
	createdAt: number
}

export const seedData: SeedData = {
	entries: [
		{
			description: 'Pendiente: Lorem ipsum',
			status: 'pending',
			createdAt: Date.now(),
		},
		{
			description: 'In Progress: Adava Kedabra',
			status: 'in-progress',
			createdAt: Date.now() - 10000,
		},
		{
			description: 'In Progress: Alojomora',
			status: 'in-progress',
			createdAt: Date.now() - 1000000,
		},
		{
			description: 'Finished: Pepepepepepe',
			status: 'finished',
			createdAt: Date.now() - 100000,
		},
	],
}
