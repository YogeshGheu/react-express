import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from "./components/pages/LoginPage.jsx"
import './css/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/user/login",
    element: <LoginPage/>,
  },
  {
    path: "/app/home",
    element: <Dashboard/>,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
