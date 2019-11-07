import { combineReducers, createStore } from "redux";
import { inputReducer } from "./Input/reducers";

const rootReducer = combineReducers({
  input: inputReducer
});

export type AppState = ReturnType<typeof rootReducer>;
