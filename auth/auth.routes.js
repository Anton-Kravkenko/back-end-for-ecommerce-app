import express from 'express'
import { login, registerUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').post(login)
router.route('/register').post(registerUser)

export default router
