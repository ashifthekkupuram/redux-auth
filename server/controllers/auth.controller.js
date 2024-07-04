import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import User from '../models/user.model.js'
import { json } from 'express'

dotenv.config()

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const USERNAME_REGEX = /^(?=.*[a-z])[a-z]+[a-z0-9_]{2,24}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password required'
            })
        }

        const foundUser = await User.findOne({ email: email.toLowerCase() })

        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: 'Wrong credentials'
            })
        }

        const match = await bcrypt.compare(password, foundUser.password)

        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Wrong credentials'
            })
        }

        const accessToken = jwt.sign({
            "UserInfo": {
                _id: foundUser._id,
                username: foundUser.username,
                email: foundUser.email.toLowerCase()
            }
        }, ACCESS_SECRET_KEY, { expiresIn: '5m' })

        const refreshToken = jwt.sign({ _id: foundUser._id }, REFRESH_SECRET_KEY, { expiresIn: '1d' })

        return res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1 * 24 * 60 * 60 * 1000
        }).json({success: true, accessToken, user: { username: foundUser.username, createdAt: foundUser.createdAt }})

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

        if (!password.match(PASSWORD_REGEX)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }

        bcrypt.hash(password, 12, async (err, hashedPassword) => {
            if (!err) {
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
            } else {
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

export const refresh = async (req, res, next) => {
    try {
        
        const cookies = req.cookies

        if(!cookies?.jwt){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const refreshToken = cookies.jwt

        jwt.verify(
            refreshToken,
            REFRESH_SECRET_KEY,
            async (err, decoded) => {

                if(err){
                    return res.status(403).json({
                        success: false,
                        message: 'Forbidden'
                    })
                }

                const foundUser = await User.findById(decoded._id)

                if(!foundUser){
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized'
                    })
                }

                const accessToken = jwt.sign(
                    { "UserInfo": {
                        _id: foundUser._id,
                        email: foundUser.email.toLowerCase(),
                        username: foundUser.username
                    } },
                    ACCESS_SECRET_KEY,
                    {expiresIn: '15s'}
                )

                return res.json({
                    success: true,
                    accessToken,
                    user: { username: foundUser.username, createdAt: foundUser.createdAt }
                })

            }
        )

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}

export const logout = async (req, res, next) => {
    try {
        
        const cookies = req.cookies

        if(!cookies?.jwt) return res.sendStatus(204)
        
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })

        res.json({success: true, message: 'Cookie cleared'})

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    }
}