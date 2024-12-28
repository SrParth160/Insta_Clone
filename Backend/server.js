require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express()
const { connectDB } = require("./db/dbConnect");

//DB connect
connectDB();

//server
http.createServer(app).listen(process.env.PORT, () => {
  console.log("server started scuucess on port"+ process.env.PORT); 
});