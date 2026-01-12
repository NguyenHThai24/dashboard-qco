import {
  getTotalCalendar,
  getCalendarTrend,
  getFloorsAndLeans,
} from "../models/dashboard.model.js";

// get floor lean
export const fetchFloorsAndLeans = async (req, res) => {
  try {
    const data = await getFloorsAndLeans();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Fetch floor & lean error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get total
export const getDashboardData = async (req, res) => {
  try {
    // đảm bảo req.body luôn là object
    const {
      startDate = null,
      endDate = null,
      floor = null,
      lean = null,
    } = req.body || {};

    const filters = {
      startDate: startDate || null,
      endDate: endDate || null,
      floor: floor || null,
      lean: lean || null,
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
