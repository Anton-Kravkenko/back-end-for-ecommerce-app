import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { getUserProfile } from './user.contoler.js'

const router = express.Router()

router.route('/Profile').get(protect, getUserProfile)

export default router
