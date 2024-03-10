require("dotenv").config();
require("./database/").connect();
const fileUpload = require("express-fileupload");
const express = require("express");
const cookies = require("cookie-parser");

//Routes
const authRoutes = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
const playgroundRoute = require("./routes/playgroud");
const imageUploadRoute = require("./routes/uploads");

//Configs
const app = express();
app.use(express.json());
app.use(cookies());

//middleware
app.use(express.json());
//using express to upload files

//Directory is created only when request is being made. After the request is resolved the temporary file gets removed off
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoute);
app.use("/playground", playgroundRoute);
app.use("/uploads", imageUploadRoute);

module.exports = app;