import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";


const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);





mongoose.connect("mongodb+srv://kshyamal:8GjWSxPcJlI4a5U4@cluster0.bfgpdp7.mongodb.net/BlogApp?retryWrites=true&w=majority")
.then(()=>app.listen(5000))
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err)); 

