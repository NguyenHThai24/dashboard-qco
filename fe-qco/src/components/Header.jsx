import { useEffect, useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { GrLinkNext } from "react-icons/gr";

const floorData = {
  1: ["1.1", "1.2", "1.3"],
  2: ["2.1", "2.2"],
  3: ["3.1", "3.2", "3.3"],
  4: ["4.1"],
};

function Header() {
  const [floor, setFloor] = useState("");
  const [lean, setLean] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const leans = floor ? floorData[floor] : [];

  return (
    <section className="flex justify-between p-3 mb-3 rounded bg-[var(--color-surface)]">
      {/* Clock */}
      <div className="flex flex-col justify-center">
        {/* Time */}
        <div className="text-base font-semibold tabular-nums">
          {time.toLocaleTimeString("vi-VN")}
        </div>

        {/* Date */}
        <div className="text-sm opacity-70">
          {time.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="flex items-center gap-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-48 px-3 py-2 rounded border-b outline-none"
          />
          <LiaExchangeAltSolid />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-48 px-3 py-2 rounded border-b outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={floor}
            onChange={(e) => {
              setFloor(e.target.value);
              setLean("");
            }}
            className="w-48 px-3 py-2 rounded border-b outline-none"
          >
            <option value="">Chọn Tầng</option>
            {Object.keys(floorData).map((f) => (
              <option key={f} value={f}>
                Floor {f}
              </option>
            ))}
          </select>
          <GrLinkNext />
          <select
            value={lean}
            disabled={!floor}
            onChange={(e) => setLean(e.target.value)}
            className="w-48 px-3 py-2 rounded border-b outline-none disabled:opacity-50"
          >
            <option value="">Chọn Chuyền</option>
            {leans.map((l) => (
              <option key={l} value={l}>
                Lean {l}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default Header;
