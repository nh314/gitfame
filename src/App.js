import React, { Component } from "react";
import MyInput from "./components/Input";
import Results from "./containers/Results";
import SelectedRepoList from "./containers/SelectedRepoList";
import { searchRepos } from "./services/github";
import { debounce } from "debounce";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { Container, Grid } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";

import "semantic-ui-css/semantic.min.css";

type Props = {};
class App extends Component<Props> {
  resultList: any;

  constructor() {
    super();
    this.resultList = React.createRef();
    this.state = {
      onRepoLoading: false
    };
  }

  searchRepos = debounce(keyword => {
    if (keyword.length < 1) {
      return;
    }
    this.setState({ onRepoLoading: true });
    searchRepos(keyword).then(foundRepos => {
      this.setState({ onRepoLoading: false });
      foundRepos.length > 0 &&
        this.resultList.current.props.repoStateAction.setFoundRepos(foundRepos);
    });
  }, 600);

  render() {
    return (
      <Container>
        <Grid container>
          <Grid.Row centered columns={16}>
            <Grid.Column mobile={16} tablet={12} computer={8}>
              <MyInput onSubmit={this.searchRepos} />
              <Results
                ref={this.resultList}
                onLoading={this.state.onRepoLoading}
              />
              <SelectedRepoList />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <ToastContainer />
      </Container>
    );
  }
}

const store = createStore(rootReducer);
export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
