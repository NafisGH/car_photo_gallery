import PageCards from 'pages/PageCards'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout';
import { PageUserProfile } from 'pages/PageUserProfile';
import { PageSignIn } from 'pages/PageSignIn';
import { PageSignUp } from 'pages/PageSignUp';

const AppRouter = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='/' element={<PageCards/>} />
                <Route path='user' element={<PageUserProfile/>} />
                <Route path='PageSignIn' element={<PageSignIn/>}/>
                <Route path='PageSignUp' element={<PageSignUp/>}/>
            </Route>
            
        </Routes>
    </div>
  );
}

export default AppRouter