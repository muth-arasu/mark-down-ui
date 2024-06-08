import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


function ProtectedRoute({children}) {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')
    if(!token){
        sessionStorage.clear()
        navigate('/sign-in')
     }
        
  return token ? children : <Navigate to='/'/>
}

export default ProtectedRoute