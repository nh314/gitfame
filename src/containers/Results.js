import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../actions";
import { GitRepoListItem } from "../components/GitRepo";
import { List, Segment } from "semantic-ui-react";

const mapStateToProps = state => ({
  foundRepos: state.repoReducers.foundRepos,
  selectedRepos: state.repoReducers.selectedRepos,
  setLoadingState: state.repoReducers.setLoadingState
});

const mapDispatchToProps = dispatch => ({
  repoStateAction: bindActionCreators(Actions, dispatch)
});

type Props = {
  foundRepos: Array<Object>,
  selectedRepos: Array<Object>,
  onLoading: Boolean
};

const styles = {
  default: {
    minHeight: 60
  },
  hasRepo: {
    padding: 0
  }
};

class Result extends Component<Props> {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }

  addResult = v => {
    const p = new Promise((resolve, reject) => {
      if (this.props.selectedRepos.findIndex(repo => v.id === repo.id) < 0) {
        this.props.repoStateAction.addResult(v);
        resolve(v.full_name + " added successfully");
      } else {
        reject(v.full_name + " is exists in selected list");
      }
    });

    return p;
  };

  renderList = () => {
    return this.props.foundRepos.map((v, k) => (
      <GitRepoListItem
        key={v.id}
        onClick={() => {
          return this.addResult(v);
        }}
        repo={v}
      />
    ));
  };

  render = () => {
    const onLoad = this.props.onLoading;
    const display = this.props.foundRepos.length > 0 || onLoad;
    const style =
      (this.props.foundRepos.length > 0 && styles.hasRepo) || styles.default;
    return (
      display && (
        <Segment style={style} loading={onLoad} padded>
          <List divided relaxed selection verticalAlign="middle">
            {this.renderList()}
          </List>
        </Segment>
      )
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Result);
