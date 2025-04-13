import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import {Login, Signup, Home, Income, Expense} from './components'
import App from './App.jsx'
import UserProvider from "./context/UserContext.jsx"

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("token"); 
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>

    <Route index element={<Navigate to="/dashboard" replace />} />

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='dashboard' element={<Home />} />
        <Route path='income' element={<Income />} />
        <Route path='expense' element={<Expense />} />
      </Route>

    </Route>
  )
);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
