import type { ChartConfig, ChartAction } from "../Chart.interfaces";

export const chartReducer = (state: ChartConfig, action: ChartAction): ChartConfig => {
  switch (action.type) {
    case "SET_ROWS":
      return { ...state, rows: action.payload };
    case "SET_NUMBER_OF_POINTS":
      return { ...state, numberOfPoints: action.payload };
    case "SET_START_INDEX":
      return { ...state, startIndex: action.payload };
    case "INCREMENT_START_INDEX":
      return { ...state, startIndex: state.startIndex + state.indexIncrement };
    case "SET_INDEX_INCREMENT":
      return { ...state, indexIncrement: action.payload };
    case "SET_INCREMENT_INTERVAL":
      return { ...state, incrementInterval: action.payload };
    case "SET_DOWNSAMPLE_THRESHOLD":
      return { ...state, downsampleThreshold: action.payload };
    case "TOGGLE_IS_INCREMENT":
      return { ...state, isAnimated: !state.isAnimated };
    default:
      return state;
  }
};
