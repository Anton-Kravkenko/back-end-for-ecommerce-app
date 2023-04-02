import { hash,verify } from 'argon2'
import { prisma } from '../prisma.js'
import asyncHandler from 'express-async-handler'
import { generateToken } from './generate.token.js'


export const login = asyncHandler(async (req, res) => {
	const {email, password} = req.body
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})
	const isValidPassword = await verify(user.password, password)
	if (user && isValidPassword) {
		const token = await generateToken(user.id)
		res.json({user, token:token})
	} else {
		res.status(401)
		throw new Error('Email and password incorrect')
	}
})


export const registerUser = asyncHandler(async (req, res) => {
const {email, password} = req.body
	const isHaveUser = await prisma.user.findUnique({
		where: {
			email
		}
	})
	
	if (isHaveUser) {
		res.status(400)
		throw new Error('User exist')
	}
	const user = await prisma.user.create({
		data: {
			email, password: await hash(password), name: email.split('@')[0]
		}
	})
	const token = generateToken(user.id)
	
	
	await res.json({
		user, token: token
	})
})
