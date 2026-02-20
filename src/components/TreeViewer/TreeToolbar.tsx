interface TreeToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  disabled: boolean;
}

export default function TreeToolbar({
  search,
  onSearchChange,
  onExpandAll,
  onCollapseAll,
  disabled,
}: TreeToolbarProps) {
  return (
    <div className="tree-toolbar">
      <button className="btn" onClick={onExpandAll} disabled={disabled}>
        Expand All
      </button>
      <button className="btn" onClick={onCollapseAll} disabled={disabled}>
        Collapse All
      </button>
      <div className="toolbar-separator" />
      <input
        className="search-input"
        type="text"
        placeholder="Search keys and values..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        disabled={disabled}
      />
      {search && (
        <button className="btn" onClick={() => onSearchChange('')}>
          Clear
        </button>
      )}
    </div>
  );
}
