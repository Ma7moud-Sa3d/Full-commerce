import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Context/Auth/AuthContext'

const ProtectedRoute = () => {
  const auth = useAuth()
  if(!auth?.isAuthenticated){
    return <Navigate to={'/login'} replace={true} />
  }
  return <Outlet />
}

export default ProtectedRoute