import { useState } from 'react'

import './App.css' 

import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import HomePage from './Pages/HomePage'



import {BrowserRouter, Route, Routes} from "react-router" ;


function App(){
    return (
      <> 
      <BrowserRouter>
        <Routes>

          <Route path='/' element = {<HomePage/>} ></Route>

          <Route path='/login' element = {<Login/>} ></Route> 

          <Route path='/signup'  element = {<SignUp/>} ></Route>

        </Routes>
      </BrowserRouter>
      </>
    )
} 


export default App ;