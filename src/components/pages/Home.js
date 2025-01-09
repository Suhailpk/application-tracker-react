import React from 'react';
import { Grid, Box } from '@mui/material';
import ApplicationList from './ApplicationList';
import BasicPie from './BasicPie';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Left Section: Application List */}
        <Grid item xs={12} md={6}>
          <ApplicationList sx={{ width: '100%' }} />
        </Grid>
        
        {/* Right Section: Pie Chart */}
        <Grid item xs={12} md={6}>
          <Box sx={{marginRight:'300px'}} display="flex" justifyContent="center">
            <BasicPie />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
