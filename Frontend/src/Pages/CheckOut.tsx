
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import { useRef } from "react";



const CheckOut = () => {
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();
  const addressRef = useRef<HTMLInputElement>(null)



  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Continue shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Checkout
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "2fr" },
          alignItems: "start",
        }}
      >

        <Paper
          elevation={3}
          sx={{ p: 3, borderRadius: 2, position: { md: "sticky" }, top: 16 }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Order summary
          </Typography>

          <Stack spacing={2}>
            {cartItems.map((item) => (
              <Stack
                key={item.productId}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: 64,
                    height: 48,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.amount} * ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ${(item.price * item.amount).toFixed(2)}
                </Typography>
              </Stack>
            ))}
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
          <Stack direction="row" sx={{
            display: "grid",
            gap: 1,
            alignItems: "start",
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Delivery Address
            </Typography>
            <TextField label="Enter Delivery Address" inputRef={addressRef} />
          </Stack>
          <Button
            variant="contained"
            color="success"
            disabled={cartItems.length === 0}
            sx={{ textTransform: "none", fontWeight: 600, marginTop: 3, width: '100%', margin: ' ' }}
          >
            Pay Now
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default CheckOut;