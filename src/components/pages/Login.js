import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import AxiosInstance from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // For both field-specific and general errors

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear field-specific error on change
      general: "", // Clear general error on input
    }));
  };

  const submission = (e) => {
    e.preventDefault();

    AxiosInstance.post(`auth/jwt/create/`, {
      username: formData.username,
      password: formData.password,
    })
      .then((res) => {
        console.log("Response:", res);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate(`/`);
      })
      .catch((error) => {
        console.error("Error:", error);

        if (error.response && error.response.data) {
          // Handle backend errors
          const backendErrors = error.response.data;
          setErrors({
            username: backendErrors.username || "",
            password: backendErrors.password || "",
            general:
              backendErrors.detail || // JWT authentication errors
              backendErrors.non_field_errors || // Django Rest Framework non-field errors
              "An error occurred. Please try again.", // Fallback error
          });
        } else {
          setErrors({
            general: "Unable to connect to the server. Please try again later.",
          });
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Log in into your account
        </Typography>
      </Box>

      <Box component="form" onSubmit={submission} noValidate sx={{ mt: 2 }}>
        {/* General error message */}
        {errors.general && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.general}
          </Typography>
        )}

        <TextField
          label="User Name"
          name="username"
          margin="normal"
          fullWidth
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          type="text"
          required
        />

        <TextField
          label="Password"
          name="password"
          margin="normal"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          type="password"
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          Login
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/otp-request" variant="body2">
              Forgot Password?
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/signup" variant="body2">
              Not have an account? Sign up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
