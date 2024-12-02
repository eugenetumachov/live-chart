export type Point = [number, number];
export type DownsampledPoint = { x: number; y: number; yMin?: number; yMax?: number };

export interface ChartConfig {
  rows: Point[];
  numberOfPoints: number;
  startIndex: number;
  indexIncrement: number;
  incrementInterval: number;
  downsampleThreshold: number;
  isAnimated: boolean;
}

export type ChartAction =
  | { type: "SET_ROWS"; payload: Point[] }
  | { type: "SET_NUMBER_OF_POINTS"; payload: number }
  | { type: "SET_START_INDEX"; payload: number }
  | { type: "INCREMENT_START_INDEX" }
  | { type: "SET_INDEX_INCREMENT"; payload: number }
  | { type: "SET_INCREMENT_INTERVAL"; payload: number }
  | { type: "SET_DOWNSAMPLE_THRESHOLD"; payload: number }
  | { type: "TOGGLE_IS_INCREMENT" };
