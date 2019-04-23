import React, { Component, SyntheticEvent } from "react";
import Repo, { GitRepo } from "./Repo";

type Props = {
  repos: Array<GitRepo>;
  onRepoClick: (event: SyntheticEvent<HTMLDivElement>, repo: GitRepo) => void;
  nextHandler: () => void;
  prevHandler: () => void;
  minPage: number;
  maxPage: number;
  currentPage: number;
};
const MIN_RESULT_PAGE = 1;
export default class SearchResultList extends Component<Props> {
  static defaultProps = {
    minPage: MIN_RESULT_PAGE,
    maxPage: 100
  };

  render() {
    return (
      <div>
        <div className="app-result-list">
          {this.props.repos &&
            this.props.repos.map(repo => (
              <Repo
                onClick={event => {
                  this.props.onRepoClick(event, repo);
                }}
                key={repo.id}
                repo={repo}
              />
            ))}
        </div>
        {this.props.repos.length > 0 && (
          <div className="result-navigation">
            {this.props.currentPage > this.props.minPage && (
              <button onClick={this.props.prevHandler}>Prev</button>
            )}
            {this.props.currentPage < this.props.maxPage && (
              <button onClick={this.props.nextHandler}>Next</button>
            )}
          </div>
        )}
      </div>
    );
  }
}
