import { chartReducer } from "./chartReducer";
import type { ChartConfig, Point } from "../Chart.interfaces";

describe("Chart reducer", () => {
  let state: ChartConfig;

  beforeAll(() => {
    state = {
      rows: [],
      numberOfPoints: 100,
      startIndex: 0,
      indexIncrement: 10,
      incrementInterval: 16,
      downsampleThreshold: 1000,
      isAnimated: false,
    };
  });

  it("should set rows", () => {
    const rows = [
      [0, 0],
      [1, 1],
    ] as Point[];
    const newState = chartReducer(state, { type: "SET_ROWS", payload: rows });
    expect(newState.rows).toBe(rows);
  });

  it("should set number of points", () => {
    const points = 200;
    const newState = chartReducer(state, { type: "SET_NUMBER_OF_POINTS", payload: points });
    expect(newState.numberOfPoints).toBe(points);
  });

  it("should set start index", () => {
    const index = 100;
    const newState = chartReducer(state, { type: "SET_START_INDEX", payload: index });
    expect(newState.startIndex).toBe(index);
  });

  it("should set index increment", () => {
    const increment = 100;
    const newState = chartReducer(state, { type: "SET_INDEX_INCREMENT", payload: increment });
    expect(newState.indexIncrement).toBe(increment);
  });

  it("should set increment interval", () => {
    const interval = 500;
    const newState = chartReducer(state, { type: "SET_INCREMENT_INTERVAL", payload: interval });
    expect(newState.incrementInterval).toBe(interval);
  });

  it("should set downsample threshold", () => {
    const threshold = 10000;
    const newState = chartReducer(state, { type: "SET_DOWNSAMPLE_THRESHOLD", payload: threshold });
    expect(newState.downsampleThreshold).toBe(threshold);
  });

  it("should toggle increment flag", () => {
    const newStateIncrementOn = chartReducer(state, { type: "TOGGLE_IS_INCREMENT" });
    expect(newStateIncrementOn.isAnimated).toBe(true);

    const newStateIncrementOff = chartReducer(newStateIncrementOn, { type: "TOGGLE_IS_INCREMENT" });
    expect(newStateIncrementOff.isAnimated).toBe(false);
  });

  it("should increment start index", () => {
    const newState = chartReducer(state, { type: "INCREMENT_START_INDEX" });
    expect(newState.startIndex).toBe(10);
  });
});
