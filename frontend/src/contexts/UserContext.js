import React, {createContext, useEffect, useState} from 'react'
export const UserContext = createContext()
export const UserState = (props) => {
    const [credentials, setCredentials] = useState({})
    const [msg, setMsg] = useState("")
    const setAlert =  (msg) => {
         setMsg(msg)
    }
    const clearCredentials = () => {
        setCredentials({})
    }
    const getAlert = () => {
        return msg
    }
    const getCredentials = async() => {
        const localCredentials = await localStorage.getItem('credentials')

        if (localCredentials){
            setCredentials(JSON.parse(localCredentials))
        }
        else{
            const localCredentials = ""
            setCredentials(localCredentials)
        }
        return localCredentials
    }
    useEffect(() => {
        console.log('hello')
        // console.logCredentials
        console.log(getCredentials())
        console.log(credentials)
        console.log("alert", getAlert())
    }, [])
    const verifyResponseAndDoAction = async (finalResponse, data) => {
        console.log(finalResponse)
        if (finalResponse.success === true){
            await localStorage.setItem("credentials", JSON.stringify({authToken: finalResponse.authToken, email: data.email}))
            await setCredentials(localStorage.getItem("credentials"))
                console.log("local addmi:", localStorage.getItem("credentials"))
            await setAlert("Signup success")
            console.log("alert: ", getAlert())
        }
        else{
            await setAlert(`Signup failed errors: ${finalResponse.error}`)
            console.log("alert: ", getAlert())
        }

    }
    const host = "http://localhost:3005/api/auth"
    const loginUser = async(data) => {
        console.log(data)
        const url = host + "/login"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: data.email, password: data.password, userType: "Organisation"})
        })
        const finalResponse = await response.json()
        await verifyResponseAndDoAction(finalResponse, data)
    }
    const createUser = async (data) => {
        const url = host + "/signup"
        const response = await fetch(url, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({email: data.email, password: data.password, userType: 'Organisation'})
        })
        const finalResponse = await response.json()
        await verifyResponseAndDoAction(finalResponse, data)
    }
    return (
        <UserContext.Provider value={{setAlert, clearCredentials,  loginUser, createUser, getAlert, getCredentials, credentials}}>
            {props.children}
        </UserContext.Provider>
    )

}