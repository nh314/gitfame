import React, { Component, SyntheticEvent } from "react";
import Input from "./components/Input";
import SearchResultList from "./components/GitRepo/SearchResultList";
import CompareList from "./components/GitRepo/CompareList";
import { GitRepo } from "./components/GitRepo/Repo";
import * as GitHub from "./services/github";
import { ToastContainer, toast } from "react-toastify";

import "normalize.css";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

type States = {
  isLoading: boolean;
  searchResult?: Array<GitRepo>;
  selectedRepos: Array<GitRepo>;
  sortProperty: string;
  sortOrder: number;
  additionalProperty?: string;
  term: string;
  errorMessage: string;
  page: number;
  maxPage?: number;
  offLineMessage?: string;
  passedTerm?: string;
};
const MAX_RESULT = 1000;
const RESULT_PER_PAGE = 10;

const searchCache: any = {};

class App extends Component {
  state: States = {
    isLoading: false,
    sortProperty: "stargazers_count",
    sortOrder: 1,
    selectedRepos: [],
    page: 1,
    term: "",
    errorMessage: ""
  };

  formRef = React.createRef<HTMLFormElement>();

  componentDidMount = () => {
    console.log("App mounted");

    window.addEventListener("online", this.showOnlineStatus);
    window.addEventListener("offline", this.showOnlineStatus);
  };

  showOnlineStatus = () => {
    const offLineMessage =
      (!navigator.onLine && "You are currently offline !") || undefined;
    this.setState({ offLineMessage });
  };

  /**
   * Search repo using GitHub
   */
  searchRepo = (term: string, page?: number) => {
    const usePage = (page && page) || 1;
    if (!searchCache[term]) {
      searchCache[term] = {};
      this.setState({
        page: 1
      });
    } else if (searchCache[term][usePage]) {
      this.setState({
        searchResult: searchCache[term][usePage]
      });
      return;
    }

    this.setState({ isLoading: true });

    GitHub.searchRepos(term, usePage)
      .then(repos => {
        searchCache[term][usePage] = repos.items;
        let maxPage;
        if (
          this.state.maxPage === undefined &&
          repos.total_count < MAX_RESULT
        ) {
          maxPage = Math.ceil(repos.total_count / RESULT_PER_PAGE);
        }

        this.setState({
          searchResult: searchCache[term][usePage],
          errorMessage: "",
          maxPage,
          passedTerm: term
        });
      })
      .catch(e => {
        console.log(e);
        if (e instanceof GitHub.ReponseError) {
          this.setState({
            errorMessage: "GitHub hates you !",
            page: this.state.page - 1
          });
        } else {
          this.setState({ errorMessage: e.message });
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  navigationNext = (term: string, page: number) => {
    const nextPage = page + 1;
    this.setState({ page: nextPage });
    this.searchRepo(term, nextPage);
  };

  navigationPrev = (term: string, page: number) => {
    const prevPag = page - 1;
    if (prevPag > 0) {
      this.setState({ page: prevPag });
      this.searchRepo(term, prevPag);
    }
  };

  /**
   * Add repo to compare list
   */
  selectRepo = (repo: GitRepo) => {
    const { selectedRepos } = this.state;

    const repoExists = selectedRepos.filter(
      (element: GitRepo) => element.id == repo.id
    );

    if (repoExists.length === 0) {
      this.setState({ selectedRepos: [...selectedRepos, repo] }, () => {
        toast.success(repo.full_name + " was added !");
      });
    } else {
      toast.warn(repo.full_name + " was added already !");
    }
  };

  setSortProperty = (e: SyntheticEvent<HTMLSelectElement>) => {
    const sortProperty = e.currentTarget.value;
    let newState = { sortProperty: sortProperty, additionalProperty: "" };

    if (!(sortProperty in ["stargazers_count", "forks_count"])) {
      newState.additionalProperty = sortProperty;
    }

    this.setState(newState);
  };

  setSortOrder = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({
      sortOrder: parseInt(e.currentTarget.value)
    });
  };

  removeRepoInComapreList = (index: number): Promise<GitRepo> => {
    const { selectedRepos } = this.state;
    const removedRepos = selectedRepos.splice(index, 1);

    return new Promise(resolve => {
      this.setState({ selectedRepos }, () => {
        resolve(removedRepos[0]);
      });
    });
  };

  renderOfflineMessageContainer = () => {
    if (this.state.offLineMessage) {
      return <div className="offLineMessage">{this.state.offLineMessage}</div>;
    }
  };

  render() {
    const appErrorMessage = this.state.errorMessage;
    return (
      <div className="App">
        {this.renderOfflineMessageContainer()}
        <div className="App-header">
          <div className="input-container">
            <Input
              term={this.state.term}
              onSubmit={this.searchRepo}
              isLoading={this.state.isLoading}
              formRef={this.formRef}
              onTermChange={e =>
                this.setState({
                  term: e.currentTarget.value,
                  maxPage: undefined
                })
              }
            />
          </div>
        </div>
        {appErrorMessage && <p>{appErrorMessage}</p>}
        <div className="App-content">
          <SearchResultList
            onRepoClick={(event, repo) => {
              this.selectRepo(repo);
            }}
            repos={this.state.searchResult || []}
            nextHandler={this.navigationNext}
            prevHandler={this.navigationPrev}
            currentPage={this.state.page}
            maxPage={this.state.maxPage}
            passedTerm={this.state.passedTerm}
            passedPage={this.state.page}
          />
          <CompareList
            repos={this.state.selectedRepos}
            sortBy={this.state.sortProperty}
            order={this.state.sortOrder}
            onSortPropertyChange={this.setSortProperty}
            onSortOrderChange={this.setSortOrder}
            additionalProperty={this.state.additionalProperty}
            onRemoveButton={this.removeRepoInComapreList}
            removeRepoCallBack={repo =>
              toast.error(repo.full_name + " removed from the list!")
            }
          />
        </div>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
