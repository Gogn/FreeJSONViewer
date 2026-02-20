import { useState } from 'react';
import { Settings } from '../types';

const DEFAULT: Settings = { errorMode: 'disable' };

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = localStorage.getItem('jv-settings');
      return stored ? { ...DEFAULT, ...JSON.parse(stored) } : DEFAULT;
    } catch {
      return DEFAULT;
    }
  });

  const save = (next: Settings) => {
    setSettings(next);
    localStorage.setItem('jv-settings', JSON.stringify(next));
  };

  return { settings, save };
}
