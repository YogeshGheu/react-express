import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from "./components/pages/LoginPage.jsx"
import './css/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"
import Dashboard from './components/pages/Dashboard.jsx'
import AboutUser from './components/pages/AboutUser.jsx'
import SignupPage from "./components/pages/SignupPage.jsx"
import ContactUser from "./components/pages/ContactUser.jsx"
import AddProduct from './components/pages/AddProduct.jsx'
import PublicDashboard from './components/pages/PublicDashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicDashboard />,
  },
  {
    path: "/user/create",
    element: <SignupPage />,
  },
  {
    path: "/user/login",
    element: <LoginPage />,
  },
  {
    path: "/app/user/home",
    element: <Dashboard />,
  },
  {
    path: "/app/user/add-product",
    element: <AddProduct />,
  },
  {
    path: "/app/user/about",
    element: <AboutUser />,
  },
  {
    path: "/app/user/contact",
    element: <ContactUser />,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  
)
