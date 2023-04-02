import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	addProduct,
	addProductRewiew,
	getAllProduct,
	getbyId,
	removeProduct,
	searchByTitle,
	toggleCart,
	toggleFavorite
} from './product.contoler.js'

const router = express.Router()

router.route('/get-all-product').get(getAllProduct)
router.route('/add-product').post(protect, addProduct)
router.route('/get-product-by-id/:id').get(getbyId)
router.route('/remove-product-by-id/:id').delete(protect, removeProduct)
router.route('/add-product-review-by-id/:id').post(protect, addProductRewiew)
router.route('/search-product-by-title/:title').get(searchByTitle)
router.route('/add-to-cart-by-id/:id').post(protect, toggleCart)
router.route('/add-to-favorite-by-id/:id').post(protect, toggleFavorite)
export default router
