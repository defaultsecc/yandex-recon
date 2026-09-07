import type { Operator } from '../types/dork';

export const OPERATORS: Operator[] = [
  {
    name: 'site:',
    syntax: 'site:example.com',
    description: 'Restrict results to pages indexed from a specific domain or subdomain.',
    example: 'site:example.com',
    category: 'Domain',
  },
  {
    name: 'host:',
    syntax: 'host:example.com',
    description: 'Match pages whose host header matches the given domain.',
    example: 'host:example.com',
    category: 'Domain',
  },
  {
    name: 'rhost:',
    syntax: 'rhost:com.example.*',
    description: 'Reversed-host wildcard. Useful for enumerating indexed subdomains. The domain is reversed and a wildcard appended.',
    example: 'rhost:com.example.*',
    category: 'Domain',
  },
  {
    name: 'url:',
    syntax: 'url:example.com/admin',
    description: 'Match pages whose URL contains the specified string or path.',
    example: 'url:example.com/admin',
    category: 'URL',
  },
  {
    name: 'mime:',
    syntax: 'mime:pdf',
    description: 'Filter results by MIME type. Supported values include pdf, doc, docx, xls, xlsx, ppt, pptx.',
    example: 'site:example.com mime:pdf',
    category: 'File',
  },
  {
    name: 'ext:',
    syntax: 'ext:txt',
    description: 'Filter results by file extension.',
    example: 'site:example.com ext:log',
    category: 'File',
  },
  {
    name: 'intitle:',
    syntax: 'intitle:"admin login"',
    description: 'Match pages whose HTML title contains the specified phrase.',
    example: 'site:example.com intitle:"admin login"',
    category: 'Content',
  },
  {
    name: 'inurl:',
    syntax: 'inurl:admin',
    description: 'Match pages whose URL contains the specified string.',
    example: 'site:example.com inurl:dashboard',
    category: 'URL',
  },
];
