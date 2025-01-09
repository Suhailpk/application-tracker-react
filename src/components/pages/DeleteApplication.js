import {React, useEffect, useState} from 'react'
import { Box, Button, Typography } from '@mui/material'
import AxiosInstance from "../api";
import {useNavigate, useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';


const Delete = () => {

  const MyParam = useParams()
  const MyId = MyParam.id

  const [myData, setMyData] = useState()
  const [loading, setLoading] = useState(true)

  const getData = ()=>{
    AxiosInstance.get(`api/applications/${MyId}`).then((res)=>{
      console.log(res.data)
      setMyData(res.data)
      setLoading(false)
    })
  }


  useEffect(()=>{
    getData()
  },[])

  const navigate = useNavigate()

  const submission = ()=>{
    AxiosInstance.delete(`api/applications/${MyId}/`).then((res)=>{
        navigate(`/application_detail`)
    })
  }



  return (
    <div>
      <>
      {loading? <p>Loading Data ......</p>:
      <div>
        {console.log("myData values are ---------->", myData.position)}
            <Box sx={{display:'flex', justifyContent:'space-between',width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
         <Typography sx={{marginLeft:'20px', color:'#fff'}}>
            Delete Application: {myData.position}
         </Typography>

      </Box>

      <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

          <Box sx={{display:'flex', justifyContent:'start', marginBottom:'40px'}}> 
              Are you sure that you want to delete this project: {myData.name}
          </Box>

          <Box sx={{width:'30%'}}>
          <Button
            variant="contained"
            onClick={submission}
            sx={{
              width: '100%',
              marginBottom: '20px',
              backgroundColor: '#D32F2F', // custom red color
              '&:hover': {
                backgroundColor: '#C62828', // darker red on hover
              },
            }}
          >
          Delete the application: {myData.position} in {myData.company_name}
        </Button>
        <Button
          variant="contained"
          component={Link} to={`/application_detail`}
          sx={{
            width: '100%',
            marginBottom: '20px',
            backgroundColor: '#388E3C', // custom green color
            '&:hover': {
              backgroundColor: '#2E7D32', // darker green on hover
            },
          }}
          
        >
          No
        </Button>
      </Box>

      </Box>
        </div>
        }
      </>
  </div>

  )
}

export default Delete