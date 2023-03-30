import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getProfileCart, getProfileFavorite, getUserProfile } from './user.contoler.js'

const router = express.Router()

router.route('/Profile').get(protect, getUserProfile)
router.route('/Profile/Favorites').get(protect, getProfileFavorite)
router.route('/Profile/Cart').get(protect, getProfileCart)
export default router
