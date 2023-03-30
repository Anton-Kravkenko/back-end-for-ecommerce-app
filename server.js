import express from 'express'
import authRoutes from './auth/auth.routes.js'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
const app = express()
import 'colors'
import { ErrorHandler, notFound } from './middleware/error.middleware.js'
import { prisma } from './prisma.js'
import productRoutes from './product/product.routes.js'
import userRoutes from './user/user.routes.js'
dotenv.config()
async function main(){
	if (process.env.NODE_ENV === "developement") {
		app.use(morgan('dev'))
	}
	app.use(express.json())
	app.use('/api/auth', authRoutes)
	app.use('/api/users', userRoutes)
	app.use('/api/products', productRoutes)
	app.use(notFound, ErrorHandler)
	app.listen(process.env.PORT, console.log('YES!!!', process.env.PORT.green.bold))
}
main().then(async () => {
	await prisma.$disconnect()
}).catch(async (e) => {
	console.log(e)
	await prisma.$disconnect()
	process.exit(1)
})
