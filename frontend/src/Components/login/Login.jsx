import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Divider,
  Typography,
  Box,
  Link,
  Alert,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { loginUser, registerUser } from "../../services/authService";
import { useNavigate } from "react-router";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 

const Login = ({ open, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (isRegister && password !== confirmPass) {
      setError("Passwords don't match");
      return;
    }

    try {
      const data = isRegister
        ? await registerUser(email, password)
        : await loginUser(email, password);

      setSuccess(data.message);

      if (!isRegister) {
        console.log("Logged in user:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
  console.log('✅ Google Login Response:', credentialResponse);

  if (!credentialResponse.credential) {
    setError('No credential returned from Google');
    return;
  }

  try {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('✅ Decoded Google User:', decoded);

    const { email, name, sub: googleId } = decoded;

    const res = await fetch('http://localhost:5000/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, googleId }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    console.error('❌ Google Login Error:', err);
    setError('Google login failed');
  }
};

  // const handleGoogleSuccess = async (credentialResponse) => {
  //   try {
  //     const decoded = jwtDecode(credentialResponse.credential);
  //     const { email, name, sub: googleId } = decoded;

  //     const res = await fetch('http://localhost:5000/api/auth/google-login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, name, googleId }),
  //     });

  //     const data = await res.json();
  //     if (res.ok) {
  //       localStorage.setItem('user', JSON.stringify(data.user));
  //       localStorage.setItem('token', data.token);
  //       navigate('/dashboard');
  //     } else {
  //       setError(data.message || 'Login failed');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setError('Google login failed');
  //   }
  // };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {isRegister ? "Create Your Account" : "Choose Sign In Method"}
      </DialogTitle>
      <DialogContent>
        {!isRegister && (
          <>
            <GoogleLogin
             onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Sign In Failed')}
              fullWidth
              variant="contained"
              startIcon={<MailOutlineIcon />}
              sx={{ mb: 2, backgroundColor: "#1976d2" }}
            >
              Sign in with Google
            </GoogleLogin>
            <Divider sx={{ my: 2 }}>OR CONTINUE WITH</Divider>
          </>
        )}

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {isRegister && (
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              fullWidth
            />
          )}
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            {isRegister ? "Register" : "Sign in with Password"}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}

        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link component="button" onClick={toggleMode}>
              {isRegister ? "Login" : "Register"}
            </Link>
          </Typography>
        </Box>

        {!isRegister && (
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            mt={3}
            color="text.secondary"
          >
            For support, contact your system administrator
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Login;
