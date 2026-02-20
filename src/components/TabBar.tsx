import { ActiveTab, ErrorMode } from '../types';

interface TabBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  hasError: boolean;
  errorMode: ErrorMode;
}

export default function TabBar({ activeTab, onTabChange, hasError, errorMode }: TabBarProps) {
  const treeDisabled = hasError && errorMode === 'disable';

  return (
    <div className="tab-bar">
      <button
        className={`tab-btn ${activeTab === 'raw' ? 'active' : ''}`}
        onClick={() => onTabChange('raw')}
      >
        Raw Text
      </button>
      <button
        className={`tab-btn ${activeTab === 'tree' ? 'active' : ''}`}
        onClick={() => !treeDisabled && onTabChange('tree')}
        disabled={treeDisabled}
        title={treeDisabled ? 'Fix JSON errors to enable tree view' : undefined}
      >
        Tree Viewer
      </button>
    </div>
  );
}
