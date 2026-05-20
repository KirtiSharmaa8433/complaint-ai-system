const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const complaintRoutes = require("./routes/complaintRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// OPEN ACCESS FOR ALL NETWORKS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Smart Complaint API running"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/ai", aiRoutes);

// Error Handler
app.use(errorHandler);

// Listen on all interfaces
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});