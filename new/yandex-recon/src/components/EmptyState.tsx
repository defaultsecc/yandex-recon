import { Crosshair, Search } from 'lucide-react';

interface Props { hasGenerated: boolean; }

export function EmptyState({ hasGenerated }: Props) {
  if (!hasGenerated) {
    return (
      <div className="glass-card rounded-2xl p-16 text-center border border-red-900/15">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="w-16 h-16 rounded-2xl bg-red-950/40 border border-red-800/25 flex items-center justify-center">
            <Crosshair size={28} className="text-red-600/50" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-red-600/10 blur-xl" />
        </div>
        <h3 className="text-base font-mono font-semibold text-white/50 mb-2">
          <span className="text-red-500/50">{'>'}</span> awaiting target
        </h3>
        <p className="text-sm text-white/25 max-w-sm mx-auto leading-relaxed font-mono">
          enter a target domain and generate<br />Yandex reconnaissance queries.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-12 text-center border border-red-900/15">
      <div className="w-14 h-14 rounded-2xl bg-red-950/30 border border-red-900/20 flex items-center justify-center mx-auto mb-4">
        <Search size={22} className="text-red-700/40" />
      </div>
      <h3 className="text-sm font-mono font-semibold text-white/40 mb-2">no queries match</h3>
      <p className="text-xs text-white/25 max-w-xs mx-auto font-mono">
        adjust your filters or clear the search
      </p>
    </div>
  );
}
