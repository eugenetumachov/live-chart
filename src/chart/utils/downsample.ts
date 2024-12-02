import * as d3 from "d3";
import type { Point, DownsampledPoint } from "../Chart.interfaces";

// Downsample data using Largest Triangle Three Buckets algorithm
export function downsampleLTTB(data: Point[], bucketSize: number): DownsampledPoint[] {
  const buckets: DownsampledPoint[] = [];
  const bucketCount = Math.ceil(data.length / bucketSize);

  for (let i = 0; i < bucketCount; i++) {
    const start = i * bucketSize;
    const end = Math.min(start + bucketSize, data.length);

    const bucket = data.slice(start, end);
    const xMid = bucket[Math.floor(bucket.length / 2)][0];
    const avgY = d3.mean(bucket, (d) => d[1]) || 0;
    const yMin = d3.min(bucket, (d) => d[1]) || 0;
    const yMax = d3.max(bucket, (d) => d[1]) || 0;

    buckets.push({ x: xMid, y: avgY, yMin, yMax });
  }

  return buckets;
}
