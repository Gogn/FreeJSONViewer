import { useState, useCallback } from 'react';
import { collectAllPaths } from '../utils/jsonUtils';

export function useTreeState() {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(['']));
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const toggle = useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const expandAll = useCallback((data: unknown) => {
    if (data !== undefined) {
      setExpanded(collectAllPaths(data, ''));
    }
  }, []);

  const collapseAll = useCallback(() => {
    setExpanded(new Set());
  }, []);

  const selectPath = useCallback((path: string) => {
    setSelectedPath((prev) => (prev === path ? null : path));
  }, []);

  return { expanded, toggle, expandAll, collapseAll, selectedPath, selectPath };
}
