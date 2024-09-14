import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import taskRoute from './routes/taskRoute.js';

// Connect to MongoDB
mongoose.connect('mongodb+srv://nithinappari:75nlIXu4s977F7U6@cluster0.7ljelcs.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("Connection successful"))
  .catch((error) => console.log("Database connection error:", error));

// Initialize Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.get('/', (req, res) => {
    res.send("working");
  });
  
app.use('/', taskRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An internal server error occurred" });
});

// 404 Route Not Found Middleware
app.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
