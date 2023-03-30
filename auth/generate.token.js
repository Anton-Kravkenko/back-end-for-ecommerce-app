import jwt from 'jsonwebtoken'

export const generateToken = userId =>
	jwt.sign(
		{
			userId
		},
		process.env.ACESS_TOKEN,
		{
			expiresIn: '10d'
		}
	)
