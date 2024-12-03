import * as Plot from "@observablehq/plot";
import { useCallback, useRef } from "react";
import { CHART_HEIGHT, CHART_MARGIN, CHART_WIDTH } from "../Chart.constants";

import type { DownsampledPoint } from "../Chart.interfaces";

export const useChart = () => {
  const chart = useRef<ReturnType<typeof Plot.plot>>();

  const drawChart = useCallback(
    (rows: DownsampledPoint[], canvas: HTMLDivElement) => {
      if (chart.current) chart.current.remove();

      const isDownsampled = rows.some((row) => row.yMax);

      chart.current = Plot.plot({
        marks: [
          ...(isDownsampled
            ? [
                // Shadow for error margins
                Plot.areaY(rows, {
                  x: "x",
                  y1: "yMin",
                  y2: "yMax",
                  fill: "var(--shadow-fill-color)",
                }),
              ]
            : []),
          // Line chart
          Plot.line(rows, { x: "x", y: "y" }),
        ],
        x: { label: "", labelArrow: "none", line: true },
        y: { label: "", labelArrow: "none", line: true },
        margin: CHART_MARGIN,
        width: CHART_WIDTH,
        height: CHART_HEIGHT,
      });

      canvas.append(chart.current);
    },
    []
  );

  return { drawChart };
};
