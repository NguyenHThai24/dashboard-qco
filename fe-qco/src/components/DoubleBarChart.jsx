import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", income: 500, expense: 350 },
  { name: "Feb", income: 550, expense: 250 },
  { name: "Mar", income: 750, expense: 420 },
  { name: "Apr", income: 600, expense: 650 },
  { name: "May", income: 480, expense: 180 },
  { name: "Jun", income: 350, expense: 90 },
  { name: "Jul", income: 680, expense: 380 },
  { name: "Aug", income: 600, expense: 520 },
  { name: "Sep", income: 690, expense: 320 },
  { name: "Oct", income: 450, expense: 160 },
  { name: "Nov", income: 670, expense: 620 },
  { name: "Dec", income: 420, expense: 340 },
];

const DoubleBarChart = () => {
  return (
    <div className="h-full rounded bg-(--color-surface) p-4 shadow-md dark:bg-(--color-surface-dark)">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Dissection</h2>
        <span className="text-sm">last week</span>
      </div>

      {/* Chart */}
      <div className="h-[90%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2}>
            {/* Grid ngang */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="rgba(0,0,0,0.08)"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                fontSize: 13,
              }}
              labelStyle={{
                color: "black",
                fontWeight: 900,
                fontSize: 14,
              }}
              itemStyle={{}}
            />

            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />

            <Bar
              dataKey="income"
              name="Income"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              barSize={14}
            />
            <Bar
              dataKey="expense"
              name="Expenses"
              fill="#ec4899"
              radius={[6, 6, 0, 0]}
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DoubleBarChart;
