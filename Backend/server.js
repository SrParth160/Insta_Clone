const http = require("http");
const express = require("express");
const { connectDB } = require("./db/dbConnect");

//DB connect
connectDB();

//server
http.createServer(app).listen(process.env.PORT, () => {
  console.log("server started scuucess on 1310"); 
});