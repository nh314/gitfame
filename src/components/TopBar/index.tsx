import React, { SyntheticEvent, RefObject } from 'react';
import Input from '../Input';

type Props = {
  term: string;
  isLoading: boolean;
  formRef: RefObject<HTMLFormElement | null>;
  onSubmit: (term: string) => void;
  onTermChange: (e: SyntheticEvent<HTMLInputElement>) => void;
};

const TopBar = ({ term, isLoading, formRef, onSubmit, onTermChange }: Props) => {
  return (
    <header className="w-full sticky top-0 z-40 bg-surface-container-low/80 backdrop-blur-md flex justify-between items-center px-8 h-16 font-headline tracking-tight">
      <div className="flex items-center gap-8 flex-1">
        <span className="text-xl font-bold text-on-surface">GitFame</span>
        <div className="relative w-full max-w-xl">
          <Input
            term={term}
            isLoading={isLoading}
            formRef={formRef}
            onSubmit={onSubmit}
            onTermChange={onTermChange}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;

