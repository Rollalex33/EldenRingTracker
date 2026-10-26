import React, { useState, useMemo } from 'react';
import {
  Sword,
  Crosshair,
  Sparkles,
  Eye,
  Skull,
  Flame,
  Shield,
  Award,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  RotateCcw,
  Compass,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import bloodborneCatalog from '../../data/bloodborneCatalog.json';

const CATEGORY_ICONS = {
  armas_truco: Sword,
  armas_fuego: Crosshair,
  herramientas: Sparkles,
  runas_caryll: Eye,
  jefazos: Skull,
  calices: Flame,
  atuendos: Shield,
  cordones: Award,
};

export function BloodborneCompendium({
  onOpenBuilds,
  onOpenEchoes,
  onOpenChalice,
  onOpenQuests,
  onSwitchGame,
}) {
  const {
    itemsCompletados_bb,
    toggleCompletadoBB,
    marcarGrupoItemsBB,
    setViewMode,
  } = useTrackerStore();

  const [activeCategory, setActiveCategory] = useState('armas_truco');
  const [searchQuery, setSearchQuery] = useState('');
  const [expansionFilter, setExpansionFilter] = useState('all'); // 'all' | 'base' | 'dlc'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'

  const totalCatalog = bloodborneCatalog.items.length;
  const completedCount = bloodborneCatalog.items.filter((i) => itemsCompletados_bb.has(i.id)).length;
  const progressPct = Math.round((completedCount / (totalCatalog || 1)) * 100);

  const filteredItems = useMemo(() => {
    return bloodborneCatalog.items.filter((item) => {
      if (item.category !== activeCategory) return false;
      if (expansionFilter !== 'all' && item.expansion !== expansionFilter) return false;
      const isDone = itemsCompletados_bb.has(item.id);
      if (statusFilter === 'pending' && isDone) return false;
      if (statusFilter === 'completed' && !isDone) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = (item.description || '').toLowerCase().includes(q);
        const matchesLoc = (item.location || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesLoc) return false;
      }
      return true;
    });
  }, [activeCategory, expansionFilter, statusFilter, searchQuery, itemsCompletados_bb]);

  return (
    <div className="h-full w-full bg-[#060508] text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* 1. Header Superior Gótico */}
      <header className="px-4 sm:px-6 py-3 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#12070c] to-[#070508] flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('hub')}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:scale-105 active:scale-95 transition"
            title="Volver al Sueño del Cazador (Hub)"
          >
            <Compass className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-black text-base sm:text-lg bg-gradient-to-r from-rose-100 via-rose-300 to-rose-500 bg-clip-text text-transparent">
                Compendio de Yharnam
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 font-bold">
                BLOODBORNE
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans hidden sm:block">
              {completedCount} de {totalCatalog} reliquias y cacerías completadas ({progressPct}%)
            </p>
          </div>
        </div>

        {/* Acciones y Switcher de Juego */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchGame}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 font-serif text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
            title="Cambiar a Elden Ring"
          >
            <span>Ir a Elden Ring ✦</span>
          </button>
        </div>
      </header>

      {/* 2. Barra de Categorías */}
      <div className="bg-[#09080c] border-b border-rose-950/60 px-3 sm:px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
        {bloodborneCatalog.categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id] || Sword;
          const isSelected = activeCategory === cat.id;
          const catTotal = bloodborneCatalog.items.filter((i) => i.category === cat.id).length;
          const catDone = bloodborneCatalog.items.filter((i) => i.category === cat.id && itemsCompletados_bb.has(i.id)).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-serif text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border flex-shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-rose-600 text-stone-950 border-rose-400 shadow-[0_0_12px_rgba(225,29,72,0.5)]'
                  : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-rose-500/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/30 text-stone-950' : 'bg-black/40 text-stone-400'}`}>
                {catDone}/{catTotal}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Filtros y Búsqueda */}
      <div className="bg-black/50 border-b border-stone-800/80 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 flex-shrink-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar arma, jefe, runa o ubicación..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d090f] border border-stone-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-rose-200 placeholder-stone-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Expansión */}
          <div className="flex rounded-xl bg-[#0d090f] border border-stone-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => setExpansionFilter('all')}
              className={`px-2 py-1 rounded-lg transition ${expansionFilter === 'all' ? 'bg-rose-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              Todo
            </button>
            <button
              onClick={() => setExpansionFilter('base')}
              className={`px-2 py-1 rounded-lg transition ${expansionFilter === 'base' ? 'bg-rose-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              Base
            </button>
            <button
              onClick={() => setExpansionFilter('dlc')}
              className={`px-2 py-1 rounded-lg transition ${expansionFilter === 'dlc' ? 'bg-rose-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              DLC Cazadores
            </button>
          </div>

          {/* Estado */}
          <div className="flex rounded-xl bg-[#0d090f] border border-stone-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-1 rounded-lg transition ${statusFilter === 'all' ? 'bg-rose-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2 py-1 rounded-lg transition ${statusFilter === 'pending' ? 'bg-rose-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2 py-1 rounded-lg transition ${statusFilter === 'completed' ? 'bg-rose-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            >
              Hechos
            </button>
          </div>
        </div>
      </div>

      {/* 4. Lista de Ítems */}
      <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-stone-500 font-serif text-sm">
            No se encontraron ítems en esta categoría con los filtros actuales.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredItems.map((item) => {
              const isDone = itemsCompletados_bb.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCompletadoBB(item.id)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer select-none flex flex-col justify-between ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-[#0d090f] border-stone-800 hover:border-rose-500/40 text-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-600 flex-shrink-0" />
                        )}
                        <div>
                          <div className={`font-serif font-bold text-sm ${isDone ? 'line-through text-stone-400' : 'text-stone-100'}`}>
                            {item.name}
                          </div>
                          <div className="text-[10px] font-mono text-stone-400 mt-0.5">
                            {item.subcategory}
                          </div>
                        </div>
                      </div>

                      {item.expansion === 'dlc' && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex-shrink-0">
                          DLC
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-300 font-sans mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-800/60 mt-2 flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span className="truncate max-w-[280px]">📍 {item.location}</span>
                    <span className="text-rose-400 font-bold uppercase text-[10px]">
                      {isDone ? 'Conseguido' : 'Marcar'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 5. Dock Inferior Específico de Bloodborne */}
      <footer className="px-4 py-2 border-t border-rose-950/80 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBuilds}
            className="hover:text-rose-300 transition"
          >
            ⚔️ Taller de Builds
          </button>
          <span>•</span>
          <button
            onClick={onOpenEchoes}
            className="hover:text-rose-300 transition"
          >
            🪙 Ecos de Sangre
          </button>
          <span>•</span>
          <button
            onClick={onOpenChalice}
            className="hover:text-rose-300 transition"
          >
            🔥 Mazmorras del Cáliz
          </button>
          <span>•</span>
          <button
            onClick={onOpenQuests}
            className="hover:text-rose-300 transition"
          >
            📖 Cordones & Refugiados
          </button>
        </div>
      </footer>
    </div>
  );
}

export default BloodborneCompendium;
