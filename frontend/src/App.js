import './css/App.css';
import {Sidebar} from './components/Sidebar.js'
import {Signup} from './components/Signup.js'
import {Login} from './components/Login.js'
import {ProfileForm as OrganisationProfileForm} from './components/Organisation/ProfileForm.js'
import {Profile as OrganisationProfile} from './components/Organisation/Profile.js'
import {Profile as EmployeeProfile} from './components/Organisation/Profile.js'
import {AddProject} from './components/Organisation/AddProject.js'
import {UserState} from './contexts/UserContext.js'
import {TasksState} from './contexts/TasksContext.js'
import {ProjectsState} from './contexts/ProjectsContext.js'
import {Projects} from './components/Projects.js'
import {ShowTasks} from './components/Tasks/ShowTasks.js'
import {CreateTask} from './components/Tasks/CreateTask.js'
import {Project} from './components/Project.js'
import {ProfileForm as EmployeeProfileForm} from './components/Employees/ProfileForm.js'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
    return (
        <TasksState>
            <UserState>
                <ProjectsState>
                    <div className="App">
                        <Router>
                            <Routes>
                                <Route path={"/signup"} element={
                                    <>
                                        <Signup/>
                                    </>
                                }></Route>
                                <Route path={"/login"} element={
                                    <>
                                        <Login/>
                                    </>
                                }></Route>
                                <Route path={"/addprofile"} element={
                                    <>
                                        <OrganisationProfileForm/>
                                    </>
                                }></Route>
                                <Route path={"/profile"} element={
                                    <>
                                        <OrganisationProfile/>
                                    </>
                                }></Route>
                                <Route path={"/projects"} element={
                                    <>
                                        <Projects/>
                                    </>
                                }></Route>
                                <Route path={"/project"} element={
                                    <>
                                        <Project/>
                                    </>
                                }></Route>
                                <Route path={"/addproject"} element={
                                    <>
                                        <AddProject/>
                                    </>
                                }></Route>
                                <Route path={"/projects/:projectID/create"} element={
                                    <>
                                        <CreateTask/>
                                    </>
                                }></Route>
                                <Route path={"/projects/:projectID/alltasks"} element={
                                    <>
                                        <ShowTasks/>
                                    </>
                                }></Route>
                            </Routes>
                        </Router>
                    </div>
                </ProjectsState>
            </UserState>
        </TasksState>
    )
}

export default App;
