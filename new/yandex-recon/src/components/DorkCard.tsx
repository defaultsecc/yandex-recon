import { useState } from 'react';
import { Copy, Check, ExternalLink, Star } from 'lucide-react';
import type { GeneratedDork, Engine } from '../types/dork';
import { copyToClipboard } from '../lib/clipboard';
import { openInYandex } from '../lib/yandex';

interface Props {
  dork: GeneratedDork;
  engine: Engine;
  viewMode: 'grid' | 'list';
  onToggleFavorite: (id: string) => void;
}

const SEVERITY_CLASSES = {
  Critical: 'severity-critical',
  High: 'severity-high',
  Info: 'severity-info',
};

export function DorkCard({ dork, engine, viewMode, onToggleFavorite }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(dork.query);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1500); }
  };

  const handleRun = () => openInYandex(dork.query, engine);

  if (viewMode === 'list') {
    return (
      <div className="glass-card glass-card-hover rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="category-badge px-2 py-0.5 rounded-md">{dork.category}</span>
            <span className={`${SEVERITY_CLASSES[dork.severity]} px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono`}>
              {dork.severity}
            </span>
            <span className="text-sm font-medium text-white/75">{dork.title}</span>
          </div>
          <div className="query-text bg-black/50 rounded-lg px-3 py-2 mb-2 border border-red-900/15">{dork.query}</div>
          <p className="text-xs text-white/35 leading-relaxed">{dork.description}</p>
        </div>
        <div className="flex sm:flex-col gap-2 sm:shrink-0">
          <button onClick={handleCopy} aria-label="Copy query"
            className={`h-8 px-3 rounded-lg text-xs flex items-center gap-1.5 font-mono transition-all ${copied ? 'copied-flash' : 'btn-ghost'}`}>
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'copied' : 'copy'}
          </button>
          <button onClick={handleRun} aria-label={`Run on ${engine}`}
            className="h-8 px-3 rounded-lg text-xs flex items-center gap-1.5 font-mono bg-red-500/8 border border-red-500/20 text-red-400/80 hover:bg-red-500/14 hover:border-red-500/30 transition-all">
            <ExternalLink size={12} />
            yandex
          </button>
          <button onClick={() => onToggleFavorite(dork.id)} aria-label={dork.isFavorite ? 'Unfavorite' : 'Favorite'}
            className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${dork.isFavorite ? 'text-yellow-400 bg-yellow-400/8' : 'btn-ghost'}`}>
            <Star size={12} fill={dork.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card glass-card-hover rounded-xl p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <span className="category-badge px-2 py-0.5 rounded-md w-fit">{dork.category}</span>
          <span className="text-sm font-medium text-white/80 leading-snug">{dork.title}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`${SEVERITY_CLASSES[dork.severity]} px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono whitespace-nowrap`}>
            {dork.severity}
          </span>
          <button
            onClick={() => onToggleFavorite(dork.id)}
            aria-label={dork.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`p-1 rounded-md transition-colors ${dork.isFavorite ? 'text-yellow-400' : 'text-white/15 hover:text-white/40'}`}
          >
            <Star size={13} fill={dork.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Query box */}
      <div className="bg-black/60 border border-red-900/15 rounded-lg px-3 py-2.5">
        <div className="query-text">{dork.query}</div>
      </div>

      {/* Description */}
      <p className="text-xs text-white/35 leading-relaxed flex-1">{dork.description}</p>

      {/* Actions */}
      <div className="flex gap-2 pt-0.5">
        <button onClick={handleCopy} aria-label="Copy query"
          className={`flex-1 h-8 rounded-lg text-xs flex items-center justify-center gap-1.5 font-mono font-medium transition-all ${
            copied ? 'bg-emerald-500/12 border border-emerald-500/25 text-emerald-400' : 'btn-ghost'
          }`}>
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'copied!' : 'copy'}
        </button>
        <button onClick={handleRun} aria-label={`Run on ${engine}`}
          className="flex-1 h-8 rounded-lg text-xs flex items-center justify-center gap-1.5 font-mono font-medium bg-red-500/8 border border-red-500/18 text-red-400/80 hover:bg-red-500/14 hover:border-red-400/28 hover:text-red-300 transition-all">
          <ExternalLink size={12} />
          run on yandex
        </button>
      </div>
    </div>
  );
}
