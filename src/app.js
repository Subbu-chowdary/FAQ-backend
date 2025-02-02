const express = require("express");
const connectDB = require("./config/db");
const faqRoutes = require("./routes/faqRoutes");
require("dotenv").config();
const cors = require("cors");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", faqRoutes);

module.exports = app;
