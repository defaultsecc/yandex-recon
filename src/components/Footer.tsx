import { Crosshair, Github, Terminal } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 pb-10 pt-8">
      {/* Top border with red gradient */}
      <div className="h-px section-line mb-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
        <div className="flex items-center gap-2 font-mono">
          <Crosshair size={13} className="text-red-600/40" />
          <span className="text-red-500/40">defaultsec</span>
          <span className="text-red-700/30">/</span>
          <span className="text-white/30">yandex-recon</span>
          <span className="text-red-700/30">·</span>
          <span>passive OSINT query generator</span>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="flex items-center gap-1.5">
            <Terminal size={11} className="text-red-700/30" />
            <span>queries generated locally in your browser</span>
          </div>
          <span className="text-red-900/40">|</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-red-400/50 transition-colors"
            aria-label="View on GitHub"
          >
            <Github size={12} />
            open source
          </a>
        </div>
      </div>
    </footer>
  );
}
