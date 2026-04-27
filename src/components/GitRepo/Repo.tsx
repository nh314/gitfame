import React, { SyntheticEvent, MouseEvent } from "react";
import { supportedOrderProp } from "./CompareListFilter";
import { Star, GitFork, X, ExternalLink } from "lucide-react";

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
  open_issues: number;
  [prop: string]: any;
};

type Props = {
  repo: GitRepo;
  context?: string;
  additionalProperty?: string | null;
  onRemoveButtonClick?: (event: MouseEvent<HTMLButtonElement>) => any;
  onClick?: (event: SyntheticEvent<HTMLDivElement>, repo?: GitRepo) => void;
};

const Repo = ({ repo, context, additionalProperty, onRemoveButtonClick, onClick }: Props) => {
  const renderForSearchResulList = () => {
    return (
      <div
        onClick={(e: SyntheticEvent<HTMLDivElement>) => {
          onClick && onClick(e, repo);
        }}
        className="px-4 py-3 hover:bg-surface-container-high cursor-pointer transition-colors border-b border-outline-variant/10 last:border-b-0"
        title={
          "Stars: " +
          repo.stargazers_count.toLocaleString() +
          " Forks: " +
          repo.forks_count.toLocaleString()
        }
      >
        <div className="font-semibold text-on-surface">{repo.full_name}</div>
        <div className="text-xs text-on-surface-variant mt-1 flex gap-4">
          <span className="flex items-center gap-1"><Star size={14} /> {repo.stargazers_count.toLocaleString()}</span>
          <span className="flex items-center gap-1"><GitFork size={14} /> {repo.forks_count.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  const renderForCompareList = () => {
    // Default stats to show in 2x2 grid
    const statsToShow = ["stargazers_count", "forks_count", "watchers", "open_issues"];

    // Add additional property if selected and not already in stats
    if (additionalProperty && !statsToShow.includes(additionalProperty)) {
      statsToShow[3] = additionalProperty;
    }

    // Calculate community sentiment score mock (could be based on stars vs issues)
    const sentimentScore = Math.min(Math.max(Math.round((repo.stargazers_count / (repo.stargazers_count + (repo.open_issues * 10))) * 100) || 0, 10), 99);

    return (
      <div className="bg-surface-container-lowest p-6 rounded-xl space-y-6 transition-all duration-300 hover:bg-surface-container-high group border border-outline-variant/10 relative">
        <button
          className="absolute -top-2 -right-2 w-8 h-8 bg-error text-on-error rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md flex items-center justify-center z-10 hover:bg-error-dim"
          onClick={onRemoveButtonClick}
          title="Remove"
        >
          <X size={14} />
        </button>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-container flex items-center justify-center rounded-lg text-on-primary-container font-bold text-xl uppercase">
              {repo.name.substring(0, 1)}
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl text-on-surface">{repo.full_name}</h3>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Repository</p>
            </div>
          </div>
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary">
            <ExternalLink size={20} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {statsToShow.map((propertyName, index) => (
            <div key={index} className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tight mb-1">
                {supportedOrderProp[propertyName] || propertyName.replace('_', ' ')}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-headline font-bold text-on-surface">
                  {(repo[propertyName] || 0).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${sentimentScore}%` }}></div>
          </div>
          <p className="text-[10px] mt-2 text-on-surface-variant font-medium">{sentimentScore}% Community Sentiment Score</p>
        </div>
      </div>
    );
  };

  if (context === "compare") {
    return renderForCompareList();
  }
  return renderForSearchResulList();
};

export default Repo;
