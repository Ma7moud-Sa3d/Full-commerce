import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContext{
  cartItems: CartItem[],
  totalAmount: number,
  addItemToCart: (id: string)=> void
  updateItemInCart: (productId: string, quantity: number)=> void
}

export const CartContext = createContext<CartContext | null>(null)

export const useCart = ()=>{
  const context = useContext(CartContext)
  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider"
    )
  }
  return context
}