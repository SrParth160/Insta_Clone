require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express()
const { connectDB } = require("./db/dbConnect");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
  
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 6000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("api/post",postRoutes);

//DB connect
connectDB();

//server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});