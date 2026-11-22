
import { SkipPreviousSharp } from "@mui/icons-material";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../Context/Auth/AuthContext";

export default function Register() {

  const [error, setError] = useState("")
  const navigate = useNavigate();
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lasttNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const auth = useAuth()


  const onSubmit = async () => {
    try {
      const firstName = firstNameRef.current?.value;
      const lastName = lasttNameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (!firstName || !lastName || !email || !password) {
        setError("All fields required please!")
        return
      }

      //! Call the API ======================
      const response = await axios.post(
        `${BASE_URL}/user/register`,
        {
          firstName,
          lastName,
          email,
          password
        },
        { validateStatus: () => true }
      );

      //! get the token from response ================
      const token = response.data.data
      if (!token) {
        setError("No token exist!")
        return
      }
      //! set the token to login direct ===========
      auth?.login(email, token);
      navigate('/')

    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Something went wrong"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  };



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <SkipPreviousSharp onClick={() => navigate("/")} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
          Register
        </Typography>

        <Typography color="text.secondary">
          Create your account
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField inputRef={firstNameRef} label="First Name" fullWidth />

          <TextField inputRef={lasttNameRef} label="Last Name" fullWidth />

          <TextField inputRef={emailRef} label="Email" type="email" fullWidth />

          <TextField inputRef={passwordRef} label="Password" type="password" fullWidth />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ py: 1.5, textTransform: "none" }}
            onClick={onSubmit}
          >
            Create Account
          </Button>
          {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
}

// {
//   "firstName": "Mahmoud",
//   "lastName": "Saad",
//   "email": "   ms@gmail.com",
//   "password": "M123456@"
// }
