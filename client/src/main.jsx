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
import AboutUser from './components/pages/AboutUser.jsx'
import SignupPage from "./components/pages/SignupPage.jsx"
import ContactUser from "./components/pages/ContactUser.jsx"

const router = createBrowserRouter([
  {
    path: "/user/create",
    element: <SignupPage/>,
  },
  {
    path: "/user/login",
    element: <LoginPage/>,
  },
  {
    path: "/app/user/home",
    element: <Dashboard/>,
  },
  {
    path: "/app/user/about",
    element: <AboutUser/>,
  },
  {
    path: "/app/user/contact",
    element: <ContactUser/>,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
