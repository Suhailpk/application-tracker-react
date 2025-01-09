import React, { useEffect, useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import { Box, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import AxiosInstance from "../api";
import {MaterialReactTable} from 'material-react-table';
import Dayjs from 'dayjs';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ApplicationDetail = () => {
  
  const [application, setApplication] = useState()
  const [loading, setLoading] = useState(true)
   
    const getData = ()=>{
      AxiosInstance.get(`api/applications`).then((res)=>{
        console.log("application list is ---------->", res.data)
        setApplication(res.data)
        setLoading(false)
      })
    }


  useEffect(()=>{
    getData()
  },[])


  const columns = useMemo(
    () => [
      {
        accessorKey: 'position', // access nested data with dot notation
        header: 'Desigination',
        size: 150,
      },
      {
        accessorKey: 'company_name', // access nested data with dot notation
        header: 'Company',
        size: 150,
      },
      {
        accessorKey: 'status_full',
        header: 'Status',
        size: 150,
      },
      {
        accessorKey: 'salary', // normal accessorKey
        header: 'Salary',
        size: 200,
      },
      {
        accessorFn: (row)=>Dayjs(row.date_applied).format('DD-MM-YYYY'),
        header: 'Date',
        size: 150,
      },
      {
        accessorKey: 'comments', // normal accessorKey
        header: 'Comments',
        size: 200,
      },
    ],
    []
  );

  return (
    <div>
      {loading? <p>Loading Data .....</p>:
       <><Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
            padding: '20px 0',
            borderBottom: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          All Applications
        </Typography><MaterialReactTable
            columns={columns}
            data={application}
            enableRowActions
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" component={Link} to={`delete/${row.original.id}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )} /><Box sx={{ marginTop: '20px', marginLeft: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to={'/add_application'}
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
              }}
            >
              Add New Application
            </Button>
          </Box></>
      }
    </div>
  )
}

export default ApplicationDetail