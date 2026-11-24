import { useState, type FC, type PropsWithChildren } from "react"
import { authContext } from './AuthContext'
import axios from "axios"
import { BASE_URL } from "../../constants/baseUrl"
import type { Order } from "../../types/order"

//! ده مش provider ده كومبوننت حاطين جواه ال provider بتاعنا اللي هو authContext.Provider وده بياخد قيم معينة علشان كده عملنا states للقيم ديه وكمان عملنا الفانكشن اللي محتاجها ال authContext.Provider
// و`PropsWithChildren` دي Type جاهزة من React بتضيف خاصية `children` للـ Props.
// أما `FC` فهي اختصار `FunctionComponent`، وبتحدد نوع الـ Component.

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem("userName"))
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))
  const [myOrders, setMyOrders] = useState<Order[]>([]);

  //! Login function ===============
  const login = (userName: string, token: string) => {

    setUserName(userName)
    setToken(token)

    localStorage.setItem("userName", userName)
    localStorage.setItem("token", token)

  }
  //! Logout function ===============
  const logout = () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("token")
    setToken(null)
    setUserName(null)
  }
  const isAuthenticated = !!token

  const MyOrders = async ()=>{
    const response = await axios.get(`${BASE_URL}/user/myOrder`,{
      headers:{Authorization: `Bearer ${token}`}
    })
    if(!response.status){
      console.log(response.data.message)
      return 
    }

    const MyOrders = response.data.data
    setMyOrders(MyOrders)
  }


  return (
    <authContext.Provider value={{ userName, token,isAuthenticated, myOrders, login, logout, MyOrders}}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider