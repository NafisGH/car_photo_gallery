import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

  const token = localStorage.getItem("token");

  return token ? <Outlet/> : <Navigate replace to="/sign-in"/>
}

export default ProtectedRoute