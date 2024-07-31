// import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Register from "./routes/Register"
import RegisterDone from "./routes/RegisterDone"
import Dashboard from "./routes/admin/Dashboard"
import { isAdmin } from "./utils/hook"

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "register",
      element: <Register />
    },
    {
      path: "register-done",
      element: <RegisterDone />
    },
    {
      path: "dashboard",
      loader: isAdmin,
      element: <Dashboard />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App