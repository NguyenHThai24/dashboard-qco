import { useState, useEffect, useRef } from "react";

/**
 * Custom hook fetch dữ liệu dashboard.
 * @param {Object} filters - filters để gửi lên API
 * @param {Function} apiFunc - hàm API (getTotalAPI, getTotalCompleteAPI, ...)
 */
export function useDashboardData(filters, apiFunc) {
  const [total, setTotal] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [diffPercent, setDiffPercent] = useState(null);

  const prevFiltersRef = useRef();

  useEffect(() => {
    if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
      fetchData();
      prevFiltersRef.current = filters;
    }
  }, [filters]);

  const fetchData = async () => {
    try {
      const res = await apiFunc(filters);

      setTotal(res.data.total);

      const areaData = res.data.chart.map((item) => ({ value: item.total }));
      setChartData(areaData);

      if (areaData.length >= 2) {
        const last = areaData[areaData.length - 1].value;
        const prev = areaData[areaData.length - 2].value;
        setDiffPercent(prev !== 0 ? ((last - prev) / prev) * 100 : 0);
      } else {
        setDiffPercent(null);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setTotal(0);
      setChartData([]);
      setDiffPercent(null);
    }
  };

  return { total, chartData, diffPercent };
}
