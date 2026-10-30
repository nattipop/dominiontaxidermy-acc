import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Clients from './Clients'
import AddClient from './AddClient'
import './App.css'
import { Link } from "react-router-dom";

const loading_img = "https://res.cloudinary.com/dawteptkh/image/upload/v1745682273/Dominiontaxidermy/loading.gif"

function App() {
  return (
    <div id="homepage">
      <div id="menu">
        <img id="logo" src="https://res.cloudinary.com/dawteptkh/image/upload/v1745682273/Dominiontaxidermy/DTwhitecircle_cen486.png" alt="logo" />
        <div id="nav">
          <ul>
            <li>
              <Link to="/"><h2>Clients</h2></Link>
            </li>
            <li>
              <Link to="/add-client"><h2>Add Client</h2></Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={
            <React.Suspense fallback={<img className="loading" src={loading_img} />}>
              <Clients />
            </React.Suspense>
          } />
          <Route path="/add-client" element={
            <React.Suspense fallback={<img className="loading" src={loading_img} />}>
              <AddClient />
            </React.Suspense>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App
