import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

export const getAllProduct = asyncHandler(async (req, res, next) => {
	const products = await prisma.product.findMany({
		include: {
			reviews: true
		}
	})
	if (products) {
		res.json(products)
	} else {
		res.status(400)
		throw new Error('Not found products')
	}
})

export const getbyId = asyncHandler(async (req, res, next) => {
	const product = await prisma.product.findUnique({
		where: {
			id: +req.params.id
		}, include: {
			reviews: true
		}
	})
	if (product) {
		res.json(product)
	} else {
		res.status(400)
		throw new Error('Not found product')
	}
})

export const addProduct = asyncHandler(async (req, res, next) => {
	const { Name, Picture, Price, Description, Category } = req.body
	console.log(Name, Picture, Price, Description, Category)
	if (Name, Picture, Price, Description, Category) {
		
		const product = await prisma.product.create({
			data: {
				Name,
				Picture,
				Price,
				Description,
				Category
			}
		})
		res.json(product)
	} else {
		res.status(400)
		throw new Error('Not currect data')
	}
})

export const removeProduct = asyncHandler(async (req, res, next) => {
	
	const deleteProduct = await prisma.product.delete({
		where: {
			id: +req.params.id
		}
	}).catch(() => {
		res.status(400)
		throw new Error('Already delete or not found')
	})
	if (deleteProduct) {
		res.json({
			message: 'delete complete!'
		})
	} else {
		res.status(400)
		throw new Error('Already delete or not found')
	}
})

export const addProductRewiew = asyncHandler(async (req, res, next) => {
	const { message, rating } = req.body
	const addProductRewiew = await prisma.review.create({
		data: {
			message, rating, productId: +req.params.id
		}
	})
	if (addProductRewiew) {
		res.json(addProductRewiew)
	} else {
		res.status(400)
		throw new Error('Already delete or not found')
	}
})

export const searchByTitle = asyncHandler(async (req, res, next) => {
	const searchByTitles = await prisma.product.findMany({
		where: {
			Name: {
				contains: req.params.title
			}
		}
	})
	if (searchByTitles) {
		res.json(searchByTitles)
	} else {
		res.status(400)
		throw new Error('Already delete or not found')
	}
})


export const searchByCategory = asyncHandler(async (req, res, next) => {
	const searchByCategorys = await prisma.product.findMany({
		where: {
			Category: {
				has: req.params.term
			}
		}
	})
	if (searchByCategorys) {
		res.json(searchByCategorys)
	} else {
		res.status(400)
		throw new Error('Already delete or not found')
	}
})



