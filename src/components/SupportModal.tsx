import { useEffect, useCallback } from 'react';

const PAYPAL_URL = import.meta.env.VITE_PAYPAL_URL;

interface supportModalProps {
  onClose: () => void;
}

const HeartIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function SupportModal({ onClose }: supportModalProps) {
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

  const handlesupport = () => {
    window.open(PAYPAL_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal support-modal" onClick={(e) => e.stopPropagation()}>
        <button className="icon-btn support-modal-close" onClick={onClose} title="Close">
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

        <div className="support-heart">
          <HeartIcon />
        </div>

        <h2 className="support-title">Support this project</h2>

        <p className="support-text">
          JSON Viewer is free, open-source, and will stay that way. If it saves you time every day,
          consider buying me a coffee — it keeps the project alive and motivates new features.
        </p>
        <p className="support-text">
          <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">{PAYPAL_URL}</a>
        </p>

        <ul className="support-perks">
          <li>No ads, no tracking, no paywalls — ever</li>
          <li>Active development and bug fixes</li>
          <li>New features driven by the community</li>
        </ul>

        <button className="support-btn" onClick={handlesupport}>
          Support via PayPal
        </button>

        <p className="support-footer">Any amount means the world. Thank you.</p>
      </div>
    </div>
  );
}
