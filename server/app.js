import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.set(express.json())
app.set(urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: 'API working!'
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`)
})