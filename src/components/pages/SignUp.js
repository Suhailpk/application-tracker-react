import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Alert,
} from "@mui/material";
import AxiosInstance from "../api";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!formData.username.trim()) {
      tempErrors.username = "Full Name is required";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!formData.password.trim()) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Submit form data (e.g., API call)
      AxiosInstance.post(`auth/users/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
        .then((res) => {
          console.log("setError before backend --------->", errors);
          navigate("/login");
        })
        .catch((error) => {
          console.log("backend error res---------->", error.response);
          console.log("backend error res data---------->", error.response.data);
          if (error.response && error.response.data) {
            setErrors(error.response.data);
          } else {
            // Handle unexpected errors with a general message
            setErrors({
              general: "An unexpected error occurred. Please try again.",
            });
          }
        });
      console.log("User signed up:", formData);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Create an account
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        {errors.general && (
          <Typography color="error" variant="body2">
            {errors.general}
          </Typography>
        )}

        <TextField
          margin="normal"
          fullWidth
          label="User Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          type="text"
          required
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          type="email"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
          type="password"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
          type="password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          Sign Up
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Log in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignupPage;
