import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

  const token = JSON.parse(localStorage.getItem("user")).token;

  return token ? <Outlet/> : <Navigate replace to="/sign-in"/>
}

export default ProtectedRoute