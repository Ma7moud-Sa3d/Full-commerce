import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContext{
  cartItems: CartItem[],
  totalAmount: number,
  addItemToCart: (id: string)=> void
}

export const CartContext = createContext<CartContext | null>(null)

export const useCart = ()=>{
  const context = useContext(CartContext)
  if(!context){
    return
  }
  return context
}