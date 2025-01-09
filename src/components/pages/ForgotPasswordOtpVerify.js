import React, { useState } from 'react'
import { Typography,Container,Box,TextField, Button} from '@mui/material'
import AxiosInstance from "../api";
import { useNavigate } from "react-router-dom";
const ForgotPasswordOtpVerify = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    otp:"",

  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    let tempErrors = {};
  

    if (!formData.otp.trim()) {
      tempErrors.new_password = "Password is required";
   
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (evt)=>{
    const {name,value} = evt.target
    setFormData((prevData)=>({
        ...prevData,
        [name]:value,
    }))
  }

  console.log("formdata is ---------->", formData.otp)

  const handleSumbmit = (e) => {
    e.preventDefault();
  
    if (validate()) {
      console.log("OTP is ---------->", formData.otp);
  
      AxiosInstance.post(`core/otp-verify/`, {
        otp: formData.otp,
    })
        .then((res) => {
            console.log("Response from verify OTP is -------->", res);
            navigate(`/password-reset`);
        })
        .catch((error) => {
            console.error("Error from OTP verify is ------------->:", error);
    
            if (error.response && error.response.data) {
                // Extract backend errors and update the state
                const backendErrors = error.response.data;
                console.log("backend eroro is --------->", backendErrors)
    
                setErrors({
                    otp: backendErrors.otp ? backendErrors.otp[0] : "", // Specific field error
                    general:
                        backendErrors.detail || // General error from backend
                        backendErrors.non_field_errors ? backendErrors.non_field_errors[0] : "" || // DRF non-field errors
                        "An error occurred. Please try again.", // Fallback error
                });
            } else {
                setErrors({
                    general: "Unable to connect to the server. Please try again later.",
                });
            }
        });
    
    
    }
  };
  

  return (
    <Container>
        <Box sx={{mt:4, textAlign:'center'}}>
                    <Typography variant='h4'>
                        Enter OTP
                    </Typography>
                </Box>

        <Box component="form" onSubmit={handleSumbmit}>
        {/* General error message */}
        {errors.general && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.otp}
          </Typography>
        )}

        <TextField
          label="Enter OTP"
          name="otp"
          value={formData.otp}
          margin="normal"
          fullWidth
          error={!!errors.otp}
          onChange={handleChange}
          type="password"
          required
        />
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
  )
}

export default ForgotPasswordOtpVerify