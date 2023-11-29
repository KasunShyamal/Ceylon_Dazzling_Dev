import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn);
  return <React.Fragment>  
   <header>
    <Header/>
   </header>
   <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/myBlogs" element={<UserBlogs/>} />
        <Route path="/myBlogs/:id" element={<BlogDetails/>} />
        <Route path="/blogs/add" element={<AddBlog/>} />
      </Routes>
   </main>

  </React.Fragment>
}

export default App;
