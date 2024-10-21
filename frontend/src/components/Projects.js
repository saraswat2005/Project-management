import '../css/index.css'
import {UserContext} from '../contexts/UserContext.js'
import {ProjectsContext} from '../contexts/ProjectsContext.js'
import React, {useState, useContext, useEffect} from 'react'
import {Project} from './Project.js'
import {Sidebar} from "./Sidebar";
import {useNavigate} from 'react-router-dom'
export const Projects = () => {
    const values = useContext(UserContext)
    const navigate = useNavigate()
    const projectValues = useContext(ProjectsContext)
    const {fetchProjects, projects, setProjects} = projectValues
    const [project, setProject] = useState({title: "", desc: "", Manager: "", createdOn: ""})
    // const {fetchProjects} = projectValues
    const {getCredentials, getAlert, credentials} = values
    useEffect(() => {
        const loadProjects = async () => {
            console.log(projects)
            await getCredentials();
            const credentials = JSON.parse(localStorage.getItem('credentials'))
            console.log("credentials", credentials.authToken)
            try {
                const projectsData = await fetchProjects(credentials.authToken);
                console.log("projectsData", projects)

            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }

        }
        loadProjects()
    }, [])
    const addProject = () => {
        navigate('/addProject')
    }
    return (
        <>
            <div className="body">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="font-sans overflow-x-auto">
                    <div className={"content"}>
                    {
                        projects.length === 0 ? <h3 className={"msg text-center"}>No Projects to display</h3>
                            :
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100 whitespace-nowrap">
                                <tr className={"label-row"}>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                        Project Name
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                        Project Desc
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                        Manager
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                        Created On
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                        Actions
                                    </th>
                                </tr>
                                </thead>

                                <tbody className="whitespace-nowrap">
                                {projects.map((e) => {
                                    return (
                                        <>
                                            <Project project={e}/>
                                        </>
                                    )
                                })}

                                </tbody>
                            </table>
                    }
                    </div>

                    <div className={"addProjectButton"}>
                        <button type="button" onClick={addProject}
                                className="px-5 py-2.5 flex items-center justify-center rounded text-white text-sm tracking-wider font-medium border-none outline-none bg-purple-600 hover:bg-purple-700 active:bg-purple-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" className="inline"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                                    data-original="#000000"/>
                            </svg>
                            <h2 style={{"margin-left": "5px"}}>New Project</h2>
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}