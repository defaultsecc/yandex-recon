export type Category =
  | 'Subdomains'
  | 'Open Directories'
  | 'Sensitive Files'
  | 'Admin & Login'
  | 'Recon'
  | 'Custom';

export type Severity = 'Critical' | 'High' | 'Info';

export type Engine = 'yandex.com' | 'yandex.ru';

export interface Dork {
  id: string;
  category: Category;
  severity: Severity;
  title: string;
  description: string;
  query: (domain: string) => string;
}

export interface GeneratedDork {
  id: string;
  category: Category;
  severity: Severity;
  title: string;
  description: string;
  query: string;
  isFavorite: boolean;
}

export interface CustomDork {
  id: string;
  category: 'Custom';
  severity: 'Info';
  title: string;
  description: string;
  query: string;
  isFavorite: boolean;
}

export type AnyDork = GeneratedDork | CustomDork;

export interface Operator {
  name: string;
  syntax: string;
  description: string;
  example: string;
  category: string;
}

export type ViewMode = 'grid' | 'list';

export interface AppState {
  target: string;
  generatedDorks: GeneratedDork[];
  selectedCategory: Category | 'All' | 'Favorites';
  selectedSeverities: Set<Severity>;
  selectedEngine: Engine;
  viewMode: ViewMode;
  searchQuery: string;
  favorites: Set<string>;
  history: string[];
}
