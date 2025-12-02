import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import router from "./routes";
import cors from "cors";

const app = express();

// Enable CORS BEFORE routes
const allowedOrigins = [
  "http://localhost:5173",
  "https://form-builder-sand-pi.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, 
  })
);

app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/formbuilder";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("MongoDB connection error:", err));
