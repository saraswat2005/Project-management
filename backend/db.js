import mongoose from 'mongoose';
import {dbPassword} from './config.js';
const dbName = 'planSync'
const uri = `mongodb+srv://aryangupta:${dbPassword}@cluster0.il7jb.mongodb.net/${dbName}`;
// mongodb+srv://<username>:<password>@cluster0.mongodb.net/newDatabaseName'
export const connectToMongo = () => {
    mongoose.connect(uri)
        .then(() => {
        console.log('Database connected Successfully')
    })
        .catch((err) => {
            console.log(`${err} connecting to the db`)
        })
}


