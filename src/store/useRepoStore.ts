import { create } from 'zustand';
import { GitRepo } from '../components/GitRepo/Repo';
import * as GitHub from '../services/github';
import { toast } from 'react-toastify';

const MAX_RESULT = 1000;
const RESULT_PER_PAGE = 10;

interface RepoStoreState {
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
  
  // Actions
  setTerm: (term: string) => void;
  setOfflineMessage: (message?: string) => void;
  searchRepo: (term: string, page?: number) => Promise<void>;
  navigationNext: (term: string, page: number) => void;
  navigationPrev: (term: string, page: number) => void;
  selectRepo: (repo: GitRepo) => void;
  setSortProperty: (property: string) => void;
  setSortOrder: (order: number) => void;
  removeRepoInCompareList: (index: number) => Promise<GitRepo>;
  handleNewComparison: () => void;
}

export const useRepoStore = create<RepoStoreState>((set, get) => ({
  isLoading: false,
  sortProperty: 'stargazers_count',
  sortOrder: 1,
  selectedRepos: [],
  page: 1,
  term: '',
  errorMessage: '',
  
  setTerm: (term: string) => set({ term, maxPage: undefined }),
  
  setOfflineMessage: (message?: string) => set({ offLineMessage: message }),
  
  searchRepo: async (term: string, page?: number) => {
    const usePage = page || 1;
    set({ isLoading: true, errorMessage: '' });

    try {
      const repos = await GitHub.searchRepos(term, usePage);
      const currentMaxPage = get().maxPage;
      let newMaxPage = currentMaxPage;
      
      if (currentMaxPage === undefined && repos.total_count < MAX_RESULT) {
        newMaxPage = Math.ceil(repos.total_count / RESULT_PER_PAGE);
      }

      set({
        searchResult: repos.items,
        errorMessage: '',
        maxPage: newMaxPage,
        passedTerm: term,
        isLoading: false,
      });
    } catch (e: any) {
      if (e instanceof GitHub.ReponseError) {
        set((state) => ({
          errorMessage: "GitHub hates you !",
          page: Math.max(1, state.page - 1),
          isLoading: false,
        }));
      } else {
        set({
          errorMessage: e.message || 'An error occurred',
          isLoading: false,
        });
      }
    }
  },

  navigationNext: (term: string, page: number) => {
    const nextPage = page + 1;
    set({ page: nextPage });
    get().searchRepo(term, nextPage);
  },

  navigationPrev: (term: string, page: number) => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      set({ page: prevPage });
      get().searchRepo(term, prevPage);
    }
  },

  selectRepo: (repo: GitRepo) => {
    const state = get();
    const repoExists = state.selectedRepos.find((element) => element.id === repo.id);

    if (!repoExists) {
      set({
        selectedRepos: [...state.selectedRepos, repo],
        searchResult: [], // Clear search results on selection
        term: '', // Clear search term visually
      });
      toast.success(`${repo.full_name} was added !`);
    } else {
      toast.warn(`${repo.full_name} was added already !`);
    }
  },

  setSortProperty: (property: string) => {
    let newState = { sortProperty: property, additionalProperty: "" };
    if (!["stargazers_count", "forks_count"].includes(property)) {
      newState.additionalProperty = property;
    }
    set(newState);
  },

  setSortOrder: (order: number) => {
    set({ sortOrder: order });
  },

  removeRepoInCompareList: (index: number) => {
    return new Promise((resolve) => {
      const state = get();
      const newSelectedRepos = [...state.selectedRepos];
      const removedRepos = newSelectedRepos.splice(index, 1);
      
      set({ selectedRepos: newSelectedRepos });
      resolve(removedRepos[0]);
    });
  },

  handleNewComparison: () => {
    set({ selectedRepos: [] });
  },
}));
