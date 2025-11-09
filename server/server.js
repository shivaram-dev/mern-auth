import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
await connectDB();
console.log('hello from server');
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://mern-auth-client-bay.vercel.app',
]

app.use(cors({
  origin: allowedOrigins, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  // exposedHeaders: ['set-cookie']
}));
app.use(express.json());
app.use(cookieParser());

// API Endpoints
app.get("/", (req, res) => {
  res.send("API Working");
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);



app.listen(port, () => console.log(`Server is running on port ${port}`));