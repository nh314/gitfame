import { combineReducers } from "redux";
import * as actions from "../actions";

//Default action for all reducers
type Action = {
  type: string,
  text?: string,
  repo?: Object,
  foundRepos?: Array<Object>,
  selectedRepos?: Array<Object>,
  onLoading?: Boolean
};

const repoInitialState = {
  foundRepos: [],
  selectedRepos: [],
  onLoading: false
};
const repoReducers = (state = repoInitialState, action: Action) => {
  switch (action.type) {
    case actions.actionTypes.SET_FOUND_REPOS:
      return Object.assign({}, state, {
        foundRepos: action.foundRepos
      });

    case actions.actionTypes.ADD_RESULT:
      return Object.assign({}, state, {
        selectedRepos: [...state.selectedRepos, action.repo]
      });

    case actions.actionTypes.REMOVE_RESULT:
      return Object.assign({}, state, {
        selectedRepos: state.selectedRepos.filter(v => {
          return v.id !== action.repo.id;
        })
      });

    case actions.actionTypes.ON_LOADING_REPO:
      return Object.assign({}, state, {
        onLoading: action.onLoading
      });

    default:
      return state;
  }
};

export default combineReducers({
  repoReducers
});
