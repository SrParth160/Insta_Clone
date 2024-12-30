require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express()
const { connectDB } = require("./db/dbConnect");
const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);

//DB connect
connectDB();

//server
http.createServer(app).listen(process.env.PORT, () => {
  console.log("server started scucess on port "+ process.env.PORT);
});
