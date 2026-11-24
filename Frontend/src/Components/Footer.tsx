import { Box, Container, Divider, IconButton, Link, Stack, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const links = [
    { label: "Home", path: "/" },
    ...(auth?.isAuthenticated
      ? [
          { label: "Cart", path: "/cart" },
          { label: "My Orders", path: "/my-orders" },
        ]
      : [{ label: "Login", path: "/login" }]),
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "#fafafa",
        mt: "20px",
        pt: 5,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
          }}
        >
          {/* Brand */}
          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1.5, alignItems: "center" }}>
              <AdbIcon />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".03rem",
                }}
              >
                Full-commerce
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 360 }}>
              A full-stack e-commerce app built with React, Node.js, Express and
              MongoDB.
            </Typography>
          </Box>

          {/* Quick links */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 700 }}>
              Quick links
            </Typography>
            <Stack spacing={1}>
              {links.map((link) => (
                <Link
                  key={link.path}
                  component="button"
                  underline="hover"
                  onClick={() => navigate(link.path)}
                  sx={{
                    color: "inherit",
                    opacity: 0.85,
                    textAlign: "left",
                    width: "fit-content",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Social */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 700 }}>
              Connect
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                component="a"
                href="https://github.com/Ma7moud-Sa3d/Full-commerce"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                sx={{ color: "inherit", border: 1, borderColor: "rgba(255,255,255,0.4)" }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/YOUR-PROFILE"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                sx={{ color: "inherit", border: 1, borderColor: "rgba(255,255,255,0.4)" }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

        <Typography variant="body2" sx={{ opacity: 0.8, textAlign: "center" }}>
          © {new Date().getFullYear()} Full-commerce. Built by Mahmoud Saad.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;