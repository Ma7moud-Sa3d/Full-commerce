import { createContext, useContext } from "react";

interface AuthContext {
  userName: string | null,
  token: string | null,
  isAuthenticated: boolean,
  login: (userName: string, token: string)=> void,
  logout: ()=> void
}

export const authContext = createContext<AuthContext | null>(null)

export const useAuth = ()=> useContext(authContext) //? ده اللي بنستقبل منه البيانات

{/*//! طريقة كتابة افضل لل useAuth()
  export const useAuth = () => { //? ده اللي بنستقبل منه البيانات
  const context = useContext(authContext)

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    )
  }

  return context
}


//todo: لأنك لو استخدمت useAuth في Component مش موجود داخل AuthProvider، هتاخد رسالة واضحة بدل ما تفضل تتعامل مع null واحتمال ظهور أخطاء بعد كده.
*/}