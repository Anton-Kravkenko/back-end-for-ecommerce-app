import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import {
	addProduct,
	addProductRewiew,
	getAllProduct,
	getbyId,
	removeProduct,
	searchByCategory,
	searchByTitle
} from './product.contoler.js'

const router = express.Router()

router.route('/getAllProduct').get(getAllProduct)
router.route('/AddProduct').post(protect, addProduct)
router.route('/getProductById/:id').get(getbyId)
router.route('/removeProductById/:id').delete(protect, removeProduct)
router.route('/AddProductReview/:id').post(protect, addProductRewiew)
router.route('/searchProduct/:title').get(searchByTitle)
router.route('/searchProductByCategory/:term').get(searchByCategory)
export default router
