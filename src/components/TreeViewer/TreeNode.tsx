import { memo } from 'react';
import { nodeMatchesSearch } from '../../utils/jsonUtils';

interface TreeNodeProps {
  nodeKey: string | number | null;
  value: unknown;
  path: string;
  depth: number;
  expanded: Set<string>;
  onToggle: (path: string) => void;
  onSelect: (path: string) => void;
  selectedPath: string | null;
  search: string;
}

function renderPrimitive(value: unknown) {
  if (value === null) return <span className="json-null">null</span>;
  switch (typeof value) {
    case 'string':
      return <span className="json-string">"{value}"</span>;
    case 'number':
      return <span className="json-number">{String(value)}</span>;
    case 'boolean':
      return <span className="json-boolean">{String(value)}</span>;
    default:
      return <span className="json-null">null</span>;
  }
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    style={{
      transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
      transition: 'transform 0.15s',
      flexShrink: 0,
    }}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function TreeNodeInner({
  nodeKey,
  value,
  path,
  depth,
  expanded,
  onToggle,
  onSelect,
  selectedPath,
  search,
}: TreeNodeProps) {
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const isEmpty =
    isObject &&
    (isArray
      ? (value as unknown[]).length === 0
      : Object.keys(value as Record<string, unknown>).length === 0);
  const isExpandable = isObject && !isEmpty;
  const isExpanded = search ? true : expanded.has(path);
  const isSelected = selectedPath === path;
  const isMatch = search ? nodeMatchesSearch(nodeKey, value, search) : false;

  const indent = 16 + depth * 20;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(path);
  };

  const handleRowClick = () => onSelect(path);

  const closingBracket = isArray ? ']' : '}';
  const openingBracket = isArray ? '[' : '{';

  const preview = () => {
    if (isExpandable && !isExpanded) {
      if (isArray) {
        const n = (value as unknown[]).length;
        return (
          <span className="tree-preview">
            {n} {n === 1 ? 'item' : 'items'}
          </span>
        );
      }
      const n = Object.keys(value as Record<string, unknown>).length;
      return (
        <span className="tree-preview">
          {n} {n === 1 ? 'key' : 'keys'}
        </span>
      );
    }
    return null;
  };

  const childEntries = isExpandable
    ? isArray
      ? (value as unknown[]).map((item, i) => ({
          key: i as string | number,
          val: item,
          childPath: `${path}[${i}]`,
        }))
      : Object.entries(value as Record<string, unknown>).map(([k, v]) => ({
          key: k as string | number,
          val: v,
          childPath: path ? `${path}.${k}` : k,
        }))
    : [];

  return (
    <div>
      {/* Main row */}
      <div
        className={`tree-row${isSelected ? ' selected' : ''}${isMatch ? ' match' : ''}`}
        style={{ paddingLeft: indent }}
        onClick={handleRowClick}
      >
        {/* Toggle / spacer */}
        <span
          className="tree-toggle-wrap"
          onClick={isExpandable ? handleToggle : undefined}
          style={{ cursor: isExpandable ? 'pointer' : 'default' }}
        >
          {isExpandable ? <ChevronIcon expanded={isExpanded} /> : <span className="tree-spacer" />}
        </span>

        {/* Key */}
        {nodeKey !== null && (
          <>
            <span className={`tree-key${isMatch ? ' key-match' : ''}`}>
              {typeof nodeKey === 'number' ? nodeKey : `"${nodeKey}"`}
            </span>
            <span className="tree-colon">:</span>
          </>
        )}

        {/* Value */}
        {isObject ? (
          <>
            <span className="tree-bracket">{openingBracket}</span>
            {!isExpanded && (
              <>
                {preview()}
                <span className="tree-bracket">{closingBracket}</span>
              </>
            )}
          </>
        ) : (
          <span className={isMatch ? 'value-match' : ''}>{renderPrimitive(value)}</span>
        )}

        {/* Empty object/array inline */}
        {isEmpty && <span className="tree-bracket">{closingBracket}</span>}
      </div>

      {/* Children */}
      {isExpanded && isExpandable && (
        <div>
          {childEntries.map(({ key, val, childPath }) => (
            <TreeNode
              key={String(key)}
              nodeKey={key}
              value={val}
              path={childPath}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
              selectedPath={selectedPath}
              search={search}
            />
          ))}
          {/* Closing bracket */}
          <div className="tree-row" style={{ paddingLeft: indent }}>
            <span className="tree-spacer" />
            <span className="tree-bracket">{closingBracket}</span>
          </div>
        </div>
      )}
    </div>
  );
}

const TreeNode = memo(TreeNodeInner);
export default TreeNode;
