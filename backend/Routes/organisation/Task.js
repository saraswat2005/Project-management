import express from 'express'
import {body, validationResult} from 'express-validator'
import fetchUser from '../../Middlewares/fetchUser.js'
import isAdmin from '../../Middlewares/isAdmin.js'
import validateAdmin from '../../Middlewares/validateAdmin.js'
import Employee from '../../Models/Employee.js'
import Task from "../../Models/Task.js";

export const router = express.Router()

router.get('/:projectID/alltasks', fetchUser, async(req, res) => {
    const projectID = req.params.projectID
    const tasks = await Task.find({project: projectID})
    console.log(tasks)
    return res.status(200).json({success: true, tasks})
})

router.post('/:projectID/addtask', fetchUser, isAdmin, [
    body('title', 'title of task?').isString(),
    body('desc', 'desc of task?').isString()
], async (req, res) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty) {
        return res.status(400).json({success: false, errors: errors.array()})
    }
    try {
        const {title, desc} = req.body
        const organisationId = req.user
        const {projectID} = req.params
        console.log("organisationId ", organisationId)
        const task = await Task.create({
            createdBy: req.user,
            project: projectID,
            title: title,
            desc: desc
        })
        return res.status(200).json({success: true, msg: "Task Created", task})
    } catch (error) {
        return res.status(500).json({success: false, msg: "internal server error", error})
    }

})

router.put('/edit/:id', fetchUser, isAdmin, validateAdmin({type: "Task"}), async (req, res) => {
    console.log('Yaha pahuch gaya chore')
    const {title, desc} = req.body
    const taskID = req.params.id
    const updatedTask = {}
    if (title) {
        updatedTask.title = title
    }
    if (desc) {
        updatedTask.desc = desc
    }
    try {
        const newTask = await Task.findByIdAndUpdate(taskID, {$set: updatedTask}, {new: true})
        return res.status(200).json({success: true, msg: "Task Updated", newTask})
    }
    catch(error){
        return res.status(500).json({success: false, msg: "Internal Server Error"})
    }
})

router.delete('/delete/:taskID', fetchUser, isAdmin, validateAdmin({type: "Task"}), async (req, res) => {
    const taskId = req.params.id
    try{
        await Task.findByIdAndDelete(taskId)
        return res.status(200).json({msg: "Deleted Task", success: true})
    }catch(error){
        return res.status(500).json({msg: "Internal Server Error", success: false})
    }
})



// router.post('/assign/:id', fetchUser, isAdmin, validateUser({type: "Task"}), async (req, res) => {
//     const taskID = req.params.id
//     const employeesID = req.body
//     const currentTask = await Task.findById(taskID)
//     employeesID.map(async (e) => {
//         // validate employees of this organisation
//         // assign to the task
//
//         const employeeOrNot = await Employee.findById(e)
//         if (employeeOrNot.organisation === req.user){
//             currentTask.Managers.push(e)
//             await currentTask.save()
//             return res.status(200).json({success: true, msg: "ManagerAdded", currentTask})
//         }
//     })
//
// } )
