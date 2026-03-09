const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require('cors')
// const authMiddleware = require("./middleware/verifyToken")
require("dotenv").config();
const dbConnection = require('./db/dbconnection')
const app = express();
const userRouter = require('./router/userRoute');
const router = require('./router/route');
app.use(cookieParser());
app.use(express.json());
// server.js mein CORS setup ko aise update karein
app.use(cors({
  // Yahan wo saare URLs likhein jahan se aap frontend access kar rahe hain
  origin: [
    "https://fullstack-ecommerce-website-fronten.vercel.app",
    "https://fullstack-ecommerce-website-frontend-4t5xytw5p.vercel.app", // Ye wala error mein arha hai
    "http://localhost:5173" // Local development ke liye
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get('/', (req, res)=>{
  res.send("backend is running")
  console.log("backend is running ")
}
)
app.use('/api' , router)
app.use('/users', userRouter)
// app.use(authMiddleware);
dbConnection();
app.listen(process.env.PORT, ()=>{
    console.log(`server is running on PORT ${process.env.PORT}`);
})

