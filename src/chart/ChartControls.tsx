import * as d3 from "d3";
import { ChangeEvent } from "react";
import { useFileChunkReader } from "./hooks/useChunkedFile";
import "./ChartControls.css";

import type { Dispatch } from "react";
import type { ChartAction, ChartConfig, Point } from "./Chart.interfaces";

interface ChartControlsProps {
  config: ChartConfig;
  updateConfig: Dispatch<ChartAction>;
}

const ChartControls = ({ config, updateConfig }: ChartControlsProps) => {
  const {
    rows,
    numberOfPoints,
    startIndex,
    indexIncrement,
    incrementInterval,
    downsampleThreshold,
    isAnimated,
  } = config;

  const { readFileChunks } = useFileChunkReader(parseCSV);

  function parseCSV(csv: string) {
    const parsedCsv = d3.csvParseRows(csv);
    const rows = parsedCsv.map((row) => [parseInt(row[0]), parseFloat(row[1])] as Point);
    updateConfig({ type: "SET_ROWS", payload: rows });
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      readFileChunks(file);
    }
  }

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div className="chart-controls">
        <label htmlFor="number-of-points">Points to draw:</label>
        <input
          id="number-of-points"
          type="number"
          min="0"
          value={numberOfPoints}
          onChange={(e) =>
            updateConfig({ type: "SET_NUMBER_OF_POINTS", payload: e.target.valueAsNumber })
          }
        />

        <label htmlFor="start-index">Start index:</label>
        <input
          id="start-index"
          type="number"
          min="0"
          value={startIndex}
          onChange={(e) =>
            updateConfig({ type: "SET_START_INDEX", payload: e.target.valueAsNumber })
          }
        />

        <label htmlFor="index-increment">Increment by:</label>
        <input
          id="index-increment"
          type="number"
          min="0"
          value={indexIncrement}
          onChange={(e) =>
            updateConfig({ type: "SET_INDEX_INCREMENT", payload: e.target.valueAsNumber })
          }
        />

        <label htmlFor="increment-interval">Increment interval (ms):</label>
        <input
          id="increment-interval"
          type="number"
          min="16"
          value={incrementInterval}
          onChange={(e) =>
            updateConfig({ type: "SET_INCREMENT_INTERVAL", payload: e.target.valueAsNumber })
          }
        />

        <label htmlFor="downsampling-threshold">Downsample threshold:</label>
        <input
          id="downsampling-threshold"
          type="number"
          min="0"
          value={downsampleThreshold}
          onChange={(e) =>
            updateConfig({ type: "SET_DOWNSAMPLE_THRESHOLD", payload: e.target.valueAsNumber })
          }
        />
      </div>

      <button
        disabled={rows.length === 0}
        onClick={() => updateConfig({ type: "TOGGLE_IS_INCREMENT" })}
      >
        {isAnimated ? "Stop" : "Start"}
      </button>
    </>
  );
};

export { ChartControls };
