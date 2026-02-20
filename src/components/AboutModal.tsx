import { useEffect, useCallback } from 'react';

interface AboutModalProps {
  onClose: () => void;
}

const FEATURES = [
  {
    label: 'Tree Viewer',
    desc: 'Explore nested JSON with collapsible nodes and syntax highlighting.',
  },
  { label: 'Search', desc: 'Filter keys and values across the entire tree in real time.' },
  { label: 'JSON Path', desc: 'Click any node to reveal its path (e.g. $.user.address.city).' },
  { label: 'Format / Minify', desc: 'Pretty-print or compact your JSON with one click.' },
  {
    label: 'Error Handling',
    desc: 'Configurable modes: inline, banner, both, or disable tree view.',
  },
  { label: 'Theme', desc: 'Dark and light mode, persisted across sessions.' },
];

export default function AboutModal({ onClose }: AboutModalProps) {
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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal about-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">About JSON Viewer</span>
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

        <p className="about-description">
          A minimal, browser-based tool for exploring and editing JSON. Paste or type JSON to
          instantly visualise its structure, search through its contents, and copy paths to any node
          — no server, no tracking, everything stays in your browser.
        </p>

        <p className="modal-section-title" style={{ marginTop: '20px' }}>
          Features
        </p>
        <ul className="about-features">
          {FEATURES.map((f) => (
            <li key={f.label} className="about-feature-item">
              <span className="about-feature-label">{f.label}</span>
              <span className="about-feature-desc">{f.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
