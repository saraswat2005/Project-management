import express from 'express'
import cors from 'cors'
import {connectToMongo} from './db.js'
import {router as authRouter} from './Routes/authRoutes.js'
import {router as organisationProfileRouter} from './Routes/organisation/Profile.js'
import {router as organisationProjectRouter} from './Routes/organisation/Project.js'
import {router as organisationProjectTaskRouter} from './Routes/organisation/Task.js'
import {router as employeeRouter} from './Routes/employeeRoutes.js'
const app = express()
const port = 3005
app.use(cors())
app.use(express.json())
connectToMongo()
app.use('/api/auth', authRouter)
app.use('/api/organisation/profile', organisationProfileRouter)
app.use('/api/organisation/project', organisationProjectRouter)
app.use('/api/organisation/projectTask', organisationProjectTaskRouter)
app.use('/api/employee', employeeRouter)
app.listen(port, () =>  {
    console.log(`app listening at http://localhost:${port}`)
})