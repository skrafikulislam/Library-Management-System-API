import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { initializeDatabase } from "./config/db.js";

const app = express();

dotenv.config();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World! This Api Is Working Fine");
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrowBooks", borrowRoutes);
app.use("/api/users", userRoutes);

const startServer = async () => {
  await initializeDatabase();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
