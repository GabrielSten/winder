"use client";
import {
  ResponsiveContainer,
  XAxis,
  AreaChart,
  Area,
  YAxis,
  ReferenceLine,
} from "recharts";
import { TimeSery } from "../types";
import { formatTime } from "../utils";

interface GraphData {
  time: string;
  ms: number;
  ms_extra: number;
}

export default function Graph(props: { data: TimeSery[] | undefined }) {
  const data = props.data;
  const refLine = 6;

  const graphData: GraphData[] = [];
  data?.map((t) => {
    t.parameters?.map((p) => {
      if (p.name === "ws") {
        if (p.values[0] > refLine) {
          graphData.push({
            time: formatTime(new Date(t.validTime)),
            ms: refLine,
            ms_extra: Number((p.values[0] - refLine).toFixed(4)),

          });
        } else {
          graphData.push({
            time: formatTime(new Date(t.validTime)),
            ms: p.values[0],
            ms_extra: 0,
          });
        }

      }
    });
  });

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={128}>
      <AreaChart
        width={10}
        height={10}
        data={graphData}
        margin={{
          top: 1,
          right: 1,
          left: 1,
          bottom: 1,
        }}
      >
         <ReferenceLine
          y={refLine}
          stroke="none"
          strokeDasharray="3 3"
          key={"refLine"}
        />

        <YAxis
          type="number"
          hide={true}
          domain={[0, 10]}
          tick={{ fontSize: 8 }}
          axisLine={false}
          tickLine={false}
        />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 8 }}
          axisLine={false}
          tickLine={false}
          domain={["dataMin", "dataMax"]}
        />

        <Area
          type="monotone"
          dataKey="ms"
          stroke="none"
          fill="#56bb80"
          stackId="1"
          animationDuration={1000}
        />
        <Area
          type="monotone"
          dataKey="ms_extra"
          stroke="none"
          fill="#ed8d25"
          stackId="1"
          animationDuration={1000}
        />

      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}
