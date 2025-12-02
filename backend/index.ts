import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";

dotenv.config();

const app = express();

// Enable CORS BEFORE routes
app.use(
  cors({
    origin: "http://localhost:5173", 
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
