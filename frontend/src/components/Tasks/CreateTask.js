import React, {useState, useEffect, useContext} from 'react'
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import '../../css/index.css'
import {Sidebar} from "../Sidebar";
import {TasksContext} from "../../contexts/TasksContext.js"
export const CreateTask = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const {projectID} = useParams()
    const {createTask} = useContext(TasksContext)
    const [taskDetails, setTaskDetails] = useState({title: "", assigned: "", desc: ""})
    const onChange = (e) => {
        setTaskDetails({...taskDetails, [e.target.name]: e.target.value})
    }
    useEffect(() => {
        console.log(taskDetails)
        console.log(location.pathname)
    }, [taskDetails, location])
    const submitForm = async() => {
        console.log(taskDetails)
        console.log("projectID", projectID)
        const credentials = await JSON.parse(localStorage.getItem('credentials'))
        createTask(taskDetails, credentials, projectID)
        const url = `/projects/${projectID}/alltasks`
        navigate(url)
    }
    return (<>
        <div className="body">
            <div className="sidebar">
                <Sidebar/>
            </div>
            <div className="addTaskForm">
                <form className="font-[sans-serif] m-6 max-w-4xl mx-auto">
                    <div className="grid sm:grid-cols-2 gap-10 taskAddForm">
                        <div className="relative flex items-center sm:col-span-2">
                            <label
                                className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Title</label>
                            <input type="text" placeholder="What you want to call it?" onChange={onChange}
                                 name={"title"}  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                 className="w-[18px] h-[18px] absolute right-4"
                                 viewBox="0 0 682.667 682.667">
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                    </clipPath>
                                </defs>
                                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                          data-original="#000000"></path>
                                    <path
                                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                        data-original="#000000"></path>
                                </g>
                            </svg>
                        </div>

                        <div className="relative flex items-center sm:col-span-2">
                            <label
                                className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">Assigned To</label>
                            <input type="text" name={"assigned"} placeholder="Who does this?" onChange={onChange}
                                   className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                                 className="w-[18px] h-[18px] absolute right-4"
                                 viewBox="0 0 682.667 682.667">
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                    </clipPath>
                                </defs>
                                <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path fill="none" stroke-miterlimit="10" stroke-width="40"
                                          d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                          data-original="#000000"></path>
                                    <path
                                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                        data-original="#000000"></path>
                                </g>
                            </svg>
                        </div>

                        <textarea placeholder='What does it do?' name={"desc"} onChange={onChange}
                                  className="p-4 bg-white max-w-md mx-auto w-full block text-sm border border-gray-300 outline-[#007bff] rounded"
                                  rows="4"></textarea>
                    </div>

                    <button type="button" onClick={submitForm}
                            className="mt-8 px-6 py-2.5 w-full text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">Submit
                    </button>
                </form>
            </div>

        </div>

    </>)
}