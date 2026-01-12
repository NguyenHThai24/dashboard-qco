import {
  getTotalCalendar,
  getCalendarTrend,
} from "../models/dashboard.model.js";

export const getDashboardData = async (req, res) => {
  try {
    const { startDate, endDate, floor, lean } = req.body;

    const filters = {
      startDate,
      endDate,
      floor,
      lean,
    };

    const total = await getTotalCalendar(filters);
    const chart = await getCalendarTrend(filters);

    res.json({
      total,
      chart,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};
