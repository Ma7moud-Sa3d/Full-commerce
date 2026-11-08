import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Home from "./Pages/Home"
import Cart from "./Pages/Cart"
import Login from "./Pages/Login"
import Register from "./Pages/Register"


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )

}
const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route >
      {/*//! ======== Layout routes ============ */}
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      {/*//! ======== another routes ============ */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  ))
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App