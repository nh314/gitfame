// @flow

export const actionTypes = {
  ADD_RESULT: "ADD_RESULT",
  REMOVE_RESULT: "REMOVE_RESULT",
  SET_FOUND_REPOS: "SET_FOUND_REPOS",
  ON_LOADING_REPO: "ON_LOADING_REPO"
};

type ADD_RESULT = { type: "ADD_RESULT", repo: Object };
type REMOVE_RESULT = { type: "REMOVE_RESULT", repo: Object };
type SET_FOUND_REPOS = { type: "SET_FOUND_REPOS", foundRepos: Array<Object> };
type ON_LOADING_REPO = { type: "ON_LOADING_REPO", onLoading: Boolean };

export const addResult = (repo: Object): ADD_RESULT => {
  return { type: actionTypes.ADD_RESULT, repo };
};
export const removeResult = (repo: Object): REMOVE_RESULT => {
  return { type: actionTypes.REMOVE_RESULT, repo };
};

export const setFoundRepos = (foundRepos: Array<Object>): SET_FOUND_REPOS => {
  return { type: actionTypes.SET_FOUND_REPOS, foundRepos };
};

export const setLoadingState = (onLoading: Boolean): ON_LOADING_REPO => {
  return { type: actionTypes.ON_LOADING_REPO, onLoading };
};

export const Actions = {
  addResult,
  removeResult,
  setFoundRepos,
  setLoadingState
};
