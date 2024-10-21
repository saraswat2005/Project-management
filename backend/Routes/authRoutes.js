import express from 'express'
import {body, validationResult} from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config.js'
import User from '../Models/User.js'
export const router = express.Router()

router.post('/login',[
    body('email', 'must be a email').isEmail(),
    body('password', 'must be atleast 7 chars').isLength({min: 7})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try{
        let user = await User.findOne({email: req.body.email})
        if (user){
            const passwordCompare = await bcrypt.compare(req.body.password, user.password)
            console.log(passwordCompare)
            if (!passwordCompare){
                return res.status(400).json({success: false, msg: "Login with correct credentials"})
            }
            const data = {
                user: user._id
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            return res.status(200).json({success: true, authToken})
        }
        return res.status(400).json({success: false, msg: "Login with correct credentials"})
    }
    catch(error){
        return res.status(500).json({success: false, msg: "Internal Server error"})
    }

})

router.post('/signup', [
    body('email', "Must contain a valid email").isEmail(),
    body('password', 'must be atleast 7 characters').isLength({min: 7})
], async(req, res) => {
    const errors = validationResult(req)
    console.log(req.body.email, req.body.password)
    if (!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()})
    }
    try{
        let userExists = await User.findOne({email: req.body.email})
        if (userExists){
            return res.status(400).json({msg: "User exists"})
        }
        const secureSalt = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            email: req.body.email,
            password: secureSalt,
            userType: req.body.userType
        })
        const data = {
            user: user._id
        }
        console.log(data.user)
        const authToken = jwt.sign(data, JWT_SECRET)
        return res.status(200).json({success: true, authToken})
    }
    catch(error){
        return res.status(500).json({success: false, msg: "Internal Server Error", error})
    }

})