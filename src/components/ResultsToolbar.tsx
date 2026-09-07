import { useState } from 'react';
import { LayoutGrid, List, Search, Copy, Download, Check } from 'lucide-react';
import type { GeneratedDork, ViewMode } from '../types/dork';
import { copyToClipboard } from '../lib/clipboard';
import { exportTxt, exportJson, exportCsv } from '../lib/export';

interface Props {
  dorks: GeneratedDork[];
  allDorks: GeneratedDork[];
  target: string;
  viewMode: ViewMode;
  searchQuery: string;
  onViewModeChange: (mode: ViewMode) => void;
  onSearchChange: (q: string) => void;
}

export function ResultsToolbar({ dorks, allDorks, target, viewMode, searchQuery, onViewModeChange, onSearchChange }: Props) {
  const [copied, setCopied] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const handleCopyAll = async () => {
    const text = dorks.map((d) => `[${d.title}]\n${d.query}`).join('\n\n');
    const ok = await copyToClipboard(text);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      {/* Left */}
      <div className="flex items-center gap-2 text-sm flex-1 font-mono">
        <span className="text-red-500/40">{'>'}</span>
        <span className="text-white/70 font-semibold tabular-nums">{dorks.length}</span>
        <span className="text-white/20">queries</span>
        <span className="text-red-900/40">·</span>
        <span className="flex items-center gap-1.5 text-white/30">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 pulse-red" />
          <span className="text-xs">{target}</span>
        </span>
        {dorks.length !== allDorks.length && (
          <span className="text-xs text-red-500/30">(of {allDorks.length})</span>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-red-500/25" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="filter queries..."
            aria-label="Filter queries"
            className="input-field h-8 pl-8 pr-3 rounded-lg text-xs font-mono w-36 sm:w-44"
          />
        </div>

        {/* View mode */}
        <div className="flex rounded-lg overflow-hidden border border-red-900/20">
          <button onClick={() => onViewModeChange('grid')} aria-label="Grid view"
            className={`h-8 w-8 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-red-900/30 text-red-400' : 'bg-red-950/10 text-white/20 hover:text-white/40'}`}>
            <LayoutGrid size={13} />
          </button>
          <button onClick={() => onViewModeChange('list')} aria-label="List view"
            className={`h-8 w-8 flex items-center justify-center transition-colors border-l border-red-900/20 ${viewMode === 'list' ? 'bg-red-900/30 text-red-400' : 'bg-red-950/10 text-white/20 hover:text-white/40'}`}>
            <List size={13} />
          </button>
        </div>

        {/* Copy All */}
        <button onClick={handleCopyAll} aria-label="Copy all queries"
          className={`h-8 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${copied ? 'copied-flash' : 'btn-ghost'}`}>
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? `${dorks.length} copied` : 'copy all'}
        </button>

        {/* Export */}
        <div className="relative">
          <button onClick={() => setShowExport(!showExport)} aria-label="Export queries"
            className="btn-ghost h-8 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5">
            <Download size={12} />
            export
          </button>
          {showExport && (
            <div className="absolute right-0 top-full mt-1 glass-card rounded-xl overflow-hidden z-50 w-36 shadow-2xl shadow-black/50 border border-red-900/20">
              {[
                { label: 'export .txt', fn: () => exportTxt(dorks, target) },
                { label: 'export .json', fn: () => exportJson(dorks, target) },
                { label: 'export .csv', fn: () => exportCsv(dorks, target) },
              ].map(({ label, fn }) => (
                <button key={label} onClick={() => { fn(); setShowExport(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs font-mono text-white/40 hover:bg-red-900/15 hover:text-white/70 transition-colors border-b border-red-900/10 last:border-0">
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
