import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Typography, Box } from '@mui/material';
import AxiosInstance from "../api";
import { useEffect } from 'react';
import MySelectMenu from '../forms/MySelectMenu';
import { useNavigate } from "react-router-dom";



const AddApplication = () => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'AP',
    salary: '',
    comments: '',
  });

  const navigate = useNavigate();

  const [company, setCompany] = useState([])

  
  const getData = ()=>{
    AxiosInstance.get(`api/company`).then((res)=>{
      setCompany(res.data)
      console.log('result company data ----------->', res.data)
    }).catch(error =>{
      console.log("company error is ------------>", error)
    })
  }
  
  useEffect(()=>{
    getData()
  },[])


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("final form data is ----------->", formData)
    AxiosInstance.post(`api/applications/`, {
      company_id: formData.company,
      position: formData.position,
      status: formData.status,
      salary: formData.salary,
      comments: formData.comments,
  })
  .then(response => {
      console.log('Success:', response.data);
      navigate(`/`)
  })
  .catch(error => {
      console.error('Error:', error.response.data);
  });
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Add New Application
      </Typography>

      <TextField
        label="Position"
        name="position"
        value={formData.position}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="AP">Applied</MenuItem>
          <MenuItem value="IN">Interview</MenuItem>
          <MenuItem value="OF">Offer</MenuItem>
          <MenuItem value="RE">Rejected</MenuItem>
        </Select>
      </FormControl>

       <MySelectMenu
        options={company}
        title={'Company'}
        name="company"
        value={formData.company}
        onChange={handleChange}
       />

      <TextField
        label="Salary"
        name="salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Comments"
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />

      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 3, fontWeight: 'bold' }}
      >
        Add New Application
      </Button>
    </Box>
  );
};

export default AddApplication;
