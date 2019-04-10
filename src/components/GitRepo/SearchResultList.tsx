import React, { Component, SyntheticEvent } from "react";
import Repo, { GitRepo } from "./Repo";

type Props = {
  repos: Array<GitRepo>;
  onRepoClick: (event: SyntheticEvent<HTMLDivElement>, repo: GitRepo) => void;
  nextHandler: () => void;
  prevHandler: () => void;
};
export default class SearchResultList extends Component<Props> {
  onRepoClick = (event: SyntheticEvent<HTMLDivElement>, repo: GitRepo) => {
    return this.props.onRepoClick(event, repo);
  };
  render() {
    return (
      <div>
        <div className="app-result-list">
          {this.props.repos &&
            this.props.repos.map(repo => (
              <Repo
                onClick={event => {
                  this.onRepoClick(event, repo);
                }}
                key={repo.id}
                repo={repo}
              />
            ))}
        </div>
        {this.props.repos.length > 0 && (
          <div className="result-navigatio">
            <button onClick={this.props.prevHandler}>Prev</button>
            <button onClick={this.props.nextHandler}>Next</button>
          </div>
        )}
      </div>
    );
  }
}
