interface ErrorDisplayProps {
  error: string;
  onDismiss: () => void;
}

export default function ErrorDisplay({ error, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="error-banner">
      <span className="error-banner-msg">
        <span className="error-banner-icon">!</span>
        {error}
      </span>
      <button className="error-banner-close" onClick={onDismiss} title="Dismiss">
        ×
      </button>
    </div>
  );
}
