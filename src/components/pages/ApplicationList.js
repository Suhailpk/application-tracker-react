import React, { useEffect, useState } from 'react';
import AxiosInstance from "../api";
import { List, ListItem, ListItemText, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ApplicationList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const appResponse = await AxiosInstance.get(`api/applications`);
      console.log("app reponse ------>", appResponse.data);
      setData(appResponse.data);
      setLoading(false);
    } catch (error) {
      console.log('error in fetching data ------->', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle "Show All" button click
  const handleShowAll = () => {
    navigate('/application_detail'); // Replace with your desired route
  };

  const handleStatusColor = (status) => {
    switch (status) {
      case "AP":
        return '#9c27b0';
      case "IN":
        return 'orange';
      case "OF":
        return 'green';
      case "RE":
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading data ..........</p>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 4 }}>
          <Box
            sx={{
              width: '70%',
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: '#fff',
              mr: 2, // Add some spacing to the right
            }}
          >
            <Typography variant="h5" gutterBottom>
              Recent Application
            </Typography>

            {/* If no applications */}
            {data.length === 0 ? (
              <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
                It looks like there are no recent applications yet.
                <br />
                Ready to add a new one? 
                <Link
                  href='/add_application'
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    ml: 1,
                    textDecoration: 'none'
                  }}
                >
                  Click here to get started.
                </Link>
              </Typography>
            ) : (
              // Display the list of applications
              <>
                    <List >
                      {data.slice(0, 8).map((item) => (
                        <ListItem key={item.id} divider>
                          <ListItemText primary={item.company_name} secondary={item.position} />
                          <Typography sx={{ color: handleStatusColor(item.status) }}>
                            {item.status_full}
                          </Typography>
                        </ListItem>
                      ))}
                    </List><Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 3 }}
                      onClick={handleShowAll}
                    >
                      Show All
                    </Button></>
            )}

          </Box>
        </Box>
      )}
    </div>
  );
};

export default ApplicationList;
