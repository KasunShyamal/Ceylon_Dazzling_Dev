import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BlogDetails = () => {
  const navigate = useNavigate()
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({
   
  });
  const handleChange =(e) => {
    setInputs((prevState)  => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetails().then(data=> {
      setBlog(data.blog)
      setInputs({title:data.blog.title,description:data.blog.description,imageURL:data.blog.image})
    })
  },[id]);
  const sendRequest = async () => {
    const res =await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description
    }).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"));
  }
  return (
    <div>
      {inputs &&
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
            textAlign={'center'}>Edit Your Blog</Typography>
          <InputLabel sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel  sx={{mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
          <Button sx={{mt:2, borderRadius:4}} variant="contained" color='warning' type='submit'>Edit</Button>
        </Box>
      </form>
}
    </div>
  )
}

export default BlogDetails