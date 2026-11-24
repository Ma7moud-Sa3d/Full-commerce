import { useEffect } from "react";
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useAuth } from "../Context/Auth/AuthContext";


const MyOrders = () => {
  const { MyOrders, myOrders, token } = useAuth();

  useEffect(() => {
    if (token) MyOrders();
  }, [token]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        My Orders
      </Typography>

      {myOrders.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: "center", borderRadius: 2 }}>
          <ReceiptLongOutlinedIcon
            sx={{ fontSize: 56, color: "text.disabled", mb: 1 }}
          />
          <Typography variant="h6" color="text.secondary">
            You haven't placed any orders yet
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {myOrders.map((order, index) => {
            const itemsCount = order.orderItems.reduce(
              (sum, i) => sum + i.quantity,
              0
            );

            return (
              <Paper
                key={order._id || index}
                elevation={2}
                sx={{ borderRadius: 2, overflow: "hidden" }}
              >
                {/* Header */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{
                    p: 2,
                    bgcolor: "action.hover",
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Order
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      #{order._id.slice(-8).toUpperCase()}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Chip
                      size="small"
                      label={`${itemsCount} ${itemsCount === 1 ? "item" : "items"
                        }`}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      ${order.totla.toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>

                <Divider />

                {/* Items */}
                <Stack spacing={2} sx={{ p: 2 }}>
                  {order.orderItems.map((item) => (
                    <Stack
                      key={item._id}
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: "center" }}
                    >
                      <Box
                        component="img"
                        src={item.productImage}
                        alt={item.productTitle}
                        sx={{
                          width: { xs: 72, sm: 96 },
                          height: { xs: 54, sm: 70 },
                          objectFit: "cover",
                          borderRadius: 1.5,
                        }}
                      />

                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600 }} noWrap>
                          {item.productTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.quantity} × ${item.productPrice.toFixed(2)}
                        </Typography>
                      </Box>

                      <Typography sx={{ fontWeight: 600 }}>
                        ${(item.productPrice * item.quantity).toFixed(2)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Divider />

                {/* Address */}
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ p: 2, alignItems: "center" }}
                >
                  <LocationOnOutlinedIcon
                    fontSize="small"
                    color="action"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {order.address}
                  </Typography>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}
    </Container>
  );
};

export default MyOrders;