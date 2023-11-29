import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title,description,imageURL,userName,isUser,id}) => {
  console.log(id);

  const navigate = useNavigate();
  const handleEdit =(e)=> {
    navigate(`/myBlogs/${id}`)
  }
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  const handleDelete = (e) => {
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"));
  }
  return (
    <Card sx={{ width: "40%", margin:"auto",mt:10,padding:2,boxShadow: "5px 5px 10px #ccc",":hover:":{
        boxShadow:"10px 10px 20px #ccc"
    }}}>

      {isUser && (
        <Box display="flex">
          <IconButton onClick={handleEdit} sx={{marginLeft: "auto"}}><EditIcon /></IconButton>
          <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>
        </Box>
      )}
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
          {userName}
        </Avatar>
      }
      
      title={title}
      
    />
    <CardMedia
      component="img"
      height="194"
      image={imageURL}
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        Author:{userName} <br/>{description}
      </Typography>
    </CardContent>

  </Card>
  )
}

export default Blog