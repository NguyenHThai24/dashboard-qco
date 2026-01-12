import { AreaChart, Area, ResponsiveContainer } from "recharts";

function CartItem({ title, color, total, chartData, diffPercent }) {
  // Tạo gradient id động để không bị trùng khi render nhiều component
  const gradientId = `gradient-${title.replace(/\s/g, "")}`;

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
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={1.8}
                fill={`url(#${gradientId})`}
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
