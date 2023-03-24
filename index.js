// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// const busRoute = require("./routes/bus.js");

import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import busRoute from "./routes/bus.js";
import userRoute from "./routes/user.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// database connection
mongoose.set("strictQuery", false);
const connect = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB error: " + error);
  }
};

// testing
app.get("/", (req, res) => {
  res.send("api is working");
});

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/bus", busRoute);
app.use("/user", userRoute);

// routes

app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
