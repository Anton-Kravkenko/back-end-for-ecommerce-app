import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

export const getUserProfile = asyncHandler(async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		}, include: {
			cart: true,
			favorites: true
		}
	})
	res.json(user)
})

export const getAllUser = asyncHandler(async (req, res, next) => {
	const user = await prisma.user.findMany({
		include: {
			cart: true,
			favorites: true
		}
	})
	res.json(user)
})
// May be not work, so try to add incude or play with select
export const getProfileFavorite = asyncHandler(async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		}, select: {
			favorites: true
		}
	})
	res.json(user)
})

export const getProfileCart = asyncHandler(async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		}, select: {
			cart: true
		}
	})
	res.json(user)
})


