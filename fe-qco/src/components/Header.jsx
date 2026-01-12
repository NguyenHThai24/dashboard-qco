import { useEffect, useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { GrLinkNext } from "react-icons/gr";
import { getFloorsAndLeans } from "../api/dashboardAPI";

function Header({ onFilterChange }) {
  const [floorData, setFloorData] = useState({});
  const [floor, setFloor] = useState("");
  const [lean, setLean] = useState("");

  const [time, setTime] = useState(new Date());

  // Lấy ngày đầu và ngày cuối của tháng hiện tại
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getDefaultDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return {
      from: formatDate(firstDay),
      to: formatDate(lastDay),
    };
  };

  const defaultDates = getDefaultDates();

  const [fromDate, setFromDate] = useState(defaultDates.from);
  const [toDate, setToDate] = useState(defaultDates.to);

  /* ===== clock ===== */
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ===== fetch floor & lean ===== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFloorsAndLeans();
        const grouped = res.data.data.reduce((acc, item) => {
          if (!acc[item.floor]) acc[item.floor] = [];
          acc[item.floor].push(item.lean);
          return acc;
        }, {});
        setFloorData(grouped);
      } catch (err) {
        console.error("Fetch floor & lean failed", err);
      }
    };

    fetchData();
  }, []);

  const handleApplyFilter = () => {
    onFilterChange({
      startDate: fromDate || null,
      endDate: toDate || null,
      floor: floor || null,
      lean: lean || null,
    });
  };

  const leans = floor ? floorData[floor] || [] : [];

  return (
    <section className="mb-2 flex justify-between rounded bg-(--color-surface) p-3 dark:bg-(--color-surface-dark)">
      {/* Time */}
      <div>
        <div className="font-bold">{time.toLocaleTimeString("vi-VN")}</div>
        <div>
          {time.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-8">
        {/* Date */}
        <div className="flex items-center gap-3">
          <input
            className="w-50 rounded-2xl border-b px-4 py-1.5 outline-0"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <LiaExchangeAltSolid />
          <input
            className="w-50 rounded-2xl border-b px-4 py-1.5 outline-0"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* Floor & Lean */}
        <div className="flex items-center gap-3">
          <select
            className="w-44 rounded-2xl border-b px-4 py-1.5 outline-0"
            value={floor}
            onChange={(e) => {
              setFloor(e.target.value);
              setLean("");
            }}
          >
            <option value="" className="dark:bg-(--color-surface-dark)">
              Chọn Tầng
            </option>
            {Object.keys(floorData).map((f) => (
              <option
                key={f}
                value={f}
                className="dark:bg-(--color-surface-dark)"
              >
                {f}
              </option>
            ))}
          </select>

          <GrLinkNext />

          <select
            className="w-44 rounded-2xl border-b px-4 py-1.5 outline-0"
            value={lean}
            disabled={!floor}
            onChange={(e) => setLean(e.target.value)}
          >
            <option value="" className="dark:bg-(--color-surface-dark)">
              Chọn Chuyền
            </option>
            {leans.map((l) => (
              <option
                key={l}
                value={l}
                className="dark:bg-(--color-surface-dark)"
              >
                {l}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleApplyFilter} className="btn cursor-pointer">
          Áp dụng
        </button>
      </div>
    </section>
  );
}

export default Header;
