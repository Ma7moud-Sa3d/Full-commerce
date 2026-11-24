import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../Context/Cart/CartContext';
import { useAuth } from '../Context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Props {
  _id: string,
  title: string,
  image: string,
  price: number
}

export default function ProductCard({ title, image, price, _id}: Props) {
  const {isAuthenticated}= useAuth()
  const {addItemToCart} = useCart()
  const navigate = useNavigate()
  const handleAddItemToCart = ()=>{
    if (!isAuthenticated){
      navigate('/login') 
    }
    addItemToCart(_id)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {price} $
        </Typography>
      </CardContent>
      <CardActions onClick={handleAddItemToCart}>
        <Button size="small" variant="contained">Add to cart</Button>
      </CardActions>
    </Card>
  );
}
