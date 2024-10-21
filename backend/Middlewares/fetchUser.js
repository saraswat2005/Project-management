import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import {JWT_SECRET} from '../config.js'
export default async function fetchUser (req, res, next){
    const token = req.header("authToken")
    if (!token){
        return res.status(401).json({success: false, msg: "Not Authorized"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        req.userDetails = await User.findById(data.user)
        console.log("USERDETAILS ", req.userDetails)
        next()
    }
    catch(error){
        return res.status(401).json({success: false, msg: "Not Authorized"})
    }
}