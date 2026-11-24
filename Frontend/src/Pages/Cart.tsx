import { Box, Container, Typography } from "@mui/material"
import { useCart } from "../Context/Cart/CartContext"

const Cart = () => {
  const cartA = useCart()

  return (
    <Container>
      <Typography variant="h3" sx={{pt: '8px'}}>
        My Cart
      </Typography>
    {
      cartA.cartItems.map((item)=>(
        <Box key={item.productId}>
          {item.title}
        </Box>
      ))
    }
    </Container>
  );

}

export default Cart


//! another logic =====================
{/**

  import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../constants/baseUrl"
import { useAuth } from "../Context/Auth/AuthContext"

    const auth = useAuth()
  const [cart, setCart]= useState()
  const [error, setError] = useState("")
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
        setError(response.data.message)
      }

      console.log(response.data.message,"\n", response.data.data)
      setCart(response.data.data)

    }
    fetchCart()
    } catch (error) {
      if(axios.isAxiosError(error)){
        setError(error.response?.data.message || "Something wrong !")
      }else{
        setError("An unexpected error occurred");
      }
    }
    
  }, [auth?.token])
  */}
