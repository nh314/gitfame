import React, { SyntheticEvent } from "react";

type ChangeHandler = (event: SyntheticEvent<HTMLSelectElement>) => void;
type Props = {
  onSortPropertyChange: ChangeHandler;
  onSortOrderChange: ChangeHandler;
};

type supportedOrderPropType = {
  stargazers_count: string;
  forks_count: string;
  watchers: string;
  open_issues: string;
  [prop: string]: any;
};
export const supportedOrderProp: supportedOrderPropType = {
  stargazers_count: "Stars",
  forks_count: "Forks",
  watchers: "Watchers",
  open_issues: "Open issues"
};

export default function CompareListFilter(props: Props) {
  return (
    <div className="flex items-center justify-between mt-12 mb-6">
      <h2 className="text-2xl font-headline font-bold text-on-surface">Structural Analysis</h2>
      <div className="flex gap-2">
        <div className="hidden items-center gap-2 mr-4 text-sm text-on-surface-variant">
          <label>Sort by</label>
          <select className="bg-surface-container-lowest border border-outline-variant/30 rounded py-1 px-2 text-xs" onChange={props.onSortPropertyChange}>
            {Object.entries(supportedOrderProp).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select className="bg-surface-container-lowest border border-outline-variant/30 rounded py-1 px-2 text-xs" onChange={props.onSortOrderChange}>
            <option value="1">DESC</option>
            <option value="-1">ASC</option>
          </select>
        </div>
        <button className="px-4 py-1.5 text-xs font-semibold bg-primary text-on-primary rounded shadow-sm hover:opacity-90 transition-opacity">
          Share Audit
        </button>
      </div>
    </div>
  );
}
