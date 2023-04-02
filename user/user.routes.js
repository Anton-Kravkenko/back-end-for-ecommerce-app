import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getProfileCart, getProfileFavorite, getUserProfile } from './user.contoler.js'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile)
router.route('/profile/favorites').get(protect, getProfileFavorite)
router.route('/profile/cart').get(protect, getProfileCart)
export default router
