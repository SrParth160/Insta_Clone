require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express()
const { connectDB } = require("./db/dbConnect");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const uRoutes = require("./routes/user")
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: ['http://localhost:3000'].filter(Boolean),
  credentials: true
}));
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 6000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/post",postRoutes);
// app.get("/user",uRoutes)

//DB connect
connectDB();

//server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});