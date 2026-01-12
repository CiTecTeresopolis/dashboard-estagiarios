import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ScholarshipChartProps {
  data: Record<string, number>;
}

export function CursoChart({ data }: ScholarshipChartProps) {
  const chartData = Object.entries(data)
    .map(([level, count]) => ({
      level: level,
      fullLevel: level,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Distribuição por Curso
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" tick={{ fill: "white" }} />
            <YAxis
              dataKey="level"
              type="category"
              width={190}
              tick={{ fill: "white" }}
            />
            <Tooltip
              formatter={value =>
                `${value} ${Number(value) < 2 ? "estagiário" : "estagiários"}`
              }
              labelFormatter={label => `Curso: ${label}`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            />
            <Bar dataKey="count" fill="#f59e0b" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
