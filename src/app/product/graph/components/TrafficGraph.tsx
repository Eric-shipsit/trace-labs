"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const trafficData = [
  { time: "12 AM", requests: 1800 },
  { time: "2 AM", requests: 1200 },
  { time: "4 AM", requests: 1500 },
  { time: "6 AM", requests: 2600 },
  { time: "8 AM", requests: 4200 },
  { time: "10 AM", requests: 6100 },
  { time: "12 PM", requests: 7200 },
  { time: "2 PM", requests: 8100 },
  { time: "4 PM", requests: 9300 },
  { time: "5 PM", requests: 10150 },
  { time: "6 PM", requests: 9600 },
  { time: "8 PM", requests: 7400 },
  { time: "10 PM", requests: 4300 },
  { time: "11 PM", requests: 2900 },
];

export function TrafficGraph() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">Traffic</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Requests / min
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Smooth overview of request volume throughout the day.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Peak
            </p>
            <p className="text-lg font-semibold text-slate-900">10,150</p>
          </div>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f172a" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={55}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString()} req/min`, "Traffic"]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
              }}
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#0f172a"
              strokeWidth={3}
              fill="url(#trafficFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}