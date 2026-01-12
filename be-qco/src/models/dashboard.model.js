import { poolPromise, sql } from "../db/sqlserver.js";

// get floor lean
export const getFloorsAndLeans = async () => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
        SELECT DISTINCT
          [floor],
          [lean]
        FROM [EIP].[dbo].[DT_Calendars]
        WHERE [floor] IS NOT NULL
          AND [lean] IS NOT NULL
      `);

    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// 🔹 Lấy tổng số lệnh
export const getTotalCalendar = async ({ startDate, endDate, floor, lean }) => {
  const pool = await poolPromise;

  const result = await pool
    .request()
    .input("startDate", sql.Date, startDate || null)
    .input("endDate", sql.Date, endDate || null)
    .input("floor", sql.VarChar, floor || null)
    .input("lean", sql.VarChar, lean || null).query(`
      SELECT COUNT(*) AS total
      FROM EIP.dbo.DT_Calendars
      WHERE
        (@startDate IS NULL OR date >= @startDate)
        AND (@endDate IS NULL OR date <= @endDate)
        AND (@floor IS NULL OR floor = @floor)
        AND (@lean IS NULL OR lean = @lean)
    `);

  return result.recordset[0].total;
};

// 🔹 Lấy dữ liệu biểu đồ (100 record mới nhất)
export const getCalendarTrend = async ({ startDate, endDate, floor, lean }) => {
  const pool = await poolPromise;

  const result = await pool
    .request()
    .input("startDate", sql.Date, startDate || null)
    .input("endDate", sql.Date, endDate || null)
    .input("floor", sql.VarChar, floor || null)
    .input("lean", sql.VarChar, lean || null).query(`
      SELECT 
        CAST(date AS DATE) AS work_date,
        COUNT(*) AS total
      FROM (
        SELECT TOP 100 *
        FROM EIP.dbo.DT_Calendars
        WHERE
          (@startDate IS NULL OR date >= @startDate)
          AND (floor = @floor OR @floor IS NULL OR @floor = '')
AND (lean = @lean OR @lean IS NULL OR @lean = '')
AND (date >= @startDate OR @startDate IS NULL)
AND (date <= @endDate OR @endDate IS NULL)

        ORDER BY date DESC
      ) t
      GROUP BY CAST(date AS DATE)
      ORDER BY work_date
    `);

  return result.recordset;
};
