import { useState } from 'react';
import { Copy, ExternalLink, Check, Plus, Terminal } from 'lucide-react';
import type { Engine } from '../types/dork';
import { copyToClipboard } from '../lib/clipboard';
import { openInYandex } from '../lib/yandex';

const OPERATORS = ['site:', 'host:', 'rhost:', 'url:', 'inurl:', 'intitle:', 'mime:', 'ext:', ''];
const LOGIC = ['AND', 'OR', 'NOT'] as const;

interface Props {
  target: string;
  engine: Engine;
  onAddCustomDork: (query: string, title: string) => void;
}

export function CustomDorkBuilder({ target, engine, onAddCustomDork }: Props) {
  const [op1, setOp1] = useState('site:');
  const [val1, setVal1] = useState(target || 'example.com');
  const [logic, setLogic] = useState<'AND' | 'OR' | 'NOT'>('AND');
  const [op2, setOp2] = useState('inurl:');
  const [val2, setVal2] = useState('admin');
  const [freeform, setFreeform] = useState('');
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const [customTitle, setCustomTitle] = useState('custom dork');

  const builtQuery = [
    op1 + val1,
    logic === 'NOT' ? `-${op2}${val2}` : logic === 'OR' ? `OR ${op2}${val2}` : `${op2}${val2}`,
  ].filter(Boolean).join(' ').trim();

  const handleCopyBuilt = async () => {
    await copyToClipboard(builtQuery);
    setCopied1(true); setTimeout(() => setCopied1(false), 1500);
  };

  const handleCopyFree = async () => {
    await copyToClipboard(freeform);
    setCopied2(true); setTimeout(() => setCopied2(false), 1500);
  };

  const selectClass = "input-field rounded-lg px-2 py-2 text-xs font-mono cursor-pointer";

  return (
    <div className="glass-card rounded-2xl p-6 space-y-6 border border-red-900/20">
      <div className="flex items-center gap-2">
        <Terminal size={14} className="text-red-500/50" />
        <h3 className="text-xs font-mono text-red-400/60 tracking-widest">// custom dork builder</h3>
      </div>

      {/* Builder form */}
      <div className="space-y-4">
        <p className="text-[11px] font-mono text-white/20">compose a query from operators + values</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex gap-2">
            <select value={op1} onChange={(e) => setOp1(e.target.value)} aria-label="First operator" className={`${selectClass} w-28 shrink-0`}>
              {OPERATORS.map((o) => <option key={o || 'none'} value={o}>{o || '(none)'}</option>)}
            </select>
            <input type="text" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="value" aria-label="First value"
              className="input-field rounded-lg px-3 py-2 text-xs font-mono flex-1" />
          </div>

          <div className="flex gap-2 items-center">
            <select value={logic} onChange={(e) => setLogic(e.target.value as typeof logic)} aria-label="Logic" className={`${selectClass} w-20 shrink-0`}>
              {LOGIC.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={op2} onChange={(e) => setOp2(e.target.value)} aria-label="Second operator" className={`${selectClass} w-24 shrink-0`}>
              {OPERATORS.map((o) => <option key={o || 'none'} value={o}>{o || '(none)'}</option>)}
            </select>
            <input type="text" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="value" aria-label="Second value"
              className="input-field rounded-lg px-3 py-2 text-xs font-mono flex-1" />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-black/60 border border-red-900/15 rounded-lg px-4 py-3">
          <p className="text-[9px] font-mono text-red-500/25 mb-1.5 tracking-[0.2em]">// preview</p>
          <div className="query-text">{builtQuery || 'configure operators above...'}</div>
        </div>

        {/* Title + actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input type="text" value={customTitle} onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="query title" aria-label="Custom query title"
            className="input-field rounded-lg px-3 py-2 text-xs font-mono flex-1" />
          <div className="flex gap-2">
            <button onClick={handleCopyBuilt} aria-label="Copy built query"
              className={`h-9 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${copied1 ? 'bg-emerald-500/12 border border-emerald-500/25 text-emerald-400' : 'btn-ghost'}`}>
              {copied1 ? <Check size={12} /> : <Copy size={12} />} copy
            </button>
            <button onClick={() => openInYandex(builtQuery, engine)} aria-label="Run on Yandex"
              className="h-9 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 bg-red-500/8 border border-red-500/18 text-red-400/70 hover:bg-red-500/14 transition-all">
              <ExternalLink size={12} /> yandex
            </button>
            <button onClick={() => builtQuery && onAddCustomDork(builtQuery, customTitle || 'custom dork')} aria-label="Add to results"
              className="h-9 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 btn-primary">
              <Plus size={12} /> add
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-red-900/15 pt-5">
        <p className="text-[11px] font-mono text-white/20 mb-3">// or enter a free-form query</p>
        <textarea value={freeform} onChange={(e) => setFreeform(e.target.value)}
          placeholder={`site:${target || 'example.com'} inurl:api`}
          aria-label="Freeform custom query" rows={2}
          className="input-field w-full rounded-xl px-4 py-3 text-xs font-mono resize-none" />
        <div className="flex gap-2 mt-2">
          <button onClick={handleCopyFree} aria-label="Copy freeform"
            className={`h-8 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${copied2 ? 'bg-emerald-500/12 border border-emerald-500/25 text-emerald-400' : 'btn-ghost'}`}>
            {copied2 ? <Check size={12} /> : <Copy size={12} />} copy
          </button>
          <button onClick={() => freeform.trim() && openInYandex(freeform.trim(), engine)} aria-label="Run freeform on Yandex"
            className="h-8 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 bg-red-500/8 border border-red-500/18 text-red-400/70 hover:bg-red-500/14 transition-all">
            <ExternalLink size={12} /> run on yandex
          </button>
          <button onClick={() => freeform.trim() && onAddCustomDork(freeform.trim(), 'custom freeform dork')} aria-label="Add to results"
            className="h-8 px-3 rounded-lg text-xs font-mono flex items-center gap-1.5 btn-primary">
            <Plus size={12} /> add
          </button>
        </div>
      </div>
    </div>
  );
}
