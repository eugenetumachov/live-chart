import { useEffect, useReducer, useRef } from "react";
import { useChart } from "./hooks/useObservablePlotChart";
import {
  DEFAULT_DOWNSAMPLING_THRESHOLD,
  DEFAULT_INCREMENT_INTERVAL,
  DEFAULT_INDEX_INCREMENT,
  DEFAULT_NUMBER_OF_POINTS,
  DEFAULT_START_INDEX,
} from "./Chart.constants";
import { ChartAggregations } from "./ChartAggregations";
import { ChartControls } from "./ChartControls";
import { chartReducer } from "./state/chartReducer";
import { downsampleLTTB } from "./utils/downsample";

import type { ChartConfig, DownsampledPoint } from "./Chart.interfaces";

const Chart = () => {
  const initialState: ChartConfig = {
    rows: [],
    numberOfPoints: DEFAULT_NUMBER_OF_POINTS,
    startIndex: DEFAULT_START_INDEX,
    indexIncrement: DEFAULT_INDEX_INCREMENT,
    incrementInterval: DEFAULT_INCREMENT_INTERVAL,
    downsampleThreshold: DEFAULT_DOWNSAMPLING_THRESHOLD,
    isAnimated: false,
  };

  const [state, dispatch] = useReducer(chartReducer, initialState);
  const {
    rows,
    numberOfPoints,
    startIndex,
    indexIncrement,
    incrementInterval,
    downsampleThreshold,
    isAnimated,
  } = state;

  const { drawChart } = useChart();

  const plotRef = useRef<HTMLDivElement>(null); // Observable Plot

  let interval = useRef<NodeJS.Timer>();

  const slicedRows = rows.slice(startIndex, startIndex + numberOfPoints);

  let downsampledRows: DownsampledPoint[];
  const shouldDownsample = slicedRows.length > downsampleThreshold;

  if (shouldDownsample) {
    // downsample the data
    const bucketSize = slicedRows.length / downsampleThreshold;
    downsampledRows = downsampleLTTB(slicedRows, bucketSize);
  } else {
    // skip downsampling
    downsampledRows = slicedRows.map((row) => ({ x: row[0], y: row[1] }));
  }

  useEffect(() => {
    if (isAnimated) {
      interval.current = setInterval(() => {
        dispatch({ type: "INCREMENT_START_INDEX" });
      }, incrementInterval);
    }

    return () => clearInterval(interval.current);
  }, [incrementInterval, indexIncrement, isAnimated, slicedRows, drawChart]);

  useEffect(() => {
    if (rows.length && startIndex + numberOfPoints >= rows.length) {
      // stop incrementing as we've reached the end
      dispatch({ type: "TOGGLE_IS_INCREMENT" });
      clearInterval(interval.current);
    }
  }, [rows.length, startIndex, numberOfPoints]);

  useEffect(() => {
    if (!downsampledRows.length) return; // nothing to draw

    const frame = requestAnimationFrame(() =>
      drawChart(downsampledRows, plotRef.current!, downsampleThreshold)
    );

    return () => cancelAnimationFrame(frame);
  }, [downsampledRows, downsampleThreshold, drawChart]);

  return (
    <div>
      <ChartControls config={state} updateConfig={dispatch} />

      {slicedRows.length !== 0 && (
        <>
          <div ref={plotRef} />
          <ChartAggregations rows={downsampledRows} />
        </>
      )}
    </div>
  );
};

export { Chart };
