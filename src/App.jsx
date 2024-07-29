// import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import Register from "./routes/Register"
import RegisterDone from "./routes/RegisterDone"

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
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App