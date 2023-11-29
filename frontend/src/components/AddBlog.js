import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate =  useNavigate();
  const [inputs, setInputs] = useState({
    title:"", description:"", imageURL:""
  });

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/blog/add", {
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  const handleChange =(e) => {
    setInputs((prevState)  => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>navigate("/myBlogs/"));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          border={3} 
          borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(77,157,232,1) 31%, rgba(0,212,255,1) 100%);" 
          borderRadius={10} 
          boxShadow="10px 10px 20px #ccc" 
          padding={3} 
          margin={"auto"} 
          display='flex' 
          flexDirection={'column'} 
          width={"80%"} 
          marginTop={10}>

          <Typography 
            fontWeight={'bold'} 
            padding={3} 
            color={'gray'}
            variant='h2'
            textAlign={'center'}>Create Your Blog</Typography>
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel  sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>ImageURL</InputLabel>
          <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='auto' variant='outlined'/>
          <Button sx={{mt:2, borderRadius:4}} variant="contained" color='warning' type='submit'>Create</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog