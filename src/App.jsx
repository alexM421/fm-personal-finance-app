import React from 'react'
import { Route, Routes } from "react-router-dom"

import './App.css'

import AuthLayout from './components/AuthLayout'
import Login from './components/Login'
import SignUp from './components/SignUp'
import HomeLayout from './components/HomeLayout'
import Transactions from './components/Transactions'
import Pots from './components/Pots'
import RecurringBills from './components/RecurringBills'



function App() {

  return (
  <Routes>
    <Route path="/" element={<AuthLayout/>}>
      <Route index element={<Login/>}/>
      <Route path="sign-up" element={<SignUp/>}/>
    </Route>
    <Route path="/home" element={<HomeLayout/>}>
      <Route path="overview" element={<h1>Overview</h1>}/>
      <Route path="transactions" element={<Transactions/>}/>
      <Route path="budgets" element={<h1>Budgets</h1>}/>
      <Route path="pots" element={<Pots/>}/>
      <Route path="bills" element={<RecurringBills/>}/>
    </Route>
  </Routes>
  )
}

export default App
