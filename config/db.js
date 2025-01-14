const mongoose = require('mongoose');
const dotenv = require('dotenv') || "linkedin";

dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    //await mongoose.connect("mongodb+srv://adityaraj9843:c26SVuQZvC0Iv8wQ@cluster0.vzkds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
