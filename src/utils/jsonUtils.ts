import { ParseResult } from '../types';

export function parseJson(text: string): ParseResult {
  const trimmed = text.trim();
  if (!trimmed) return { data: undefined, error: null };
  try {
    return { data: JSON.parse(trimmed), error: null };
  } catch (e) {
    return { data: undefined, error: (e as Error).message };
  }
}

export function formatJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text;
  }
}

export function minifyJson(text: string): string {
  try {
    return JSON.stringify(JSON.parse(text));
  } catch {
    return text;
  }
}

export function collectAllPaths(value: unknown, path = ''): Set<string> {
  const paths = new Set<string>([path]);
  if (value !== null && typeof value === 'object') {
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        const childPath = path ? `${path}[${i}]` : `[${i}]`;
        collectAllPaths(item, childPath).forEach((p) => paths.add(p));
      });
    } else {
      Object.keys(value as Record<string, unknown>).forEach((key) => {
        const childPath = path ? `${path}.${key}` : key;
        collectAllPaths((value as Record<string, unknown>)[key], childPath).forEach((p) =>
          paths.add(p),
        );
      });
    }
  }
  return paths;
}

export function nodeMatchesSearch(
  key: string | number | null,
  value: unknown,
  search: string,
): boolean {
  if (!search) return false;
  const q = search.toLowerCase();
  if (key !== null && String(key).toLowerCase().includes(q)) return true;
  if (typeof value === 'string' && value.toLowerCase().includes(q)) return true;
  if (typeof value === 'number' && String(value).includes(q)) return true;
  if (typeof value === 'boolean' && String(value).includes(q)) return true;
  return false;
}

export function formatDisplayPath(path: string): string {
  if (!path) return '$';
  if (path.startsWith('[')) return `$${path}`;
  return `$.${path}`;
}
