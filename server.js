import express from 'express'
import authRoutes from './auth/auth.routes.js'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
const app = express()
import 'colors'
dotenv.config()
async function main(){
	if (process.env.NODE_ENV === "developement") {
		app.use(morgan('dev'))
	}
	app.use(express.json())
	app.use('/api/auth', authRoutes)
	app.listen(process.env.PORT, console.log('YES!!!', process.env.PORT.green.bold))
}
main()
