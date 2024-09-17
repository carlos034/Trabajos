import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext'

function ProtectedRoutes() {
    const {isAuthenticated} = useAuth();
    if(!isAuthenticated) return <Navigate to='/Login' replace/>
  return (
    <Outlet/>
  )
}

export default ProtectedRoutes