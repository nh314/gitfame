import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  onNewComparison: () => void;
};

const Sidebar = ({ onNewComparison }: Props) => {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col p-4 gap-2 font-body text-sm text-primary z-50">
      <div className="flex items-center gap-3 px-2 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined">architecture</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-on-surface font-headline leading-tight">GitFame</h2>
          <p className="text-[10px] text-on-surface-variant tracking-wider uppercase">Enterprise Tier</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <NavLink
          exact
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover-surface transition-colors duration-150 rounded-lg relative"
          activeClassName="bg-white text-on-surface font-semibold shadow-sm before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-primary before:rounded-r-full"
        >
          <span className="material-symbols-outlined">compare_arrows</span>
          <span>Compare</span>
        </NavLink>
        <NavLink
          to="/explore"
          className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover-surface transition-colors duration-150 rounded-lg relative"
          activeClassName="bg-white text-on-surface font-semibold shadow-sm before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-primary before:rounded-r-full"
        >
          <span className="material-symbols-outlined">explore</span>
          <span>Explore</span>
        </NavLink>
        <NavLink
          to="/history"
          className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover-surface transition-colors duration-150 rounded-lg relative"
          activeClassName="bg-white text-on-surface font-semibold shadow-sm before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-primary before:rounded-r-full"
        >
          <span className="material-symbols-outlined">history</span>
          <span>History</span>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover-surface transition-colors duration-150 rounded-lg relative"
          activeClassName="bg-white text-on-surface font-semibold shadow-sm before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-primary before:rounded-r-full"
        >
          <span className="material-symbols-outlined">bookmark</span>
          <span>Bookmarks</span>
        </NavLink>
      </nav>

      <button
        onClick={onNewComparison}
        className="w-full py-2.5 px-4 mt-4 bg-linear-to-br from-primary to-primary-dim text-on-primary rounded-lg font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
      >
        <span className="material-symbols-outlined text-sm">add</span>
        New Comparison
      </button>

      <div className="mt-auto border-t border-outline-variant/15 pt-4 space-y-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover-surface transition-colors duration-150 rounded-lg">
          <span className="material-symbols-outlined">help</span>
          <span>Support</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover-surface transition-colors duration-150 rounded-lg">
          <span className="material-symbols-outlined">description</span>
          <span>Documentation</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
