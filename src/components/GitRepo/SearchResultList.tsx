import React, { Component, SyntheticEvent } from "react";
import Repo, { GitRepo } from "./Repo";

type Props = {
  repos: Array<GitRepo>;
  onRepoClick: (event: SyntheticEvent<HTMLDivElement>, repo: GitRepo) => void;
  nextHandler: (term: string, page: number) => void;
  prevHandler: (term: string, page: number) => void;
  minPage: number;
  maxPage: number;
  currentPage: number;
  passedTerm?: string;
  passedPage: number;
};
const MIN_RESULT_PAGE = 1;
export default class SearchResultList extends Component<Props> {
  static defaultProps = {
    minPage: MIN_RESULT_PAGE,
    maxPage: 100,
    passedPage: 1
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
              <button
                onClick={() => {
                  this.props.passedTerm &&
                    this.props.prevHandler(
                      this.props.passedTerm,
                      this.props.passedPage
                    );
                }}
              >
                Prev
              </button>
            )}
            {this.props.currentPage < this.props.maxPage && (
              <button
                onClick={() => {
                  this.props.passedTerm &&
                    this.props.nextHandler(
                      this.props.passedTerm,
                      this.props.passedPage
                    );
                }}
              >
                Next
              </button>
            )}
            {this.props.passedPage + "/" + this.props.maxPage}
          </div>
        )}
      </div>
    );
  }
}
