import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	AddCategories,
 deleteCategorybyId,
	GetCategories,
	GetCategorybyId,
	GetCategorybySlug
} from './category.controller.js'

const router = express.Router()

router.route('/add-category').post(protect,AddCategories)
router.route('/delete-category-by-id/:id').delete(protect,deleteCategorybyId)
router.route('/get-category-by-id/:id').get(GetCategorybyId)
router.route('/get-category-by-slug/:slug').get(GetCategorybySlug)
router.route('/get-categories').get(GetCategories)
export default router
