import { ErrorMode } from '../../types';
import { formatJson, minifyJson } from '../../utils/jsonUtils';

interface RawTextProps {
  value: string;
  onChange: (v: string) => void;
  error: string | null;
  errorMode: ErrorMode;
}

export default function RawText({ value, onChange, error, errorMode }: RawTextProps) {
  const showInline = error && (errorMode === 'inline' || errorMode === 'both');
  const showBorderError = showInline;

  const handleFormat = () => onChange(formatJson(value));
  const handleMinify = () => onChange(minifyJson(value));

  return (
    <div className="raw-tab">
      <div className="raw-toolbar">
        <button className="btn" onClick={handleFormat} disabled={!value.trim()}>
          Format
        </button>
        <button className="btn" onClick={handleMinify} disabled={!value.trim()}>
          Minify
        </button>
        {value.trim() && (
          <>
            <div className="toolbar-separator" />
            <button className="btn" onClick={() => onChange('')}>
              Clear
            </button>
          </>
        )}
      </div>

      <textarea
        className={`raw-editor${showBorderError ? ' error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'Paste or type JSON here...\n\n{\n  "example": "value"\n}'}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
      />

      {showInline && <div className="raw-error-inline">{error}</div>}
    </div>
  );
}
