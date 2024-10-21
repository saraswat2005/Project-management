import {useContext, useState, useEffect, createContext} from 'react'
import {useParams} from 'react-router-dom'
export const TasksContext = createContext()
export const TasksState = (props) => {
    const host = "http://localhost:3005/api/organisation/projectTask"
    const [tasks, setTasks] = useState([])
    const {projectID} = useParams()
    const fetchTasks = async (authToken, projectID) => {
        const url = host + `/${projectID}/alltasks`
        console.log(url, authToken)
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": authToken
            }
        })
        const finalResponse = await response.json()
        console.log(finalResponse.tasks)
        setTasks(finalResponse.tasks || [])
    }
    const createTask = async(data, credentials, projectID) => {
        const url = host + `/${projectID}/addtask`
        console.log("token", credentials.authToken, "data", data)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": credentials.authToken
            },
            body: JSON.stringify({
                project: projectID,
                title: data.title,
                desc: data.desc,
                assignedTo: data.assignedTo
            })
        })
        const finalResponse = await response.json()
        console.log("finalResponse", finalResponse)

    }
    return <TasksContext.Provider value={{fetchTasks, tasks, setTasks, createTask}}>
        {props.children}
    </TasksContext.Provider>
}