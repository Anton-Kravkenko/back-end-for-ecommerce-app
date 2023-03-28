import express from 'express'
import authRoutes from './auth/auth.routes.js'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
const app = express()
import 'colors'
import { prisma } from './prisma.js'
dotenv.config()
async function main(){
	if (process.env.NODE_ENV === "developement") {
		app.use(morgan('dev'))
	}
	app.use(express.json())
	app.use('/api/auth', authRoutes)
	app.listen(process.env.PORT, console.log('YES!!!', process.env.PORT.green.bold))
}
main().then(async () => {
	await prisma.$disconnect()
}).catch(async (e) => {
	console.log(e)
	await prisma.$disconnect()
	process.exit(1)
})
