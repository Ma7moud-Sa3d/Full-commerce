import { createContext, useContext } from "react";
import type { Order } from "../../types/order";

interface AuthContext {
  userName: string | null,
  token: string | null,
  isAuthenticated: boolean,
  myOrders: Order[],
  login: (userName: string, token: string)=> void,
  logout: ()=> void,
  MyOrders: () => Promise<void>;
}

export const authContext = createContext<AuthContext | null>(null)

  export const useAuth = () => { //? ده اللي بنستقبل منه البيانات
  const context = useContext(authContext)

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    )
  }

  return context
}

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