import {React,useState, useEffect} from 'react'
import { Box,Button,Typography } from '@mui/material'
import MyDatePickerField from './forms/MyDatePickerField'
import MyMultilineField from './forms/MyMultilineField'
import MySelectField from './forms/MySelectField'
import MyTextField from './forms/MyTextField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'
import MyMultiSelectField from './forms/MyMultiSelectField'

const Edit = () => {
  const MyParam =useParams()
  const MyId = MyParam.id

  const [projectmanager, setprojectmanager] = useState()
  const [employees, setEmployees] = useState()
  const [loading, setLoading] = useState(true)

  const hardcoded_options = [
    {id:'',name:'None'},
    {id:'Open',name:'Open'},
    {id:'In Progress',name:'In Progress'},
    {id:'Completed',name:'Completed'}
  ]
  

  const GetData = ()=>{
    AxiosInstance.get(`projectmanager/`).then((res)=>{
      setprojectmanager(res.data)
      console.log(res.data);
    })

    AxiosInstance.get(`employees/`).then((res)=>{
      setEmployees(res.data)
      console.log(res.data);
        
      })
      

    AxiosInstance.get(`project/${MyId}`).then((res)=>{
      console.log(res.data);
      setValue('name',res.data.name)
      setValue('status',res.data.status)
      setValue('status',res.data.employees)
      setValue('projectmanager',res.data.projectmanager)
      setValue('comments',res.data.comments)
      setValue('start_date',Dayjs(res.data.start_date))
      setValue('end_date',Dayjs(res.data.end_date))
      setLoading(false)
    })
  }

  useEffect(()=>{
    GetData();
    
  },[])

  const navigate = useNavigate()

  const defaultValues = {
    name: '',
    comments:'',
    status:'',
  }
  const {handleSubmit,setValue, control } = useForm({defaultValues:defaultValues})
  
  const submission = async (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");
    
    try {
      const response = await AxiosInstance.put(`project/${MyId}/`, {
        name: data.name,
        projectmanager: data.projectmanager,
        status: data.status,
        employees: data.employees,
        comments: data.comments,
        start_date: StartDate,
        end_date: EndDate,
      });
      console.log('Success:', response.data);
      navigate(`/`)
    } catch (error) {
      console.error('Error occurred:', error.response ? error.response.data : error.message);
    }
  }

  return (
    <div>
      {loading ? <p>Loading data...</p> :
      <form onSubmit={handleSubmit(submission)}>
        <Box sx={{display:'flex',justifyContent:'space-between', width:'100%', backgroundColor:'#000035', marginBottom:'10px'}}>
          <Typography sx={{marginLeft:'20px', color:'#fff'}}>
            Edit Project
          </Typography>
        </Box>
        <Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>
          <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'40px'}}>
            <MyTextField 
              label="Name"
              name="name"
              control={control}
              placeholder="Provide a project name"
              width ={'30%'}
            />
            <MyDatePickerField
              label="Start date"
              name="start_date"
              control={control}
              width={'30%'}
            />
            <MyDatePickerField
              label="end date"
              name="end_date"
              control={control}
              width={'30%'}
            />
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-around'}}>
            <MyMultilineField 
                label="comments"
                name="comments"
                control={control}
                placeholder="Provide a project comments"
                width ={'30%'}
              />
              <MySelectField
                label="status"
                name="status"
                control={control}
                width={'30%'}
                options={hardcoded_options}
              />
              <MySelectField
                label="Project Manager"
                name="projectmanager"
                control={control}
                width={'30%'}
                options={projectmanager}
              />
              
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-around', marginTop:'40px'}}>
            <MyMultiSelectField
              label="Employees"
              name="employees"
              control={control}
              width={'30%'}
              options={employees}
              />
          </Box>
          <Box sx={{display:'flex', justifyContent:'space-around', marginTop:'40px'}}>
                <Button variant='contained' type="submit" sx={{width:'30%'}}>Submit</Button>

          </Box>
        </Box>
      </form>}
    </div>
  )
}

export default Edit;
