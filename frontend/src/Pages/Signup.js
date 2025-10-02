import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../utils'

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navaigate = useNavigate()

    const handdleSignup = async (e) => {
        e.preventDefault()
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError("name, email and password is required")
        }
        try {
            const url = "https://backend-login-app-api1.vercel.app/auth/signup"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()
            const { success, message, error } = result
            if (success) {
                handleSuccess(message)
                setTimeout(() => {
                    navaigate("/login")
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details)
            } else if (!success) {
                handleError(message)
            }
            console.log(result)
        } catch (error) {
            handleError(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)
    }

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handdleSignup}>
                <div>
                    <label>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter you name'
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter you email'
                        value={signupInfo.email}
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter you password'
                        value={signupInfo.password}
                    />
                </div>
                <button>Signup</button>
                <span>
                    Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}


export default Signup
