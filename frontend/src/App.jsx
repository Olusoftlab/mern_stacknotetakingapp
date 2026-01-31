import React from 'react'
import { Routes, Route } from "react-router"
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NotePage from './pages/NotePage'
import toast from "react-hot-toast"


const App = () => {
  return (
    <div data-theme="forest" className="bg-black" >
      <div className='absolute inset-0 -z-10 h-full w-full px-5 py-25 [background:radial-gradient(125%_125%_at_50%_10%_#000_60%,#00FF9D40_100%)]' />
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/create-page" element={<CreatePage />} />
        <Route path="/note-page/:id" element={<NotePage />} />
      </Routes>

    </div>
  )
}

export default App