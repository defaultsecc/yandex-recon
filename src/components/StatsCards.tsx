import type { GeneratedDork } from '../types/dork';
import { Hash, AlertOctagon, AlertTriangle, Info } from 'lucide-react';

interface Props {
  dorks: GeneratedDork[];
  filtered: boolean;
}

export function StatsCards({ dorks, filtered }: Props) {
  const total = dorks.length;
  const critical = dorks.filter((d) => d.severity === 'Critical').length;
  const high = dorks.filter((d) => d.severity === 'High').length;
  const info = dorks.filter((d) => d.severity === 'Info').length;

  const stats = [
    {
      label: 'Total',
      value: total,
      icon: Hash,
      valueClass: 'text-white/80',
      bg: 'bg-red-950/20',
      border: 'border-red-900/20',
      glow: '',
      labelClass: 'text-white/25',
    },
    {
      label: 'Critical',
      value: critical,
      icon: AlertOctagon,
      valueClass: 'text-red-400',
      bg: 'bg-red-900/10',
      border: 'border-red-700/25',
      glow: 'stat-glow-critical',
      labelClass: 'text-red-500/40',
    },
    {
      label: 'High',
      value: high,
      icon: AlertTriangle,
      valueClass: 'text-orange-400',
      bg: 'bg-orange-950/10',
      border: 'border-orange-800/20',
      glow: 'stat-glow-high',
      labelClass: 'text-orange-500/40',
    },
    {
      label: 'Info',
      value: info,
      icon: Info,
      valueClass: 'text-blue-400',
      bg: 'bg-blue-950/10',
      border: 'border-blue-800/20',
      glow: 'stat-glow-info',
      labelClass: 'text-blue-500/40',
    },
  ];

  return (
    <div>
      {filtered && (
        <p className="text-[10px] text-red-500/30 font-mono mb-2 tracking-widest">// filtered results</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`${s.bg} ${s.glow} border ${s.border} rounded-xl p-4 text-center transition-all duration-300`}
            >
              <Icon size={15} className={`${s.valueClass} mx-auto mb-2 opacity-60`} />
              <div className={`text-2xl font-bold font-mono ${s.valueClass} mb-0.5 tabular-nums`}>{s.value}</div>
              <div className={`text-[10px] font-mono tracking-widest uppercase ${s.labelClass}`}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
