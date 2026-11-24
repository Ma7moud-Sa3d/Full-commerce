import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Home from "./Pages/Home"
import Cart from "./Pages/Cart"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import AuthProvider from "./Context/Auth/AuthProvider"
import ProtectedRoute from "./Components/ProtectedRoute"
import CartProvider from "./Context/Cart/CartProvider"
import CheckOut from "./Pages/CheckOut"
import SucecssOrder from "./Pages/SucecssOrder"


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
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/*//! ======== protected routes ============ */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/success-order" element={<SucecssOrder />} />
        </Route>
      </Route>
      {/*//! ======== another routes ============ */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  ))
  return (
    <AuthProvider >
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  )
}

export default App