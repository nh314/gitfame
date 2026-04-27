import React, { SyntheticEvent, useMemo } from "react";
import Repo, { GitRepo } from "./Repo";
import Filter from "./CompareListFilter";
import CompareTable from "../CompareTable";
import ArchitectSummary from "../ArchitectSummary";
import { Plus } from "lucide-react";

type Props = {
  repos?: Array<GitRepo>;
  sortBy?: string;
  order?: number;
  additionalProperty?: string;
  onRemoveButton?: (index: number) => Promise<GitRepo>;
  onSortPropertyChange: (e: SyntheticEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (e: SyntheticEvent<HTMLSelectElement>) => void;
};

const CompareList = ({
  repos = [],
  sortBy = "stargazers_count",
  order = 1,
  additionalProperty,
  onRemoveButton,
  onSortPropertyChange,
  onSortOrderChange
}: Props) => {

  // Memoize sorted copy to avoid re-sorting on every render
  const sortedRepos = useMemo(
    () => [...repos].sort((a: GitRepo, b: GitRepo) => (b[sortBy] - a[sortBy]) * order),
    [repos, sortBy, order]
  );

  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedRepos.map((repo: GitRepo, index: number) => (
          <Repo
            key={repo.id}
            repo={repo}
            context="compare"
            additionalProperty={additionalProperty}
            onRemoveButtonClick={() => {
              onRemoveButton &&
                onRemoveButton(index)
                  .then(() => {
                    // Load toast lazily to defer third-party library loading
                    import("react-toastify").then(({ toast }) => {
                      toast.error(repo.full_name + " removed from the list!");
                    });
                  });
            }}
          />
        ))}

        {/* Empty Add Card Placeholder */}
        <div
          className="bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-xl flex flex-col items-center justify-center p-6 space-y-4 hover:bg-surface-container transition-colors cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <Plus size={32} strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="font-headline font-bold text-on-surface">Add Repository</p>
            <p className="text-xs text-on-surface-variant px-8 mt-1">Search and select another repository to compare architectural metrics.</p>
          </div>
        </div>
      </section>

      {repos.length > 0 && (
        <section className="space-y-6">
          <Filter
            onSortPropertyChange={onSortPropertyChange}
            onSortOrderChange={onSortOrderChange}
          />
          <CompareTable repos={repos} />
          <ArchitectSummary repos={repos} />
        </section>
      )}
    </div>
  );
};

export default CompareList;
