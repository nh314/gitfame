import { InputState, SET_TERM, SET_LOADING, InputActionTypes } from "./types";

const initialState: InputState = {
  term: "",
  isLoading: false
};

export function inputReducer(
  state = initialState,
  action: InputActionTypes
): InputState {
  switch (action.type) {
    case SET_TERM:
      return {
        ...state,
        term: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
}
