import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from '../utils'

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handdleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password is required")
    }
    try {
      const url = "https://backend-login-app-api1.vercel.app/auth/login"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      })
      const result = await response.json()
      const { success, message, error, jwtToken, name } = result
      if (success) {
        handleSuccess(message)
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("loggedInUser", name)
        setTimeout(() => {
          navigate("/home")
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
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value
    setLoginInfo(copyLoginInfo)
  }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handdleLogin}>
        <div>
          <label>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='Enter you email'
            value={loginInfo.email}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Enter you password'
            value={loginInfo.password}
          />
        </div>
        <button>Signup</button>
        <span>
          Don't have an account ?
          <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}


export default Login
