import type { GeneratedDork } from '../types/dork';

function downloadFile(content: string, filename: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportTxt(dorks: GeneratedDork[], domain: string): void {
  const lines = dorks.map((d) => `[${d.title}]\n${d.query}`).join('\n\n');
  const header = `# Yandex Recon — ${domain}\n# Generated: ${new Date().toISOString()}\n# Passive OSINT — queries generated locally\n\n`;
  downloadFile(header + lines, `yandex-recon-${domain}.txt`, 'text/plain');
}

export function exportJson(dorks: GeneratedDork[], domain: string): void {
  const data = {
    meta: {
      tool: 'Yandex Recon',
      target: domain,
      generated: new Date().toISOString(),
      count: dorks.length,
    },
    dorks: dorks.map((d) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      severity: d.severity,
      query: d.query,
      description: d.description,
    })),
  };
  downloadFile(JSON.stringify(data, null, 2), `yandex-recon-${domain}.json`, 'application/json');
}

export function exportCsv(dorks: GeneratedDork[], domain: string): void {
  const header = 'title,category,severity,query,description\n';
  const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const rows = dorks
    .map((d) => [escape(d.title), escape(d.category), escape(d.severity), escape(d.query), escape(d.description)].join(','))
    .join('\n');
  downloadFile(header + rows, `yandex-recon-${domain}.csv`, 'text/csv');
}
