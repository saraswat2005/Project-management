import {body, validationResult} from 'express-validator'
import express from 'express'
import fetchUser from '../../Middlewares/fetchUser.js'
import isAdmin from '../../Middlewares/isAdmin.js'
import Organisation from '../../Models/Organisation.js'
export const router = express.Router()
router.post('/add', [
    body('name', 'Enter the organisation name').isString(),
    body('address', 'Enter the organisation address').isString(),
    body('city', 'Enter the organisation city').isString(),
    body('state', 'Enter the organisation state').isString(),
    body('pinCode', 'Enter the organisation pincode').isString(),
    body('country', 'Enter the organisation country').isString(),
    body('about', 'Enter the organisation about').isString(),
    body('logo', 'Enter the url for the logo').isURL(),
], fetchUser, isAdmin, async (req, res) => {
    const errors = await validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, msg: "Eroro", errors: errors.array()})
    }
    try {
        console.log("isadmin?", req.isadmin)
        console.log("hello")
        console.log("user details ", req.userDetails)
        const {email} = req.userDetails
        console.log("userEmail", email)
        console.log("body", req.body)
        const user = req.user
        console.log("user123 ", user)
        const {name, address, country, pinCode, about, state, city, logo} = req.body

        console.log(name, email, address, country)
        const organisationProfile = await Organisation.create({
            user: user,
            name: name,
            address: address,
            city: city,
            state: state,
            pinCode: pinCode,
            country: country,
            about: about,
            email: email,
            logo: logo
        })
        console.log(organisationProfile)
        console.log("isadmin?", req.isadmin)
        return res.status(200).json({success: true, isAdmin: req.isadmin})


    } catch (error) {
        return res.status(400).json({success: false, error})
    }

})

router.get('/get', fetchUser, isAdmin, async (req, res) => {
    const profile = await Organisation.findOne({user: req.user})
    if (profile){
        return res.status(200).json({success: true, profile})
    }
    return res.status(200).json({success:false, msg: "Profile not found. Add profile"})
})

router.put('/edit', fetchUser, isAdmin, async(req, res) => {
    const originalProfile = await Organisation.findOne({user: req.user})

    const {name, address, country, pinCode, about, state, city, logo} = req.body
    const updatedProfile = {}
    if (name){
        updatedProfile.name = name
    }
    if (address){
        updatedProfile.address = address
    }
    if (country){
        updatedProfile.country = country
    }
    if (pinCode){
        updatedProfile.pinCode = pinCode
    }
    if (state){
        updatedProfile.state = state
    }
    if (logo){
        updatedProfile.logo = logo
    }
    if (city){
        updatedProfile.city = city
    }
    if (about){
        updatedProfile.about = about
    }
    try{
        const newProfile  = await Organisation.findByIdAndUpdate(originalProfile.id, {$set: updatedProfile}, {new: true})
        return res.status(200).json({success:true, msg:"updated profile", newProfile})
    }
    catch(error){
        return res.status(500).json({msg: "InternalServerError", success:false, error})
    }


})