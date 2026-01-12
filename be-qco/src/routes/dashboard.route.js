import express from "express";
import {
  fetchFloorsAndLeans,
  getDashboardData,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/floors-leans", fetchFloorsAndLeans);
router.post("/get-total", getDashboardData);

export default router;
