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
import { toast } from "react-toastify";

const Register = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.data.token);
        toast.success("Account registered successfully!");
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
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create a new account
          </Typography>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <TextField
            label="UserName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            dir="rtl"
            sx={{ mb: 2 }}
          />
          <TextField
            label="e-mail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="rtl"
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            sx={{ mt: 2, mb: 2 }}
            fullWidth
          >
            Register
          </Button>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>
          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Back to login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
