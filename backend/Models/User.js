import mongoose from 'mongoose'
const {Schema} = mongoose
const userSchema = new Schema({
    email:{
        type: "string",
        required: true,
        unique: true
    },
    password:{
        type: "string",
        required: true
    },
    userType: {
        type: "string",
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.models.User || mongoose.model('User', userSchema, 'users')
export default User