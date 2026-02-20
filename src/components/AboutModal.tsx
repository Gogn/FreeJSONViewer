import { useEffect, useCallback } from 'react';

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  const PAYPAL_URL = import.meta.env.VITE_PAYPAL_URL;

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
          A minimal, browser-based tool for exploring and editing JSON. Completely free and open
          source. No data tracking, no ads, no analytics, no telemetry. Your data stays in your
          browser. Built with React and TypeScript, available on GitHub.
        </p>

        <br></br>

        <p className="about-description">
          If it saves you time every day, consider buying me a coffee
        </p>
        <p className="support-text">
          <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">{PAYPAL_URL}</a>
        </p>
      </div>
    </div>
  );
}
