import { useEffect, useState, useRef } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { getTotalAPI } from "../api/dashboardAPI";

function CartItem({ title, filters, color = "#2A27F5" }) {
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [diffPercent, setDiffPercent] = useState(null);

  const prevFiltersRef = useRef();

  useEffect(() => {
    // Chỉ fetch khi filters thực sự thay đổi
    if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
      fetchDashboard();
      prevFiltersRef.current = filters;
    }
  }, [filters]);

  const fetchDashboard = async () => {
    try {
      const res = await getTotalAPI(filters);

      setTotal(res.data.total);

      const areaData = res.data.chart.map((item) => ({ value: item.total }));
      setChartData(areaData);

      // Tính diffPercent
      if (areaData.length >= 2) {
        const last = areaData[areaData.length - 1].value;
        const prev = areaData[areaData.length - 2].value;

        setDiffPercent(prev !== 0 ? ((last - prev) / prev) * 100 : 0);
      } else {
        setDiffPercent(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="h-full rounded bg-(--color-surface) shadow-md dark:bg-(--color-surface-dark)">
      <div className="flex h-full">
        {/* Text */}
        <div className="flex w-full flex-col gap-2 p-4">
          <span className="text-base font-bold">{title}</span>
          <span className="text-2xl font-bold">{total}</span>
          {diffPercent !== null && (
            <span
              className={`text-sm font-semibold ${
                diffPercent > 0
                  ? "text-green-500"
                  : diffPercent < 0
                    ? "text-red-500"
                    : "text-gray-500"
              }`}
            >
              {diffPercent > 0 ? "↑" : diffPercent < 0 ? "↓" : "→"}{" "}
              {Math.abs(diffPercent).toFixed(1)}%
            </span>
          )}
        </div>

        {/* Chart */}
        <div className="flex w-full items-end">
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={1.8}
                fill="url(#colorLine)"
                dot={false}
                style={{ pointerEvents: "none" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
