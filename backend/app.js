const express = require("express");
const cors = require("cors")

const userRoutes = require("./router/userRoutes");

const app = express();

//body parser middleware
app.use(express.json());

app.use(cors());

app.use("/api/v1/user", userRoutes);



module.exports = app;
