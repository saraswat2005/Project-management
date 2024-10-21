import Project from '../Models/Project.js'
import Task from '../Models/Task.js'
export default function validateAdmin(params) {
    return async (req, res, next) => {
        const id = req.params.id // project or task id
        console.log(id)
        console.log(params)
        if (params.type === 'Project'){
            console.log("projectId:", id)
            const project = await Project.findById(id)

            console.log(project)
            console.log("created", project.createdBy.toString())
            if(project.createdBy.toString() === req.user){
                console.log('usi ne banaya h')
                next()
            }

            if(!project.createdBy.toString() === req.user){
                return res.status(401).json({msg: "Not Authorized"})
            }

        }
        else if (params.type === 'Task'){
            const task = Task.findById(id)
            if(!task.createdBy === req.user){
                return res.status(401).json({msg: "Not Authorized"})
            }
        next()

        }
    }


}