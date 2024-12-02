import "./ChartAggregations.css";

import type { DownsampledPoint } from "./Chart.interfaces";

interface ChartAggregationsProps {
  rows: DownsampledPoint[];
}

const ChartAggregations = ({ rows }: ChartAggregationsProps) => {
  // Extract values
  const values = rows.map((row) => row.y);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const average = values.reduce((sum: number, value: number) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum: number, value: number) => sum + Math.pow(value - average, 2), 0) /
    values.length;

  return (
    <div className="variations">
      <div>Min:</div> <span>{min}</span>
      <div>Average:</div> <span>{average}</span>
      <div>Max:</div> <span>{max}</span>
      <div>Variance:</div> <span>{variance}</span>
    </div>
  );
};

export { ChartAggregations };
