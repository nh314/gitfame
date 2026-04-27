import React, { SyntheticEvent, FormEvent, RefObject } from "react";

type Props = {
  onSubmit?: (term: string) => void;
  isLoading: boolean;
  formRef: RefObject<HTMLFormElement | null>;
  term: string;
  onTermChange: (event: SyntheticEvent<HTMLInputElement>) => void;
};

const Input = ({ onSubmit, isLoading, formRef, term, onTermChange }: Props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (term !== "" && onSubmit) {
      onSubmit(term);
    }
  };

  const iconClass = !isLoading ? "search" : "progress_activity";

  return (
    <form
      className="w-full relative"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <span className={`material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg ${isLoading ? 'animate-spin' : ''}`}>
        {iconClass}
      </span>
      <input
        className="w-full bg-surface-container-lowest border-0 border-b-2 border-outline-variant/15 focus:border-primary py-2 pl-10 pr-4 text-sm font-body outline-none"
        placeholder="Search repositories to add..."
        value={term}
        onChange={onTermChange}
      />
      <button className="hidden" type="submit">Submit</button>
    </form>
  );
};

export default Input;

