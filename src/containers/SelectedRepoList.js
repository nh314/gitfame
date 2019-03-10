//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../actions";
import { GitRepoTableRow } from "../components/GitRepo";
import { Table } from "semantic-ui-react";

const mapStateToProps = state => ({
  selectedRepos: state.repoReducers.selectedRepos
});

const mapDispatchToProps = dispatch => ({
  repoStateAction: bindActionCreators(Actions, dispatch)
});

type RepoStateAction = {
  removeResult: Function
};

type Props = {
  selectedRepos: Array<Object>,
  repoStateAction: RepoStateAction,
  handleSort: () => void
};
type State = { direction: string | null, column: string | null };

class SelectedRepoList extends Component<Props, State> {
  state = {
    direction: null,
    column: null
  };

  renderList = () => {
    const { column, direction } = this.state;
    this.props.selectedRepos.sort((a, b) => {
      if (direction === "ascending") {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    });

    return this.props.selectedRepos.map((v, k) => (
      <GitRepoTableRow key={k} repo={v} removeItem={this.removeItem(v)} />
    ));
  };

  handleSort = (clickedColumn: string) => () => {
    const { column, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: "descending"
      });
      return;
    }
    this.setState({
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  removeItem = repo => () => {
    this.props.repoStateAction.removeResult(repo);
  };

  render() {
    const { column, direction } = this.state;
    return (
      <Table sortable celled fixed unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "stargazers_count" ? direction : null}
              onClick={this.handleSort("stargazers_count")}
            >
              Stars
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "forks_count" ? direction : null}
              onClick={this.handleSort("forks_count")}
            >
              Forks
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderList()}</Table.Body>
      </Table>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(SelectedRepoList);
