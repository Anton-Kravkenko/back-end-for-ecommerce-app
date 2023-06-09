import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

export const getAllProduct = asyncHandler(async (req, res, next) => {
	const products = await prisma.product.findMany({
		include: {
			reviews: true,
			category: true
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
				include: {
					category: true
				},
			data: {
				Name,
				Picture,
				Price,
				Description,
				category: {
					create: Category
				}
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
		throw new Error('not found')
	}
})
export const searchByCategorybySlug = asyncHandler(async (req, res, next) => {
	const searchByTitles = await prisma.product.findMany({
		include: {
			category: true
		},
		where: {
			category: {
				some: {
					slug: req.params.slug
				}
			}
		}
	})
	if (searchByTitles) {
		res.json(searchByTitles)
	} else {
		res.status(400)
		throw new Error('not found')
	}
})

export const searchByCategoryById = asyncHandler(async (req, res, next) => {
	const searchByTitles = await prisma.product.findMany({
		include: {
			category: true
		},
		where: {
	category: {
		some: {
			id: +req.params.id
		}
	}
		}
	})
	if (searchByTitles) {
		res.json(searchByTitles)
	} else {
		res.status(400)
		throw new Error('not found')
	}
})

export const toggleCart = asyncHandler(async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: { id: req.user.id }
	})
	const isProductAvailable = await prisma.product.findUnique({
		where: {
			id: +req.params.id
		}
	})
	if (!user.cart.includes(+req.params.id) && isProductAvailable) {
		const res2 = await prisma.user.update({
			where: { id: req.user.id },
			data: {
				cart: {
					push: +req.params.id
				}
			}
		})
		res.json(res2)
	} else {
		if (!isProductAvailable) {
			res.status(400)
			throw new Error('Not found product')
		}
		const res3 = await prisma.user.update({
			where: { id: req.user.id },
			data: {
				cart: { set: user.cart.filter((item) => item !== +req.params.id) }
				
			}
		})
		res.json(res3)
	}
	
})


export const toggleFavorite = asyncHandler(async (req, res, next) => {
	const user = await prisma.user.findUnique({
		where: { id: req.user.id }, select: {
			favorites: true
		}
	})
	const isProductAvailable = await prisma.product.findUnique({
		where: {
			id: +req.params.id
		}
	})
	if (!user.favorites.includes(+req.params.id) && isProductAvailable) {
		const res2 = await prisma.user.update({
			where: { id: req.user.id },
			data: {
				favorites: {
					push: +req.params.id
				}
			}
		})
		res.json(res2)
	} else {
		if (!isProductAvailable) {
			res.status(400)
			throw new Error('Not found product')
		}
		const res3 = await prisma.user.update({
			where: { id: req.user.id },
			data: {
				favorites: { set: user.favorites.filter((item) => item !== +req.params.id) }
				
			}
		})
		res.json(res3)
	}
	
})
