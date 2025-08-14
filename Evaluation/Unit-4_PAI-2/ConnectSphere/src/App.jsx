import React from "react"
import './App.css'
import Header from './components/Header'
import UserList from './components/UserList'
import {Routes, Route} from "react-router-dom"
import UserDetail from './components/UserDetail'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<UserList/>}/>
        <Route path="/users/:userId" element={<UserDetail/>}/>
      </Routes>
    </>
  )
}

export default App
