export type Theme = 'dark' | 'light';

export type ErrorMode = 'disable' | 'inline' | 'banner' | 'both';

export type ActiveTab = 'raw' | 'tree';

export interface Settings {
  errorMode: ErrorMode;
}

export interface ParseResult {
  data: unknown;
  error: string | null;
}
