import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useCart } from "../Context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems, totalAmount, updateItemInCart, removeItemInCart, clearCart } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    updateItemInCart(productId, quantity)
  }
  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId)
  }


  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        My Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty <span onClick={()=> navigate('/')} style={{ color: "blue", textDecoration: 'underLine', cursor: 'pointer'}}>Go Shoping</span>
          </Typography>
        </Paper>
      ) : (
        <Box>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              alignItems: "start",
            }}
          >
            {/*//! Items */}
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Card
                  key={item.productId}
                  elevation={2}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                    p: 1.5,
                    gap: 2,
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      width: { xs: 90, sm: 140 },
                      height: { xs: 70, sm: 95 },
                      objectFit: "cover",
                      borderRadius: 1.5,
                    }}
                  />

                  <Box sx={{ flexGrow: 1, minWidth: 140 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price.toFixed(2)} EGY
                    </Typography>

                    {/*//! Quantity controls + - buttons */}
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mt: 1, alignItems: "center" }}
                    >
                      {/*//! Minus  */}
                      <IconButton
                        size="small"
                        aria-label="decrease quantity"
                        disabled={item.amount <= 1}
                        sx={{ border: 1, borderColor: "divider" }}
                        onClick={() => handleQuantity(item.productId, item.amount - 1)}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      {/*//! Amount  */}
                      <Typography
                        sx={{ minWidth: 32, textAlign: "center", fontWeight: 600 }}
                      >
                        {item.amount}
                      </Typography>

                      {/*//! Plus  */}
                      <IconButton
                        size="small"
                        aria-label="increase quantity"
                        sx={{ border: 1, borderColor: "divider" }}
                        onClick={() => handleQuantity(item.productId, item.amount + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>

                  <Stack spacing={1} sx={{ alignItems: "flex-end", pr: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      ${(item.price * item.amount).toFixed(2)}
                    </Typography>
                    <IconButton
                      color="error"
                      aria-label="remove item"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Card>
              ))}
            </Stack>

            {/*//! Summary */}
            <Paper
              elevation={3}
              sx={{ p: 3, borderRadius: 2, position: { md: "sticky" }, top: 16 }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Order Summary
              </Typography>

              <Stack direction="row" sx={{ mb: 1, justifyContent: "space-between" }}>
                <Typography color="text.secondary">Items</Typography>
                <Typography>
                  {cartItems.reduce((sum, i) => sum + i.amount, 0)}
                </Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" sx={{ mb: 3, justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Stack>

              <Button variant="contained" fullWidth size="large" onClick={()=> navigate('/checkout')}>
                Proceed to Checkout
              </Button>
            </Paper>
          </Box>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={clearCart}
            disabled={cartItems.length === 0}
            sx={{ textTransform: "none", fontWeight: 600, marginTop: 3 }}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;

