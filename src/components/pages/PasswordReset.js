import React, { useState } from 'react';
import { Typography, Container, Box, TextField, Button } from '@mui/material';
import AxiosInstance from "../api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    new_password: "",
    confirm_password: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!formData.new_password.trim()) {
      tempErrors.new_password = "Password is required";
    } else if (formData.new_password.length < 6) {
      tempErrors.new_password = "Password must be at least 6 characters long";
    }
    if (!formData.confirm_password.trim()) {
      tempErrors.confirm_password = "Confirm Password is required";
    } else if (formData.new_password !== formData.confirm_password) {
      tempErrors.confirm_password = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      AxiosInstance.post(`core/change-password/`, {
        email: formData.email,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      })
        .then((res) => {
          console.log("response from forgot password is -------->", res);
          navigate(`/`);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            const backendErrors = error.response.data;
            const tempErrors = {};

            if (backendErrors.email) {
              tempErrors.email = backendErrors.email[0]; // Assuming backend sends an array of errors per field
            }
            if (backendErrors.new_password) {
              tempErrors.new_password = backendErrors.new_password[0];
            }
            if (backendErrors.confirm_password) {
              tempErrors.confirm_password = backendErrors.confirm_password[0];
            }
            if (backendErrors.non_field_errors) {
              tempErrors.non_field_errors = backendErrors.non_field_errors[0];
            }

            setErrors(tempErrors);
          } else {
            setErrors({ non_field_errors: "An unexpected error occurred" });
          }
        });
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4">Forgot Password</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Enter Email"
          name="email"
          value={formData.email}
          margin="normal"
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          onChange={handleChange}
          type="email"
          required
        />
        <TextField
          label="New Password"
          name="new_password"
          margin="normal"
          fullWidth
          value={formData.new_password}
          error={!!errors.new_password}
          helperText={errors.new_password}
          onChange={handleChange}
          type="password"
          required
        />
        <TextField
          label="Confirm Password"
          name="confirm_password"
          margin="normal"
          fullWidth
          value={formData.confirm_password}
          error={!!errors.confirm_password}
          helperText={errors.confirm_password}
          onChange={handleChange}
          type="password"
          required
        />

        {errors.non_field_errors && (
          <Typography color="error" sx={{ mt: 1 }}>
            {errors.non_field_errors}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
