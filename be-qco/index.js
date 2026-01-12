import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./src/routes/auth.route.js";
import dashboardRoute from "./src/routes/dashboard.route.js";

dotenv.config();

const app = express();
app.use(express.json());

/*  CORS */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/dashboard", dashboardRoute);

const PORT = process.env.PORT || 2402;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
