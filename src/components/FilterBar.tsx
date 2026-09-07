import type { Category, Severity, Engine } from '../types/dork';

const CATEGORIES: Array<Category | 'All' | 'Favorites'> = [
  'All', 'Subdomains', 'Open Directories', 'Sensitive Files', 'Admin & Login', 'Recon', 'Custom', 'Favorites'
];
const SEVERITIES: Severity[] = ['Critical', 'High', 'Info'];
const ENGINES: Engine[] = ['yandex.com', 'yandex.ru'];

interface Props {
  selectedCategory: Category | 'All' | 'Favorites';
  selectedSeverities: Set<Severity>;
  selectedEngine: Engine;
  onCategoryChange: (cat: Category | 'All' | 'Favorites') => void;
  onSeverityToggle: (sev: Severity) => void;
  onEngineChange: (engine: Engine) => void;
  hasGenerated: boolean; // eslint-disable-line
}

function Pill({
  active, onClick, children, color,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: 'red' | 'orange' | 'blue';
}) {
  const colorActive = {
    red: 'bg-red-500/15 border-red-500/45 text-red-400 shadow-[0_0_10px_rgba(220,38,38,0.15)]',
    orange: 'bg-orange-500/12 border-orange-500/35 text-orange-400',
    blue: 'bg-blue-500/12 border-blue-500/30 text-blue-400',
  };

  const activeClass = color ? colorActive[color] : 'pill-active';

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 whitespace-nowrap font-mono ${
        active
          ? activeClass
          : 'border-red-900/20 bg-red-950/10 text-white/30 hover:border-red-700/30 hover:text-white/50'
      }`}
    >
      {children}
    </button>
  );
}

export function FilterBar({
  selectedCategory, selectedSeverities, selectedEngine,
  onCategoryChange, onSeverityToggle, onEngineChange,
}: Props) {
  return (
    <div className="glass-card rounded-2xl p-5 space-y-4">
      {/* Category */}
      <div>
        <p className="text-[10px] text-red-500/30 font-mono mb-2.5 tracking-[0.2em] uppercase">// category</p>
        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-thin pb-1">
          {CATEGORIES.map((cat) => (
            <Pill key={cat} active={selectedCategory === cat} onClick={() => onCategoryChange(cat)}>
              {cat}
            </Pill>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Severity */}
        <div className="flex-1">
          <p className="text-[10px] text-red-500/30 font-mono mb-2.5 tracking-[0.2em] uppercase">// severity</p>
          <div className="flex flex-wrap gap-2">
            {SEVERITIES.map((sev) => (
              <Pill
                key={sev}
                active={selectedSeverities.has(sev)}
                onClick={() => onSeverityToggle(sev)}
                color={sev === 'Critical' ? 'red' : sev === 'High' ? 'orange' : 'blue'}
              >
                {sev}
              </Pill>
            ))}
          </div>
        </div>

        {/* Engine */}
        <div>
          <p className="text-[10px] text-red-500/30 font-mono mb-2.5 tracking-[0.2em] uppercase">// engine</p>
          <div className="flex gap-2">
            {ENGINES.map((eng) => (
              <Pill key={eng} active={selectedEngine === eng} onClick={() => onEngineChange(eng)}>
                {eng === 'yandex.com' ? 'Yandex.com' : 'Yandex.ru'}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
