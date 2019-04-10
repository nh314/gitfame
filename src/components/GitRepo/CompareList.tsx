//@flow
import React, { Component, SyntheticEvent } from "react";
import Repo, { GitRepo } from "./Repo";
import Filter from "./CompareListFilter";

type Props = {
  repos: Array<GitRepo>;
  sortBy: string;
  order: number;
  additionalProperty?: string;
  removeRepoCallBack?: (repo: GitRepo) => void;
  onRemoveButton?: (index: number) => Promise<GitRepo>;
  onSortPropertyChange: (e: SyntheticEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (e: SyntheticEvent<HTMLSelectElement>) => void;
};

export default class CompareList extends Component<Props> {
  static defaultProps = {
    repos: [],
    sortBy: "stargazers_count",
    order: 1
  };

  render() {
    const { sortBy, order, repos } = this.props;

    if (repos.length === 0) {
      return <div>No selected repository</div>;
    }

    const sortedRepos = repos.sort((a: GitRepo, b: GitRepo) => {
      return (b[sortBy] - a[sortBy]) * order;
    });

    return (
      <div className="compare-list">
        <Filter
          onSortPropertyChange={this.props.onSortPropertyChange}
          onSortOrderChange={this.props.onSortOrderChange}
        />

        {sortedRepos.map((repo: GitRepo, index: number) => (
          <Repo
            key={repo.id}
            repo={repo}
            context="compare"
            additionalProperty={this.props.additionalProperty}
            onRemoveButtonClick={() => {
              this.props.onRemoveButton &&
                this.props
                  .onRemoveButton(index)
                  .then(this.props.removeRepoCallBack);
            }}
          />
        ))}
      </div>
    );
  }
}
