import { useState, type FC, type PropsWithChildren } from "react"
import { authContext } from './AuthContext'

//! ده مش provider ده كومبوننت حاطين جواه ال provider بتاعنا اللي هو authContext.Provider وده بياخد قيم معينة علشان كده عملنا states للقيم ديه وكمان عملنا الفانكشن اللي محتاجها ال authContext.Provider
// و`PropsWithChildren` دي Type جاهزة من React بتضيف خاصية `children` للـ Props.
// أما `FC` فهي اختصار `FunctionComponent`، وبتحدد نوع الـ Component.

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [userName, setUserName] = useState<string | null>(() => localStorage.getItem("userName"))
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))

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


  return (
    <authContext.Provider value={{ userName, token, login, isAuthenticated, logout }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider