import React, { SyntheticEvent } from "react";
import Repo, { GitRepo } from "./Repo";

type Props = {
  repos: Array<GitRepo>;
  onRepoClick: (event: SyntheticEvent<HTMLDivElement>, repo: GitRepo) => void;
  nextHandler: (term: string, page: number) => void;
  prevHandler: (term: string, page: number) => void;
  minPage?: number;
  maxPage?: number;
  currentPage: number;
  passedTerm?: string;
  passedPage?: number;
};

const MIN_RESULT_PAGE = 1;

const SearchResultList = ({
  repos,
  onRepoClick,
  nextHandler,
  prevHandler,
  minPage = MIN_RESULT_PAGE,
  maxPage = 100,
  currentPage,
  passedTerm,
  passedPage = 1,
}: Props) => {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-outline-variant/30 rounded-2xl shadow-xl shadow-primary/5 z-50 overflow-hidden max-h-[400px] flex flex-col animate-in">
      <div className="overflow-y-auto flex-1 p-2">
        {repos.map(repo => (
          <Repo
            onClick={event => {
              onRepoClick(event, repo);
            }}
            key={repo.id}
            repo={repo}
          />
        ))}
      </div>
      
      {repos.length > 0 ? (
        <div className="flex items-center justify-between px-4 py-2 bg-surface-container-low border-t border-outline-variant/10 text-sm">
          <button
            className={`px-3 py-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors ${currentPage <= minPage ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage <= minPage}
            onClick={() => {
              if (passedTerm) {
                prevHandler(passedTerm, passedPage);
              }
            }}
          >
            Previous
          </button>
          <span className="text-xs text-on-surface-variant font-medium">
            Page {passedPage} of {maxPage || '?'}
          </span>
          <button
            className={`px-3 py-1 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors ${currentPage >= maxPage ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage >= maxPage}
            onClick={() => {
              if (passedTerm) {
                nextHandler(passedTerm, passedPage);
              }
            }}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResultList;
