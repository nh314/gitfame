import React, { Component, SyntheticEvent, MouseEvent } from "react";
import { supportedOrderProp } from "./CompareListFilter";
import "./Repo.scss";

type GitRepoOwner = {
  html_url: string;
};

export type GitRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
  owner: GitRepoOwner;
  stargazers_count: number;
  forks_count: number;
  watchers: number;
  [prop: string]: any;
};

type Props = {
  repo: GitRepo;
  context?: string;
  additionalProperty?: string | null;
  onRemoveButtonClick?: (event: MouseEvent<HTMLButtonElement>) => any;
  onClick?: (event: SyntheticEvent<HTMLDivElement>, repo?: GitRepo) => void;
};

type States = {};

export default class Repo extends Component<Props, States> {
  renderForSearchResulList = () => {
    return (
      <div
        onClick={(e: SyntheticEvent<HTMLDivElement>) => {
          this.props.onClick && this.props.onClick(e, this.props.repo);
        }}
        className="Repo"
      >
        {this.props.repo.full_name}
      </div>
    );
  };

  renderForCompareList = () => {
    const { repo } = this.props;

    let defaultStats = ["stargazers_count", "forks_count"];

    if (
      this.props.additionalProperty &&
      !defaultStats.includes(this.props.additionalProperty)
    ) {
      defaultStats.push(this.props.additionalProperty);
    }

    return (
      <div
        className="Repo"
        onClick={(e: SyntheticEvent<HTMLDivElement>) => {
          this.props.onClick && this.props.onClick(e);
        }}
      >
        <div className="Repo-name">
          <a href={repo.html_url} target="_blank">
            {this.props.repo.full_name}
          </a>
        </div>
        {defaultStats.map((propertyName, index) => (
          <div className="Repo-stats" key={index}>
            <span className="Repo-stat-name">
              {supportedOrderProp[propertyName]}
            </span>
            <span className="Repo-stat-value">
              {repo[propertyName].toLocaleString()}
            </span>
          </div>
        ))}
        <button
          className="Repo-btn-remove"
          onClick={this.props.onRemoveButtonClick}
        >
          <i className="fas fa-times" />
        </button>
      </div>
    );
  };

  render() {
    if (this.props.context === "compare") {
      return this.renderForCompareList();
    }

    return this.renderForSearchResulList();
  }
}
