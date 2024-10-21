import mongoose from 'mongoose'
const {Schema} = mongoose
const organisationSchema = new Schema({
    user: {
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
    about: {
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
    logo: {
        data: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})


const Organisation = mongoose.models.Organisation || mongoose.model('Organisation', organisationSchema, 'organisations')
export default Organisation