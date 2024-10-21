import mongoose from 'mongoose'
const {Schema} = mongoose

const taskSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "In Progress"
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema, 'tasks')
export default Task
