import {useContext, useState, useEffect, createContext} from 'react'
export const ProjectsContext = createContext()
export const ProjectsState = (props) => {
    const host = "http://localhost:3005/api/organisation/project"
    const [projects, setProjects] = useState([])
    const fetchProjects = async (authToken) => {
        const url = host + "/all"
        console.log(url, authToken)
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": authToken
            }
        })
        const finalResponse = await response.json()
        console.log(finalResponse.projects)
        setProjects(finalResponse.projects || [])
    }
    const createProject = async(data, credentials) => {
        const url = host + "/add"
        console.log("token", credentials.authToken, "data", data)
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": credentials.authToken
            },
            body: JSON.stringify({
                title: data.title,
                desc: data.desc,
                Manager: data.manager
            })
        })
        const finalResponse = await response.json()
        console.log("finalResponse", finalResponse)

    }
    return <ProjectsContext.Provider value={{fetchProjects, projects, setProjects, createProject}}>
        {props.children}
    </ProjectsContext.Provider>
}