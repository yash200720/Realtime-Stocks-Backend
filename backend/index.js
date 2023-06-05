const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const URL = process.env.MONGODB_URI;
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(URL);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Server is not Connected", error.message);
  }
};
connectDB();

app.listen(PORT, () => {
  console.log(`Server is Connected to ${PORT}`);
});
