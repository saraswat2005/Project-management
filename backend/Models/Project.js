import mongoose from 'mongoose'
const {Schema} = mongoose

const projectSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    Manager:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn:{
        type: Date,
        default: Date.now
    }})


const Project = mongoose.models.Project || mongoose.model('Project', projectSchema, 'projects')
export default Project