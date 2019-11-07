//Component state
export type InputState = {
  term: string;
  isLoading: boolean;
};

export type InputProps = {
  onSubmit: (term: string) => void;
};

//Action type definition
export const SET_TERM = "SET_TERM";
export const SET_LOADING = "SET_LOADING";

//Component action types
type SetTermAction = {
  type: typeof SET_TERM;
  payload: string;
};

type SetLoadingAction = {
  type: typeof SET_LOADING;
  payload: boolean;
};

export type InputActionTypes = SetTermAction | SetLoadingAction;
