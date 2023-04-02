import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'


export const AddCategories = asyncHandler(async (req, res) => {
	const {name, slug } = req.body
	const categories = await prisma.category.create({
	include: {
		products: true
	}, data: {
		slug, name
		}
	})
	res.json(categories)
})

export const GetCategories = asyncHandler(async (req, res) => {
	const categories = await prisma.category.findMany()
	res.json(categories)
})


export const GetCategorybyId = asyncHandler(async (req, res) => {
	const { id } = req.params
	const category = await prisma.category.findUnique({
where: {
id: +id
}
	})
	res.json(category)
})
export const GetCategorybySlug = asyncHandler(async (req, res) => {
	const { slug } = req.params
	const category = await prisma.category.findFirst({
		where: {
slug
		}
	})
	res.json(category)
})
export const deleteCategorybyId = asyncHandler(async (req, res) => {
	const { id } = req.params
 await prisma.category.delete({
where: {
id: +id
}
})
	res.json({
		message: 'Category deleted successfully'
	})
})
