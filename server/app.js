import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRouter from './routers/auth.router.js'
import noteRouter from './routers/note.router.js'

import verfyJWT from './middlewares/verifyJWT.js'

import ConnectDB from './utils/database.js'
import corsOptions from './config/corsOptions.js'
import verifyJWT from './middlewares/verifyJWT.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

ConnectDB()

app.use('/api/auth', authRouter)
app.use('/api/note', verifyJWT ,noteRouter)

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})