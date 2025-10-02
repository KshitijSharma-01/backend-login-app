import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAunthenticated}) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsAunthenticated(true);
            if (location.pathname === "/" ||
                location.pathname === "/login" ||
                location.pathname === "/signup"
            ) {
                navigate("/home", { replace: false })
            }
        }
    }, [location, navigate, setIsAunthenticated])
    return (
        null
    )
}

export default RefreshHandler