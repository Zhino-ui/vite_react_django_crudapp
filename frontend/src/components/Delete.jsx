import {React,useState, useEffect} from 'react'
import { Box,Button,Typography } from '@mui/material'
import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'

const Delete = () => {
  const MyParam =useParams()
  const MyId = MyParam.id

  const [myData, setMyData] = useState()
  const [loading, setLoading] = useState(true)
  
  const GetData = ()=>{
    AxiosInstance.get(`project/${MyId}`).then((res)=>{
      setMyData(res.data)
      console.log(res.data);
      setLoading(false)
      
    })
  }

  useEffect(()=>{
    GetData();
    
  },[])

  const navigate = useNavigate()
  
  const submission = async (data) => {
    
    try {
      const response = await AxiosInstance.delete(`project/${MyId}/`);
      navigate(`/`)
    } catch (error) {
      console.error('Error occurred:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <div>
      {loading ? <p>Loading data...</p> :
      <div>
        <Box sx={{display:'flex', justifyContent:'space-between', width:'100%', backgroundColor:'#000035', marginBottom:'10px'}}>
          <Typography sx={{marginLeft:'20px', color:'#fff'}}>
            Delete Project: {myData.name}
          </Typography>
        </Box>
        <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

          <Box sx={{display:'flex', justifyContent:'start', marginBottom:'40px'}}>
            Are you sure that you want to delete: {myData.name}
          </Box>
          <Box sx={{width:'30%'}}>
            <Button variant='contained' onClick={submission} sx={{width:'100%'}} >Delete</Button>
          </Box>
        </Box>
      </div>
}
    </div>
  )
}

export default Delete;
