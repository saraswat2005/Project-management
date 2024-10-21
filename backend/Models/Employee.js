import mongoose from 'mongoose'

const {Schema} = mongoose
const employeeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    organisation: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema, 'employees')
export default Employee