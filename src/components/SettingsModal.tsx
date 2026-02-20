import { useState, useEffect, useCallback } from 'react';
import { Settings, ErrorMode } from '../types';

const ERROR_MODE_OPTIONS: { value: ErrorMode; label: string; description: string }[] = [
  {
    value: 'disable',
    label: 'Disable tree view',
    description: 'Tree Viewer tab is disabled until JSON is valid',
  },
  { value: 'inline', label: 'Inline error', description: 'Show error message below the editor' },
  { value: 'banner', label: 'Error banner', description: 'Show a dismissable banner at the top' },
  { value: 'both', label: 'Inline + banner', description: 'Show both inline message and banner' },
];

interface SettingsModalProps {
  settings: Settings;
  onSave: (settings: Settings) => void;
  onClose: () => void;
}

export default function SettingsModal({ settings, onSave, onClose }: SettingsModalProps) {
  const [draft, setDraft] = useState<Settings>(settings);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Settings</span>
          <button className="icon-btn" onClick={onClose} title="Close">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p className="modal-section-title">Error Handling</p>
        <div className="modal-radio-group">
          {ERROR_MODE_OPTIONS.map((opt) => (
            <label key={opt.value} className="modal-radio-label">
              <input
                type="radio"
                name="errorMode"
                value={opt.value}
                checked={draft.errorMode === opt.value}
                onChange={() => setDraft((d) => ({ ...d, errorMode: opt.value }))}
              />
              <span>
                <span className="modal-radio-name">{opt.label}</span>
                <span className="modal-radio-desc">{opt.description}</span>
              </span>
            </label>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
