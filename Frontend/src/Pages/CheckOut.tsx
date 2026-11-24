import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCart } from "../Context/Cart/CartContext";
import { useAuth } from "../Context/Auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";

const CheckOut = () => {
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();
  const auth = useAuth();
  const addressRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    const address = addressRef.current?.value.trim();
    if (!address) {
      setError("Please enter a delivery address");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await axios.post(
        `${BASE_URL}/cart/checkout`,
        { address },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      navigate("/success-order");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Checkout failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container sx={{ py: 4 }}>
        <Paper sx={{ p: 6, textAlign: "center", borderRadius: 2 }}>
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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Checkout
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
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
                  {item.amount} × ${item.price.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                ${(item.price * item.amount).toFixed(2)}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack
          direction="row"
          sx={{ mb: 3, justifyContent: "space-between" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Total
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            ${totalAmount.toFixed(2)}
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700 }}>
          Delivery address
        </Typography>
        <TextField
          label="Enter delivery address"
          inputRef={addressRef}
          fullWidth
          autoComplete="street-address"
          error={!!error && !addressRef.current?.value}
          onChange={() => error && setError("")}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          onClick={handleCheckout}
          disabled={loading || cartItems.length === 0}
          sx={{ textTransform: "none", fontWeight: 600, mt: 3 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
        </Button>
      </Paper>
    </Container>
  );
};

export default CheckOut;