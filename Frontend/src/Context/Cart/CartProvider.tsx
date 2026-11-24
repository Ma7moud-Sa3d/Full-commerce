import { useEffect, useState, type FC, type PropsWithChildren } from "react"
import { CartContext } from "./CartContext"
import axios from "axios"
import { BASE_URL } from "../../constants/baseUrl"
import type { CartItem } from "../../types/CartItem"
import { useAuth } from "../Auth/AuthContext"

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const auth = useAuth()

  useEffect(()=>{
    if(!auth?.token){
      return
    }
    try {
      const fetchCart = async ()=> {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        },
        validateStatus: ()=> true
      })

      if(response.status < 200 || response.status >= 300){
        return console.log(response.data.message)
      }
      const cart = response.data.data
      const cartItemsMap = cart.items.map(
        ({ product, amount }: { product: any; amount: number }) => ({
          productId: product._id,
          price: product.price,
          image: product.image,
          amount,
          title: product.title,
        })
      );
      setCartItems(cartItemsMap)
      setTotalAmount(cart.totalAmount)

    }
    fetchCart()
    } catch (error) {
      if(axios.isAxiosError(error)){
        return console.log(error.response?.data.message || "Something wrong !")
      }else{
        return console.log("An unexpected error occurred");
      }
    }
    
  }, [auth?.token])

  const addItemToCart = async (id: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/cart/item`,
        {
          productId: id,
          amount: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
          validateStatus: () => true,
        }
      );

      if (response.status < 200 || response.status >= 300) {
        console.log(response.data.message || "Something went wrong!");
        return;
      }

      const cart = response.data.data;

      const cartItemsMap = cart.items.map(
        ({ product, amount }: { product: any; amount: number }) => ({
          productId: product._id,
          price: product.price,
          image: product.image,
          amount,
          title: product.title,
        })
      );

      setCartItems(cartItemsMap);
      setTotalAmount(cart.totalAmount);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return console.log(error.response?.data.message || "Something went wrong!");
      } else {
        return console.log("An unexpected error occurred");
      }
    }
  };

  const updateItemInCart = async(id: string, quantity: number)=>{
    try {
      const response = await axios.patch(
        `${BASE_URL}/cart/item`,
        {
          productId: id,
          amount: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
          validateStatus: () => true,
        }
      );

      if (response.status < 200 || response.status >= 300) {
        console.log(response.data.message || "Something went wrong!");
        return;
      }

      const cart = response.data.data;

      const cartItemsMap = cart.items.map(
        ({ product, amount }: { product: any; amount: number }) => ({
          productId: product._id,
          price: product.price,
          image: product.image,
          amount: amount,
          title: product.title,
        })
      );

      setCartItems(cartItemsMap);
      setTotalAmount(cart.totalAmount);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return console.log(error.response?.data.message || "Something went wrong!");
      } else {
        return console.log("An unexpected error occurred");
      }
    }
  }


  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart, updateItemInCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider