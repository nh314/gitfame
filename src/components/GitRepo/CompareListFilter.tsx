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
    <label>
      Sort by
      <select onChange={props.onSortPropertyChange}>
        {Object.keys(supportedOrderProp).map((k, i) => {
          return (
            <option key={i} value={k}>
              {supportedOrderProp[k]}
            </option>
          );
        })}
      </select>
      <select onChange={props.onSortOrderChange}>
        <option value="1">DESC</option>
        <option value="-1">ASC</option>
      </select>
    </label>
  );
}
