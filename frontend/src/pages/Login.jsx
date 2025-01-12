import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"; // استيراد مكتبة react-toastify

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.data.token);
        toast.success("You have successfully logged in!");
        navigate("/capsules");
      } else {
        throw new Error("Email already exists or an error occurred.");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login{" "}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            label="e-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="rtl"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="rtl"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 2 }}
            fullWidth
          >
            Login
          </Button>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          <Button
            component={Link}
            to="/register"
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Create a new account
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
