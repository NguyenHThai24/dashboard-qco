import express from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post("/get-total", getDashboardData);

export default router;
