import { useState , useEffect } from 'react'
import { useSelector , useDispatch } from "react-redux"

import './App.css' 

import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import HomePage from './Pages/HomePage'

import {BrowserRouter, Route, Routes , Navigate } from "react-router-dom" ; 
import { checkAuth } from './store/authSlice' 



function App(){ 

  // Get authentication status from Redux store
  const {isAuthenticated} = useSelector( (state) => state.auth ) ;

  const dispatch = useDispatch() ;

  // Check if the user is authenticated whenever the component mounts
  // or when the authentication status changes.
  useEffect( ()=> {
    dispatch( checkAuth() )  
  } , [ dispatch ]) ;  // 


    return (
      <> 
      <BrowserRouter>
        <Routes>

          <Route path='/' element = { isAuthenticated ? <HomePage/> : <Login/> } ></Route>

          <Route path='/login' element = { isAuthenticated ? <Navigate to = "/" /> : <Login/>} ></Route> 

          <Route path='/signup'  element = {  isAuthenticated ? <Navigate to = "/" /> :<SignUp/>} ></Route>

        </Routes>
      </BrowserRouter>
      </>
    )
} 


export default App ;