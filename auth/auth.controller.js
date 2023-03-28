import { prisma } from '../prisma.js'


export const login = async (req, res) => {
	const user = await prisma.user.findMany()
await res.json(user);
}
