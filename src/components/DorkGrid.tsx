import type { GeneratedDork, Engine, ViewMode, Category } from '../types/dork';
import { DorkCard } from './DorkCard';

interface Props {
  dorks: GeneratedDork[];
  engine: Engine;
  viewMode: ViewMode;
  onToggleFavorite: (id: string) => void;
}

const CATEGORY_ORDER: Array<Category | string> = [
  'Subdomains', 'Open Directories', 'Sensitive Files', 'Admin & Login', 'Recon', 'Custom',
];

export function DorkGrid({ dorks, engine, viewMode, onToggleFavorite }: Props) {
  const grouped: Record<string, GeneratedDork[]> = {};
  for (const dork of dorks) {
    if (!grouped[dork.category]) grouped[dork.category] = [];
    grouped[dork.category].push(dork);
  }

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <div className="space-y-10">
      {sortedCategories.map((category) => (
        <section key={category}>
          {/* Section heading — terminal style */}
          <h2 className="text-xs font-mono tracking-[0.2em] text-red-500/40 uppercase mb-4 flex items-center gap-3">
            <span className="text-red-700/30">{'>'}</span>
            <span>{category}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-red-900/30 to-transparent" />
            <span className="text-red-700/30 tabular-nums">{grouped[category].length}</span>
          </h2>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grouped[category].map((dork) => (
                <DorkCard key={dork.id} dork={dork} engine={engine} viewMode="grid" onToggleFavorite={onToggleFavorite} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {grouped[category].map((dork) => (
                <DorkCard key={dork.id} dork={dork} engine={engine} viewMode="list" onToggleFavorite={onToggleFavorite} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
