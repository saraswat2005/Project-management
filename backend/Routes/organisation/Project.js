import express from 'express'
import {body, validationResult} from 'express-validator'
import fetchUser from '../../Middlewares/fetchUser.js'
import isAdmin from '../../Middlewares/isAdmin.js'
import validateAdmin from '../../Middlewares/validateAdmin.js'
import Project from '../../Models/Project.js'
import Employee from '../../Models/Employee.js'

export const router = express.Router()

router.get('/all', fetchUser, async(req, res) => {
    const organisationID = req.user
    const projects = await Project.find({createdBy: organisationID})
    return res.status(200).json({success: true, projects})
})
router.post('/add', fetchUser, isAdmin, [
    body('title', 'title of project?').isString(),
    body('desc', 'desc of project?').isString(),
    body('manager', 'manager of project?').isString()
], async (req, res) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({success: false, errors: errors.array()})
    }
    try {
        const {title, desc, manager} = req.body
        const organisationId = req.user
        console.log("organisationId ", organisationId)
        const project = await Project.create({
            createdBy: req.user,
            title: title,
            desc: desc,
            Manager: manager
        })
        return res.status(200).json({success: true, msg: "Project Created", project})
    } catch (error) {
        return res.status(500).json({success: false, msg: "internal server error", error})
    }

})

router.put('/edit/:id', fetchUser, isAdmin, validateAdmin({type: "Project"}), async (req, res) => {
    console.log('Yaha pahuch gaya chore')
    const {title, desc, manager} = req.body
    const projectID = req.params.id
    const updatedProject = {}
    if (title) {
        updatedProject.title = title
    }
    if (desc) {
        updatedProject.desc = desc
    }
    if (manager) {
        updatedProject.Manager = manager
    }
    try {
        const newProject = await Project.findByIdAndUpdate(projectID, {$set: updatedProject}, {new: true})
        return res.status(200).json({success: true, msg: "Project Updated", newProject})
    }
    catch(error){
        return res.status(500).json({success: false, msg: "Internal Server Error"})
    }
})

router.delete('/delete/:projectID', fetchUser, isAdmin, validateAdmin({type: "Project"}), async (req, res) => {
    const projectId = req.params.id
    try{
        await Project.findByIdAndDelete(projectId)
        return res.status(200).json({msg: "Deleted Project", success: true})
    }catch(error){
        return res.status(500).json({msg: "Internal Server Error", success: false})
    }
})



// router.post('/assign/:id', fetchUser, isAdmin, validateUser({type: "Project"}), async (req, res) => {
//     const projectID = req.params.id
//     const employeesID = req.body
//     const currentProject = await Project.findById(projectID)
//     employeesID.map(async (e) => {
//         // validate employees of this organisation
//         // assign to the project
//
//         const employeeOrNot = await Employee.findById(e)
//         if (employeeOrNot.organisation === req.user){
//             currentProject.Managers.push(e)
//             await currentProject.save()
//             return res.status(200).json({success: true, msg: "ManagerAdded", currentProject})
//         }
//     })
//
// } )
