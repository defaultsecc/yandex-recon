import { Crosshair, Shield, Terminal } from 'lucide-react';

export function Header() {
  return (
    <header className="pt-12 pb-10 text-center relative">

      {/* Top bar — brand + badge */}
      <div className="flex items-center justify-center gap-3 mb-8">

        {/* Logo */}
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/40 border border-red-500/20">
            <Crosshair size={21} className="text-red-100 icon-glow" strokeWidth={2.5} />
          </div>
          <div className="absolute inset-0 rounded-xl bg-red-600/30 blur-lg -z-10" />
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] font-mono tracking-[0.2em] text-red-500/60 uppercase select-none">
              defaultsec
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight brand-gradient">
              Yandex Recon
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-red-500/20 bg-red-500/5 text-red-500/50">
              v1.0
            </span>
          </div>
        </div>

        {/* Passive badge — desktop */}
        <div className="hidden sm:flex items-center gap-1.5 ml-6 px-3 py-1.5 rounded-full border border-red-900/40 bg-red-950/30 text-red-400/70 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-red" />
          passive OSINT · no traffic to target
        </div>
      </div>

      {/* Mobile badge */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 mb-6 px-3 py-1.5 rounded-full border border-red-900/40 bg-red-950/30 text-red-400/70 text-xs font-mono w-fit mx-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-red" />
        passive OSINT · no traffic to target
      </div>

      {/* Terminal-style eyebrow */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <Terminal size={13} className="text-red-600/50" />
        <span className="font-mono text-xs text-red-600/40 tracking-widest">
          for osint &amp; security research
        </span>
      </div>

      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
        <span className="gradient-text">Yandex dork</span>{' '}
        <span className="text-white/90">queries for recon,</span>
        <br className="hidden sm:block" />
        <span className="text-white/90">OSINT &amp; security research.</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-sm sm:text-base text-white/45 max-w-2xl mx-auto leading-relaxed mb-5">
        Generate targeted Yandex queries for authorized asset discovery, exposed files,
        indexed directories, public resources, and administrative interfaces.
        Uses operators:{' '}
        {['site:', 'host:', 'rhost:', 'url:', 'mime:', 'ext:'].map((op) => (
          <code
            key={op}
            className="font-mono text-red-400/70 text-xs bg-red-400/5 border border-red-400/10 px-1.5 py-0.5 rounded mx-0.5"
          >
            {op}
          </code>
        ))}
      </p>

      {/* Disclaimer */}
      <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-white/20 font-mono">
        <Shield size={11} className="text-red-700/40" />
        <span>authorized security research only — do not use against systems without permission</span>
      </div>

      {/* Bottom decorative line */}
      <div className="mt-8 h-px section-line mx-auto max-w-sm" />
    </header>
  );
}
