import { useState } from 'react'
import './App.css'
import Middle from './components/Middle'

function App() {
  const message = "Hello from parent"
  return (
    <>
    <h1>I'm parent Component</h1>
      <Middle message={message}/>
    </>
  )
}

export default App
