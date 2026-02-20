import { useState, useEffect } from 'react';
import { ParseResult } from '../types';
import { parseJson } from '../utils/jsonUtils';

export function useJsonParser(input: string, delay = 300): ParseResult {
  const [result, setResult] = useState<ParseResult>(() => parseJson(input));

  useEffect(() => {
    const id = setTimeout(() => setResult(parseJson(input)), delay);
    return () => clearTimeout(id);
  }, [input, delay]);

  return result;
}
