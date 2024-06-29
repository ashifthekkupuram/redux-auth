import express from 'express'
import dotenv from 'dotenv'

import authRouter from './routers/auth.router.js'

import ConnectDB from './utils/database.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

ConnectDB()

app.use('/api/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})