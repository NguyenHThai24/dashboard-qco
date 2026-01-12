import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import authRoute from "./src/routes/auth.route.js";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
