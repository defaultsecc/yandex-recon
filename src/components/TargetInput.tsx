import { useState, useRef, KeyboardEvent } from 'react';
import { Search, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { normalizeDomain } from '../lib/domain';

interface Props {
  onGenerate: (domain: string) => void;
  history: string[];
  onClearHistory: () => void;
  onSelectHistory: (domain: string) => void;
}

export function TargetInput({ onGenerate, history, onClearHistory, onSelectHistory }: Props) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    const trimmed = value.trim();
    if (!trimmed) { setError('enter a target domain — e.g. example.com'); return; }
    const normalized = normalizeDomain(trimmed);
    if (!normalized) { setError('invalid domain — try example.com or sub.example.com'); return; }
    setError('');
    setShowHistory(false);
    onGenerate(normalized);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleGenerate();
    if (e.key === 'Escape') setShowHistory(false);
  };

  const handleSelectHistory = (domain: string) => {
    setValue(domain);
    setShowHistory(false);
    setError('');
    onSelectHistory(domain);
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 relative border border-red-900/20">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent rounded-full" />

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Input */}
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/30">
            <Search size={17} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError('');
              setShowHistory(e.target.value.length === 0 && history.length > 0);
            }}
            onFocus={() => { if (!value && history.length > 0) setShowHistory(true); }}
            onBlur={() => setTimeout(() => setShowHistory(false), 150)}
            onKeyDown={handleKey}
            placeholder="target.com"
            aria-label="Target domain"
            autoComplete="off"
            spellCheck={false}
            className="input-field w-full h-12 rounded-xl pl-11 pr-4 font-mono text-sm"
          />

          {/* History dropdown */}
          {showHistory && history.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/60 border border-red-900/20">
              <div className="flex items-center justify-between px-4 py-2 border-b border-red-900/15">
                <span className="text-[10px] text-red-500/30 font-mono flex items-center gap-1.5 tracking-widest">
                  <Clock size={11} /> // recent targets
                </span>
                <button onClick={onClearHistory} className="text-[10px] font-mono text-red-500/30 hover:text-red-400/60 transition-colors">
                  clear
                </button>
              </div>
              {history.slice(0, 10).map((domain) => (
                <button key={domain} onClick={() => handleSelectHistory(domain)}
                  className="w-full text-left px-4 py-2.5 font-mono text-sm text-white/50 hover:bg-red-900/15 hover:text-white/80 transition-colors border-b border-red-900/8 last:border-0">
                  <span className="text-red-600/30 mr-2">$</span>{domain}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Generate button */}
        <button onClick={handleGenerate} className="btn-primary h-12 px-7 rounded-xl font-semibold text-sm flex items-center gap-2 whitespace-nowrap font-mono"
          aria-label="Generate dork queries">
          <Sparkles size={15} />
          generate dorks
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-400/80 text-xs font-mono">
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}

      {/* Hint */}
      {!error && (
        <p className="mt-3 text-[11px] font-mono text-white/18">
          accepts:{' '}
          {['example.com', 'sub.example.com', 'https://example.com/'].map((ex) => (
            <code key={ex} className="text-red-400/30 bg-red-900/10 px-1 rounded mx-0.5">{ex}</code>
          ))}
          {' '}— normalized automatically
        </p>
      )}
    </div>
  );
}
