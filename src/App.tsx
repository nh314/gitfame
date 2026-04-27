import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import CompareList from "./components/GitRepo/CompareList";
import SearchResultList from "./components/GitRepo/SearchResultList";
import Explore from "./pages/Explore";
import History from "./pages/History";
import Bookmarks from "./pages/Bookmarks";
import { useRepoStore } from "./store/useRepoStore";

const App = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
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
  } = useRepoStore();

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

  const handleRepoClick = (event: any, repo: any) => {
    selectRepo(repo);
  };

  return (
    <Router>
      <div className="bg-surface text-on-surface min-h-screen font-body">
        {offLineMessage && (
          <div className="bg-error text-on-error p-2 text-center text-sm font-semibold">
            {offLineMessage}
          </div>
        )}
        
        <Sidebar onNewComparison={handleNewComparison} />
        
        <main className="ml-64 min-h-screen relative flex flex-col">
          <TopBar 
            term={term}
            onSubmit={(t) => searchRepo(t, 1)}
            isLoading={isLoading}
            formRef={formRef}
            onTermChange={e => setTerm(e.currentTarget.value)}
          />
          
          {/* Search Results Overlay */}
          {searchResult && searchResult.length > 0 && (
            <div className="absolute top-16 left-8 right-8 z-50 max-w-xl mx-auto">
              <SearchResultList
                onRepoClick={handleRepoClick}
                repos={searchResult}
                nextHandler={navigationNext}
                prevHandler={navigationPrev}
                currentPage={page}
                maxPage={maxPage}
                passedTerm={passedTerm}
                passedPage={page}
              />
            </div>
          )}
          
          {errorMessage && (
            <div className="mx-10 mt-4 p-4 bg-error-container text-on-error-container rounded-lg font-medium">
              {errorMessage}
            </div>
          )}
          
          <div className="flex-1">
            <Routes>
              <Route path="/" element={
                <div className="p-10 space-y-12">
                  <section className="space-y-2">
                    <h1 className="text-4xl font-headline font-extrabold text-on-surface">Repository Benchmarking</h1>
                    <p className="text-on-surface-variant font-body">Technical audit and performance comparison between leading frameworks.</p>
                  </section>
                  
                  <CompareList
                    repos={selectedRepos}
                    sortBy={sortProperty}
                    order={sortOrder}
                    onSortPropertyChange={(e) => setSortProperty(e.currentTarget.value)}
                    onSortOrderChange={(e) => setSortOrder(parseInt(e.currentTarget.value))}
                    additionalProperty={additionalProperty}
                    onRemoveButton={removeRepoInCompareList}
                  />
                </div>
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

export default App;
