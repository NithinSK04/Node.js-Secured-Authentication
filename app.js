require("dotenv").config();
require("./database/").connect();
const express = require("express");
const cookies = require("cookie-parser");

//Routes
const authRoutes = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");

//Configs
const app = express();
app.use(express.json());
app.use(cookies());

//routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoute);

module.exports = app;
