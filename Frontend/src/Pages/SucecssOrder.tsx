import { Box, Container, SvgIcon, Typography } from "@mui/material";

const SucecssOrder = () => {
  return (
    <Container
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <SvgIcon
        color="success"
        sx={{ fontSize: { xs: 96, sm: 128 } }}
      >
        <path
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m8 12 2.5 2.5L16.5 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </SvgIcon>

      <Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
        Order placed successfully
      </Typography>

      <Box sx={{ maxWidth: 420 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Thank you for your purchase. We'll get your order ready right away.
        </Typography>
      </Box>
    </Container>
  );
};

export default SucecssOrder;