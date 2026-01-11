import { AreaChart, Area, ResponsiveContainer } from "recharts";

const data = [
  { value: 40 },
  { value: 45 },
  { value: 42 },
  { value: 60 },
  { value: 55 },
  { value: 70 },
  { value: 65 },
  { value: 85 },
];

function CartTotal({ title }) {
  return (
    <div className="rounded-lg h-full shadow-md bg-(--color-surface)">
      <div className="flex h-full gap-1">
        {/* Left: Content */}
        <div className="flex flex-col justify-center gap-2 w-full  p-4">
          <span className="text-sm text-gray-500">{title}</span>

          <span className="text-2xl font-bold">$857,850</span>

          <span className="text-sm text-green-500">
            ↑ 35.3% <span className="text-gray-400">last month</span>
          </span>
        </div>

        {/* Right: Chart */}
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
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
