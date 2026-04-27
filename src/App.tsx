import React, { useCallback, useEffect, useRef, SyntheticEvent } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { useShallow } from "zustand/react/shallow";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import CompareList from "./components/GitRepo/CompareList";
import SearchResultList from "./components/GitRepo/SearchResultList";
import Explore from "./pages/Explore";
import History from "./pages/History";
import Bookmarks from "./pages/Bookmarks";
import { useRepoStore } from "./store/useRepoStore";
import { GitRepo } from "./components/GitRepo/Repo";

const App = () => {
  const formRef = useRef<HTMLFormElement>(null);

  // Split store subscriptions — useShallow prevents re-renders when
  // unrelated slices change (shallow comparison of returned object)
  const {
    isLoading,
    searchResult,
    selectedRepos,
    sortProperty,
    sortOrder,
    additionalProperty,
    term,
    errorMessage,
    page,
    maxPage,
    offLineMessage,
    passedTerm,
  } = useRepoStore(
    useShallow((s) => ({
      isLoading: s.isLoading,
      searchResult: s.searchResult,
      selectedRepos: s.selectedRepos,
      sortProperty: s.sortProperty,
      sortOrder: s.sortOrder,
      additionalProperty: s.additionalProperty,
      term: s.term,
      errorMessage: s.errorMessage,
      page: s.page,
      maxPage: s.maxPage,
      offLineMessage: s.offLineMessage,
      passedTerm: s.passedTerm,
    }))
  );

  // Actions are stable references in Zustand — safe to destructure without selector
  const {
    setTerm,
    setOfflineMessage,
    searchRepo,
    navigationNext,
    navigationPrev,
    selectRepo,
    setSortProperty,
    setSortOrder,
    removeRepoInCompareList,
    handleNewComparison,
  } = useRepoStore(
    useShallow((s) => ({
      setTerm: s.setTerm,
      setOfflineMessage: s.setOfflineMessage,
      searchRepo: s.searchRepo,
      navigationNext: s.navigationNext,
      navigationPrev: s.navigationPrev,
      selectRepo: s.selectRepo,
      setSortProperty: s.setSortProperty,
      setSortOrder: s.setSortOrder,
      removeRepoInCompareList: s.removeRepoInCompareList,
      handleNewComparison: s.handleNewComparison,
    }))
  );

  useEffect(() => {
    const handleOnlineStatus = () => {
      setOfflineMessage(!navigator.onLine ? "You are currently offline !" : undefined);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, [setOfflineMessage]);

  // Stable callback — avoids child re-renders from reference changes
  const handleRepoClick = useCallback(
    (_event: SyntheticEvent<HTMLDivElement>, repo: GitRepo) => {
      selectRepo(repo);
    },
    [selectRepo]
  );

  const handleSearchSubmit = useCallback(
    (t: string) => searchRepo(t, 1),
    [searchRepo]
  );

  const handleTermChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => setTerm(e.currentTarget.value),
    [setTerm]
  );

  const handleSortPropertyChange = useCallback(
    (e: SyntheticEvent<HTMLSelectElement>) => setSortProperty(e.currentTarget.value),
    [setSortProperty]
  );

  const handleSortOrderChange = useCallback(
    (e: SyntheticEvent<HTMLSelectElement>) => setSortOrder(parseInt(e.currentTarget.value)),
    [setSortOrder]
  );

  return (
    <Router>
      <div className="bg-surface text-on-surface min-h-screen font-body">
        {offLineMessage ? (
          <div className="bg-error text-on-error p-2 text-center text-sm font-semibold">
            {offLineMessage}
          </div>
        ) : null}
        
        <Sidebar onNewComparison={handleNewComparison} />
        
        <main className="ml-64 min-h-screen relative flex flex-col">
          <TopBar 
            term={term}
            onSubmit={handleSearchSubmit}
            isLoading={isLoading}
            formRef={formRef}
            onTermChange={handleTermChange}
          />
          
          {/* Search Results Overlay */}
          {(searchResult?.length ?? 0) > 0 ? (
            <div className="absolute top-16 left-8 right-8 z-50 max-w-xl mx-auto">
              <SearchResultList
                onRepoClick={handleRepoClick}
                repos={searchResult!}
                nextHandler={navigationNext}
                prevHandler={navigationPrev}
                currentPage={page}
                maxPage={maxPage}
                passedTerm={passedTerm}
                passedPage={page}
              />
            </div>
          ) : null}
          
          {errorMessage ? (
            <div className="mx-10 mt-4 p-4 bg-error-container text-on-error-container rounded-lg font-medium">
              {errorMessage}
            </div>
          ) : null}
          
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <HomePage
                  selectedRepos={selectedRepos}
                  sortProperty={sortProperty}
                  sortOrder={sortOrder}
                  additionalProperty={additionalProperty}
                  onSortPropertyChange={handleSortPropertyChange}
                  onSortOrderChange={handleSortOrderChange}
                  onRemoveButton={removeRepoInCompareList}
                />
              } />
              <Route path="/explore" element={<Explore />} />
              <Route path="/history" element={<History />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

// Extracted from inline Route element to avoid re-creating JSX tree on every render
type HomePageProps = {
  selectedRepos: GitRepo[];
  sortProperty: string;
  sortOrder: number;
  additionalProperty?: string;
  onSortPropertyChange: (e: SyntheticEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (e: SyntheticEvent<HTMLSelectElement>) => void;
  onRemoveButton: (index: number) => Promise<GitRepo>;
};

function HomePage({
  selectedRepos,
  sortProperty,
  sortOrder,
  additionalProperty,
  onSortPropertyChange,
  onSortOrderChange,
  onRemoveButton,
}: HomePageProps) {
  return (
    <div className="p-10 space-y-12">
      <section className="space-y-2">
        <h1 className="text-4xl font-headline font-extrabold text-on-surface">Repository Benchmarking</h1>
        <p className="text-on-surface-variant font-body">Technical audit and performance comparison between leading frameworks.</p>
      </section>
      
      <CompareList
        repos={selectedRepos}
        sortBy={sortProperty}
        order={sortOrder}
        onSortPropertyChange={onSortPropertyChange}
        onSortOrderChange={onSortOrderChange}
        additionalProperty={additionalProperty}
        onRemoveButton={onRemoveButton}
      />
    </div>
  );
}

export default App;
