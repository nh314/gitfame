import React, { useMemo } from 'react';
import { GitRepo } from '../GitRepo/Repo';
import { Brain, BadgeCheck, Calendar } from 'lucide-react';

type Props = {
  repos: GitRepo[];
};

export default function ArchitectSummary({ repos }: Props) {
  if (!repos || repos.length === 0) return null;

  // O(n) loop instead of two O(n log n) sorts — only need min/max
  const { dominantRepo, mostActiveRepo } = useMemo(() => {
    let dominant = repos[0];
    let mostActive = repos[0];
    for (const repo of repos) {
      if (repo.stargazers_count > dominant.stargazers_count) dominant = repo;
      if (new Date(repo.pushed_at).getTime() > new Date(mostActive.pushed_at).getTime()) mostActive = repo;
    }
    return { dominantRepo: dominant, mostActiveRepo: mostActive };
  }, [repos]);

  return (
    <div className="bg-primary/5 rounded-xl p-8 border border-primary-fixed-dim/30 flex flex-col md:flex-row items-start gap-6">
      <div className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
        <Brain size={24} />
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-headline font-bold text-on-surface">Architect's Summary</h4>
        <p className="text-on-surface-variant font-body leading-relaxed max-w-4xl">
          Based on the comparison, <strong>{dominantRepo?.name}</strong> maintains a significantly larger ecosystem and contributor base with {dominantRepo?.stargazers_count.toLocaleString()} stars.
          {repos.length > 1 && mostActiveRepo && dominantRepo?.id !== mostActiveRepo?.id && (
            <span> However, <strong>{mostActiveRepo.name}</strong> shows more recent development activity.</span>
          )}
          {repos.length > 1 && (
            <span> When choosing between these architectures, consider whether your project prioritizes long-term stability and hiring (favoring the larger ecosystem) or specific technical advantages.</span>
          )}
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <BadgeCheck size={16} />
            <span>VERIFIED METRICS</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
            <Calendar size={16} />
            <span>DATA SYNCED JUST NOW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
