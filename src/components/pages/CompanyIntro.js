import React from 'react';
import { Box, Container, Typography, Button, Grid, Link } from '@mui/material';
import { Link as navLink, useLocation } from 'react-router-dom';

const CompanyIntro = () => {
  const location = useLocation()
  const path = location.pathname

  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
      {/* Company Introduction Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Tracker
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Tracker is a leading digital transformation company offering
          a wide range of services, including cybersecurity, data analytics, 
          data migration, application services, cloud services, blockchain 
          solutions, automation, and integration. Our mission is to empower 
          businesses to embrace digital innovation and achieve sustainable growth.
        </Typography>
      </Box>

      {/* Login and Signup Links */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button component={navLink} to={'/login'} selected={'/login' === path} variant="contained" color="primary" href="/login">
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
           variant="outlined"
           color="primary"
           href="/signup"
           component={navLink}
           to={'/signup'}
           selected={'/signup' === path}
           >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyIntro;
