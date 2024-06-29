import express from 'express'
import dotenv from 'dotenv'

import authRouter from './routers/auth.router.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.set(express.json())
app.set(express.urlencoded({extended: true}))

app.use('/api/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})