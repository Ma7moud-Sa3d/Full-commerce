import { useState, type FC, type PropsWithChildren } from "react"
import { CartContext } from "./CartContext"

const CartProvider: FC<PropsWithChildren> = ({children}) => {
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  const addItemToCart = (id: string)=>{
    console.log(id)
  }
  
  
  return (
    <CartContext.Provider value={{cartItems, totalAmount, addItemToCart}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider