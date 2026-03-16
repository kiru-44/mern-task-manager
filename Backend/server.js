//Package-Purpose 
// express-Create server
// mongoose-Connect MongoDB
// dotenv-Store secrets
// bcryptjs-Hash passwords
// jsonwebtoken-Authentication
// cors-Allow frontend

const express = require("express");
const mongoose= require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {              //server creation
  res.send("Server is running");
});
mongoose.connect(process.env.MONGO_URI)   //mongodb  connection
    .then(()=>{
      console.log("MongoDB Connected");
      app.listen(5000, () => {
        console.log("Server started on port 5000");
});
})
.catch((errr)=>{
  console.log("DB Connection Error",errr.message)
});