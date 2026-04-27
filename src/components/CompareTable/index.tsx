import React, { useMemo } from 'react';
import { GitRepo } from '../GitRepo/Repo';

type Props = {
  repos: GitRepo[];
};

export default function CompareTable({ repos }: Props) {
  if (!repos || repos.length === 0) return null;

  // Memoize formatted dates to avoid re-parsing strings in render loop
  const formattedDates = useMemo(() => {
    return repos.map(repo => 
      repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : 'Unknown'
    );
  }, [repos]);

  return (
    <div className="overflow-hidden rounded-xl bg-surface-container-lowest border border-outline-variant/10">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="py-4 px-6 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 min-w-[150px]">
                Metric
              </th>
              {repos.map(repo => (
                <th key={repo.id} className="py-4 px-6 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10 min-w-[150px]">
                  {repo.full_name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm font-body">
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="py-4 px-6 text-on-surface-variant font-medium border-b border-outline-variant/5">License</td>
              {repos.map(repo => (
                <td key={repo.id} className="py-4 px-6 text-on-surface font-semibold border-b border-outline-variant/5">
                  {repo.license?.name || 'None'}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="py-4 px-6 text-on-surface-variant font-medium border-b border-outline-variant/5">Last Updated</td>
              {repos.map((repo, index) => (
                <td key={repo.id} className="py-4 px-6 text-on-surface font-semibold border-b border-outline-variant/5">
                  {formattedDates[index]}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="py-4 px-6 text-on-surface-variant font-medium border-b border-outline-variant/5">Primary Language</td>
              {repos.map(repo => (
                <td key={repo.id} className="py-4 px-6 text-on-surface font-semibold border-b border-outline-variant/5">
                  {repo.language || 'Unknown'}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="py-4 px-6 text-on-surface-variant font-medium border-b border-outline-variant/5">Size</td>
              {repos.map(repo => (
                <td key={repo.id} className="py-4 px-6 text-on-surface font-semibold border-b border-outline-variant/5">
                  {repo.size ? `${(repo.size / 1024).toFixed(1)} KB` : 'Unknown'}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-surface-container-low/50 transition-colors">
              <td className="py-4 px-6 text-on-surface-variant font-medium border-b border-outline-variant/5">Default Branch</td>
              {repos.map(repo => (
                <td key={repo.id} className="py-4 px-6 text-on-surface font-semibold border-b border-outline-variant/5">
                  {repo.default_branch || 'main'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
