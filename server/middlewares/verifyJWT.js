import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const { ACCESS_SECRET_KEY } = process.env

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, ACCESS_SECRET_KEY, (err, decoded) => {
        if(err) return res.status(403).json({success: false, message: 'Forbidden'})
        
        req._id = decoded.UserInfo._id
        
        next()
    })

}

export default verifyJWT