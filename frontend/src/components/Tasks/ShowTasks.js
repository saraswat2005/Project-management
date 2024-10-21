import '../../css/index.css'
import {UserContext} from '../../contexts/UserContext.js'
import {TasksContext} from '../../contexts/TasksContext.js'
import React, {useState, useContext, useEffect} from 'react'
import {Task} from './Task.js'
import {Sidebar} from "../Sidebar.js";
import {useNavigate, useParams} from 'react-router-dom'
export const ShowTasks = () => {
    const values = useContext(UserContext)
    const navigate = useNavigate()
    const taskValues = useContext(TasksContext)
    const {projectID} = useParams()
    const {fetchTasks, tasks, setTasks} = taskValues
    const [task, setTask] = useState({title: "", desc: "", Manager: "", createdOn: ""})
    // const {fetchTasks} = taskValues
    const {getCredentials, getAlert, credentials} = values
    useEffect(() => {
        const loadTasks = async () => {
            console.log(tasks)
            await getCredentials();
            const credentials = JSON.parse(localStorage.getItem('credentials'))
            console.log("credentials", credentials.authToken)
            try {
                const tasksData = await fetchTasks(credentials.authToken, projectID);
                console.log("tasksData", tasks)

            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }

        }
        loadTasks()
    }, [])
    const addTask = () => {
        const url = '/projects/' + projectID + '/create'
        navigate(url)
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
                        tasks.length === 0 ? <h3 className={"msg text-center"}>No Tasks to display</h3>
                            :
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-100 whitespace-nowrap">
                                <tr className={"label-row"}>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                        Task Name
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                        Task Desc
                                    </th>
                                    <th className="p-4 text-left text-xs font-semibold text-gray-800">
                                        Assigned
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
                                {tasks.map((e) => {
                                    return (
                                        <>
                                            <Task task={e}/>
                                        </>
                                    )
                                })}

                                </tbody>
                            </table>
                    }
                    </div>

                    <div className={"addTaskButton"}>
                        <button type="button" onClick={addTask}
                                className="px-5 py-2.5 flex items-center justify-center rounded text-white text-sm tracking-wider font-medium border-none outline-none bg-purple-600 hover:bg-purple-700 active:bg-purple-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" className="inline"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                                    data-original="#000000"/>
                            </svg>
                            <h2 style={{"margin-left": "5px"}}>New Task</h2>
                        </button>
                    </div>

                </div>

            </div>
        </>
    )
}