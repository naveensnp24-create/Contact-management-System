import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import ContactList from './components/ContactList.jsx'
import Dashboard from './components/Dashboard.jsx'
import Homelayout from './layout/Homelayout.jsx'
import Support from './components/Support.jsx'

// setting up the app with routing
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route element={<Homelayout />}>
          {/* main contact page */}
          <Route path='/' element={<ContactList />} /> 
          <Route path="/contact" element={<ContactList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />
          
          {/* redirect old routes */}
          <Route path="/users" element={<Navigate to="/contact" replace />} />
          <Route path="*" element={<Navigate to="/contact" replace />} />
        </Route>
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
  </BrowserRouter>
)
