import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routers/auth.router.js'

import ConnectDB from './utils/database.js'
import corsOptions from './config/corsOptions.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

ConnectDB()

app.use('/api/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})