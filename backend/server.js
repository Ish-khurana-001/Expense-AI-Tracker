  const path = require("path");
  require("dotenv").config({ path: path.join(__dirname, ".env") });
  const express = require("express");
  const cors = require("cors");
  const connectDB = require("./config/db");
  const authRoutes = require("./routes/authRoutes");
  const incomeRoutes = require("./routes/incomeRoutes");
  const expenseRoutes = require("./routes/expenseRoutes");
  const dashboardRoutes = require("./routes/dashboardRoutes");
  const chatRoutes = require("./routes/chatRoutes");

  const app = express();

  //Middleware to handle cors
  const allowedOrigins = [
    ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map((o) => o.trim()) : []),
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS policy blocked origin ${origin}`));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  connectDB();

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/income", incomeRoutes);
  app.use("/api/v1/expense", expenseRoutes);
  app.use("/api/v1/dashboard", dashboardRoutes);
  app.use("/api/v1/chat", chatRoutes);

  //Serve uploads folder
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
