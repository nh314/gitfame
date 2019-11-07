import { SET_TERM, InputActionTypes, SET_LOADING } from "./types";

export function setTerm(term: string): InputActionTypes {
  return {
    type: SET_TERM,
    payload: term
  };
}

export function setLoading(isLoading: boolean): InputActionTypes {
  return {
    type: SET_LOADING,
    payload: isLoading
  };
}
