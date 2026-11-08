import { Container, Grid } from "@mui/material"
import ProductCard from "../Components/ProductCard"
import { useEffect, useState } from "react"
import type { Product } from "../types/product"
import axios from "axios"
import { BASE_URL } from "../constants/baseUrl"

const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(()=>{
    const fetchProducts = async () => {
      const response = await axios.get(`${BASE_URL}/products/`,{
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhZWRiNTJkZTgxNjFmOTIxZTU5MzE1YiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzkzOTYzMzQzfQ.AIaWEiKnZl-mygYfhcQAwN95U1XAV6e_792t5_7ShyU`
        }
      })
      setProducts(response.data.data)
    }
    fetchProducts()
  },[])
  return (
      <Container>

        <Grid container
        spacing={4}
        sx={{ mt: 4, justifyContent: 'center' }}>
          {products.map((item)=>(
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ display: 'flex', justifyContent: 'center' }} key={item._id}>
            <ProductCard {...item}/>
          </Grid>
          ))}
          </Grid>
      </Container>
  )
}

export default Home