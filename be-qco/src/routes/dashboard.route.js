import express from "express";
import {
  fetchFloorsAndLeans,
  getDashboarCompletedData,
  getDashboardData,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/floors-leans", fetchFloorsAndLeans);
router.post("/get-total", getDashboardData);
router.post("/get-total-complete", getDashboarCompletedData);

export default router;
