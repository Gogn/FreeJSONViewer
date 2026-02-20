import { useState, useCallback } from 'react';
import { useTreeState } from '../../hooks/useTreeState';
import { formatDisplayPath } from '../../utils/jsonUtils';
import TreeNode from './TreeNode';
import TreeToolbar from './TreeToolbar';

const CopyIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

interface TreeViewerProps {
  data: unknown;
  isEmpty: boolean;
}

export default function TreeViewer({ data, isEmpty }: TreeViewerProps) {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const { expanded, toggle, expandAll, collapseAll, selectedPath, selectPath } = useTreeState();

  const handleExpandAll = useCallback(() => expandAll(data), [expandAll, data]);

  const handleCopyPath = () => {
    if (selectedPath === null) return;
    navigator.clipboard.writeText(formatDisplayPath(selectedPath)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const noData = data === undefined;

  const renderRoot = () => {
    if (noData) {
      return (
        <div className="tree-empty">
          {isEmpty
            ? 'Paste or type JSON in the Raw Text tab'
            : 'Invalid JSON — check the Raw Text tab'}
        </div>
      );
    }

    // Primitive root
    if (data === null || typeof data !== 'object') {
      return (
        <div className="tree-content" style={{ padding: '16px' }}>
          <TreeNode
            nodeKey={null}
            value={data}
            path=""
            depth={0}
            expanded={expanded}
            onToggle={toggle}
            onSelect={selectPath}
            selectedPath={selectedPath}
            search={search}
          />
        </div>
      );
    }

    // Object/Array root — render children directly
    const isArray = Array.isArray(data);
    const entries = isArray
      ? (data as unknown[]).map((v, i) => ({ key: i as string | number, val: v, path: `[${i}]` }))
      : Object.entries(data as Record<string, unknown>).map(([k, v]) => ({
          key: k as string | number,
          val: v,
          path: k,
        }));

    if (entries.length === 0) {
      return <div className="tree-empty">Empty {isArray ? 'array' : 'object'}</div>;
    }

    return (
      <div className="tree-content">
        {entries.map(({ key, val, path }) => (
          <TreeNode
            key={String(key)}
            nodeKey={key}
            value={val}
            path={path}
            depth={0}
            expanded={expanded}
            onToggle={toggle}
            onSelect={selectPath}
            selectedPath={selectedPath}
            search={search}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="tree-tab">
      <TreeToolbar
        search={search}
        onSearchChange={setSearch}
        onExpandAll={handleExpandAll}
        onCollapseAll={collapseAll}
        disabled={noData}
      />

      <div className="tree-scroll">{renderRoot()}</div>

      {/* JSON Path bar */}
      <div className="tree-path-bar">
        <span className="tree-path-label">Path</span>
        <span className="tree-path-value">
          {selectedPath !== null ? formatDisplayPath(selectedPath) : '—'}
        </span>
        {selectedPath !== null && (
          <button className="icon-btn path-copy-btn" onClick={handleCopyPath} title="Copy path">
            {copied ? <span style={{ fontSize: '10px' }}>Copied!</span> : <CopyIcon />}
          </button>
        )}
      </div>
    </div>
  );
}
