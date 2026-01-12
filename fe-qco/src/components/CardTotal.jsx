// CartTotal.jsx
import { useEffect, useState, useRef } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { getTotalAPI } from "../api/dashboardAPI";

function CartTotal({ title, filters }) {
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState([]);
  const prevFiltersRef = useRef();

  useEffect(() => {
    // Chỉ fetch khi filters thực sự thay đổi
    if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
      fetchDashboard();
      prevFiltersRef.current = filters;
    }
  }, [filters]);

  const fetchDashboard = async () => {
    // Kiểm tra nếu filters rỗng thì không gọi API
    if (
      !filters.startDate &&
      !filters.endDate &&
      !filters.floor &&
      !filters.lean
    ) {
      return;
    }

    try {
      const res = await getTotalAPI(filters);
      setTotal(res.data.total);
      const areaData = res.data.chart.map((item) => ({
        value: item.total,
      }));
      setChartData(areaData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="h-full rounded bg-(--color-surface) shadow-md dark:bg-(--color-surface-dark)">
      <div className="flex h-full gap-1">
        <div className="flex w-full flex-col justify-center gap-2 p-4">
          <span className="text-sm opacity-70">{title}</span>
          <span className="text-2xl font-bold">{total}</span>
          <span className="text-sm text-green-500">↑ trend</span>
        </div>

        <div className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#colorLine)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
