import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import User from '../models/user.model.js'

dotenv.config()

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const USERNAME_REGEX = /^(?=.*[a-z])[a-z]+[a-z0-9_]{2,24}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const { SECRET_KEY } = process.env

export const login = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Login API"
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const register = async (req, res, next) => {
    try {

        const { email, username, password } = req.body

        if (!email || !username || !password) {
            return res.status(406).json({
                success: false,
                message: 'Email, username and password required'
            })
        }

        const [emailExist, usernameExist] = await Promise.all([User.findOne({ email: email.toLowerCase() }), User.findOne({ username })])

        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: 'Account with email already exist'
            })
        }

        if (usernameExist) {
            return res.status(400).json({
                success: false,
                message: 'Username already exist'
            })
        }

        if (!email.toLowerCase().match(EMAIL_REGEX)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email ID'
            })
        }

        if (!username.match(USERNAME_REGEX)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid username'
            })
        }

        if(!password.match(PASSWORD_REGEX)){
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            }) 
        }

        bcrypt.hash(password, 12, async (err, hashedPassword)=>{
            if(!err){
                const user = new User({
                    email: email.toLowerCase(),
                    username,
                    password: hashedPassword
                })

                await user.save()

                return res.status(200).json({
                    success: true,
                    message: 'User has been created'
                })
            }else{
                return res.status(400).json({
                    success: false,
                    message: "Something went wrong",
                    error: err
                })
            }
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}