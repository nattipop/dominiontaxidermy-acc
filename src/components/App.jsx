import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Clients from './Clients'
import AddClient from './AddClient'
import SeeClient from './SeeClient'
import SeeFile from './SeeFile'
import '../styles/App.css'
import { Link } from "react-router-dom";

const loading_img = "https://res.cloudinary.com/dawteptkh/image/upload/v1745682273/Dominiontaxidermy/loading.gif"

function App() {
  return (
    <div id="homepage">
      <div id="menu">
        <img id="logo" src="https://res.cloudinary.com/dawteptkh/image/upload/v1745682273/Dominiontaxidermy/DTwhitecircle_cen486.png" alt="logo" />
        <div id="nav">
            <Link to="/"><h2>Clients</h2></Link>
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
          <Route path="/client/:id" element={
            <React.Suspense fallback={<img className="loading" src={loading_img} />}>
              <SeeClient />
            </React.Suspense>
          } />
          <Route path="/file/:date" element={
            <React.Suspense fallback={<img className="loading" src={loading_img} />}>
              <SeeFile />
            </React.Suspense>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App
