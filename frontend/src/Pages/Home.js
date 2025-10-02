import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [product, setProducts] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem("token")
    localStorage.removeItem("loggedInUser")
    handleSuccess("Logout Successfully")
    setTimeout(() => {
      navigate("/login")
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8000/products"
      const headers = {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }
      const response = await fetch(url, headers)
      const result = await response.json()
      console.log(result)
      setProducts(result)
    } catch (error) {
      handleError(error)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div>
      <h1>
        {loggedInUser}
      </h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          product && product?.map((item,index) => {
            return <ul key={index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          })
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home