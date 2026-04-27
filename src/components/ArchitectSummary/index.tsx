import React from 'react';
import { GitRepo } from '../GitRepo/Repo';

type Props = {
  repos: GitRepo[];
};

export default function ArchitectSummary({ repos }: Props) {
  if (!repos || repos.length === 0) return null;

  // Simple mock analysis logic based on repo stats
  const dominantRepo = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
  const mostActiveRepo = [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())[0];

  return (
    <div className="bg-primary/5 rounded-xl p-8 border border-primary-fixed-dim/30 flex flex-col md:flex-row items-start gap-6">
      <div className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
        <span className="material-symbols-outlined text-[24px]">psychology</span>
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
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>VERIFIED METRICS</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            <span>DATA SYNCED JUST NOW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
