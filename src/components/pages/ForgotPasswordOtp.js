import React, { useState } from 'react'
import { Typography,Container,Box,TextField, Button} from '@mui/material'
import AxiosInstance from "../api";
import { useNavigate } from "react-router-dom";
const ForgotPasswordOtp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    let tempErrors = {};
  
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
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

  console.log("formdata is ---------->", formData.email)

  const handleSumbmit = (e)=>{
    e.preventDefault();

    if (validate()){

        console.log("email is is ---------->", formData.email)
        AxiosInstance.post(`core/otp-request/`,{
            email:formData.email,
        }).then((res)=>{
            console.log("response from forgot password is -------->", res)
            navigate(`/otp-verify`)
        }).catch((error) =>{
          console.log("error of otp request -------->", error)
          if (error.response && error.response.data) {
            // Extract backend errors and update the state
            const backendErrors = error.response.data;
            console.log("backend eroro is --------->", backendErrors)

            setErrors({
                email: backendErrors.email ? backendErrors.email[0] : "", // Specific field error
                general:
                    backendErrors.detail || // General error from backend
                    backendErrors.non_field_errors ? backendErrors.non_field_errors[0] : "" || // DRF non-field errors
                    "An error occurred. Please try again.", // Fallback error
            });
          }else {
            setErrors({
                general: "Unable to connect to the server. Please try again later.",
            });
        }


        })
    }


  }

  return (
    <Container>
        <Box sx={{mt:4, textAlign:'center'}}>
            <Typography variant='h4'>
                Forgot Password
            </Typography>
        </Box>

        <Box component="form" onSubmit={handleSumbmit}>

             {/* General error message */}
              {errors.general && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {errors.email}
                </Typography>
              )}

            <TextField
            label="Enter Email"
            name="email"
            value={formData.email}
            margin="normal"
            fullWidth
            error={!!errors.email}
            onChange={handleChange}
            type="email"
            required
            />
            <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{mt:2 , mb:2}}
            >
            Submit
            </Button>

        </Box>
    </Container>
  )
}

export default ForgotPasswordOtp