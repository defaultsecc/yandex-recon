import { useState, useCallback, useMemo } from 'react';
import type { Category, Severity, Engine, ViewMode, GeneratedDork } from './types/dork';
import { generateDorks } from './data/dorks';
import {
  getFavorites, saveFavorites,
  getHistory, addToHistory, clearHistory,
  getViewMode, saveViewMode,
  getEngine, saveEngine,
} from './lib/storage';

import { Header } from './components/Header';
import { TargetInput } from './components/TargetInput';
import { FilterBar } from './components/FilterBar';
import { StatsCards } from './components/StatsCards';
import { ResultsToolbar } from './components/ResultsToolbar';
import { DorkGrid } from './components/DorkGrid';
import { CustomDorkBuilder } from './components/CustomDorkBuilder';
import { EmptyState } from './components/EmptyState';
import { Footer } from './components/Footer';

export default function App() {
  const [target, setTarget] = useState('');
  const [allDorks, setAllDorks] = useState<GeneratedDork[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All' | 'Favorites'>('All');
  const [selectedSeverities, setSelectedSeverities] = useState<Set<Severity>>(new Set());
  const [selectedEngine, setSelectedEngine] = useState<Engine>(() => getEngine());
  const [viewMode, setViewMode] = useState<ViewMode>(() => getViewMode());
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(() => getFavorites());
  const [history, setHistory] = useState<string[]>(() => getHistory());

  // Sync engine preference
  const handleEngineChange = useCallback((engine: Engine) => {
    setSelectedEngine(engine);
    saveEngine(engine);
  }, []);

  // Sync view mode preference
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    saveViewMode(mode);
  }, []);

  const handleGenerate = useCallback((domain: string) => {
    setTarget(domain);
    const generated = generateDorks(domain).map((d) => ({
      ...d,
      isFavorite: favorites.has(d.id),
    }));
    setAllDorks(generated);
    setSelectedCategory('All');
    setSelectedSeverities(new Set());
    setSearchQuery('');

    const updated = addToHistory(domain);
    setHistory(updated);
  }, [favorites]);

  const handleSelectHistory = useCallback((domain: string) => {
    handleGenerate(domain);
  }, [handleGenerate]);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const handleToggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveFavorites(next);
      return next;
    });

    setAllDorks((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, isFavorite: !d.isFavorite } : d
      )
    );
  }, []);

  const handleToggleSeverity = useCallback((sev: Severity) => {
    setSelectedSeverities((prev) => {
      const next = new Set(prev);
      if (next.has(sev)) next.delete(sev);
      else next.add(sev);
      return next;
    });
  }, []);

  const handleCategoryChange = useCallback((cat: Category | 'All' | 'Favorites') => {
    setSelectedCategory(cat);
  }, []);

  const handleAddCustomDork = useCallback((query: string, title: string) => {
    if (!query.trim()) return;
    const customId = `custom-${Date.now()}`;
    const dork: GeneratedDork = {
      id: customId,
      category: 'Custom',
      severity: 'Info',
      title,
      description: 'User-defined custom dork query.',
      query,
      isFavorite: false,
    };
    setAllDorks((prev) => [...prev, dork]);
  }, []);

  // Filtered dorks
  const filteredDorks = useMemo(() => {
    let result = allDorks;

    // Apply favorites/category filter
    if (selectedCategory === 'Favorites') {
      result = result.filter((d) => d.isFavorite);
    } else if (selectedCategory !== 'All') {
      result = result.filter((d) => d.category === selectedCategory);
    }

    // Apply severity filter
    if (selectedSeverities.size > 0) {
      result = result.filter((d) => selectedSeverities.has(d.severity));
    }

    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.query.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allDorks, selectedCategory, selectedSeverities, searchQuery]);

  const hasGenerated = allDorks.length > 0;
  const isFiltered =
    selectedCategory !== 'All' || selectedSeverities.size > 0 || searchQuery.trim() !== '';

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        {/* Input */}
        <div className="space-y-3 mb-8">
          <TargetInput
            onGenerate={handleGenerate}
            history={history}
            onClearHistory={handleClearHistory}
            onSelectHistory={handleSelectHistory}
          />

          {/* Filters */}
          <FilterBar
            selectedCategory={selectedCategory}
            selectedSeverities={selectedSeverities}
            selectedEngine={selectedEngine}
            onCategoryChange={handleCategoryChange}
            onSeverityToggle={handleToggleSeverity}
            onEngineChange={handleEngineChange}
            hasGenerated={hasGenerated}
          />
        </div>

        {/* Custom builder - shown when Custom category selected */}
        {selectedCategory === 'Custom' && (
          <div className="mb-8">
            <CustomDorkBuilder
              target={target}
              engine={selectedEngine}
              onAddCustomDork={handleAddCustomDork}
            />
          </div>
        )}

        {/* Stats */}
        {hasGenerated && (
          <div className="mb-6">
            <StatsCards dorks={filteredDorks} filtered={isFiltered} />
          </div>
        )}

        {/* Results */}
        {hasGenerated && (
          <div className="mb-6">
            <div className="mb-4">
              <ResultsToolbar
                dorks={filteredDorks}
                allDorks={allDorks}
                target={target}
                viewMode={viewMode}
                searchQuery={searchQuery}
                onViewModeChange={handleViewModeChange}
                onSearchChange={setSearchQuery}
              />
            </div>

            {filteredDorks.length > 0 ? (
              <DorkGrid
                dorks={filteredDorks}
                engine={selectedEngine}
                viewMode={viewMode}
                onToggleFavorite={handleToggleFavorite}
              />
            ) : (
              <EmptyState hasGenerated={hasGenerated} />
            )}
          </div>
        )}

        {!hasGenerated && (
          <EmptyState hasGenerated={false} />
        )}

        <Footer />
      </div>
    </div>
  );
}
