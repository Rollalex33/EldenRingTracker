import React, { useState, useMemo } from 'react';
import {
  Sword,
  Crosshair,
  Sparkles,
  Eye,
  Skull,
  Flame,
  Shield,
  ShieldAlert,
  Award,
  Users,
  Package,
  Hammer,
  Key,
  Gem,
  Flag,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  RotateCcw,
  Compass,
  Info,
  ExternalLink,
  ChevronRight,
  Layers,
  MapPin,
  Zap,
} from 'lucide-react';
import { useTrackerStore } from '../../store/useTrackerStore';
import bloodborneCatalog from '../../data/bloodborneCatalog.json';
import { BloodborneItemDetailModal } from './BloodborneItemDetailModal';

const CATEGORY_ICONS = {
  armas_truco: Sword,
  armas_fuego: Crosshair,
  atuendos: Shield,
  escudos: ShieldAlert,
  herramientas: Sparkles,
  runas_caryll: Eye,
  juramentos: Flag,
  jefazos: Skull,
  personajes: Users,
  objetos: Package,
  materiales: Hammer,
  llaves: Key,
  calices: Flame,
  gemas: Gem,
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
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expansionFilter, setExpansionFilter] = useState('all'); // 'all' | 'base' | 'dlc'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);

  const totalCatalog = bloodborneCatalog.items.length;
  const completedCount = bloodborneCatalog.items.filter((i) => itemsCompletados_bb.has(i.id)).length;
  const progressPct = Math.round((completedCount / (totalCatalog || 1)) * 100);

  // Subcategorías disponibles en la categoría activa
  const availableSubcategories = useMemo(() => {
    const subs = new Set();
    bloodborneCatalog.items
      .filter((i) => i.category === activeCategory)
      .forEach((i) => {
        if (i.subcategory) subs.add(i.subcategory);
      });
    return Array.from(subs);
  }, [activeCategory]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveSubcategory('all');
  };

  const filteredItems = useMemo(() => {
    return bloodborneCatalog.items.filter((item) => {
      if (item.category !== activeCategory) return false;
      if (activeSubcategory !== 'all' && item.subcategory !== activeSubcategory) return false;
      if (expansionFilter !== 'all' && item.expansion !== expansionFilter) return false;
      const isDone = itemsCompletados_bb.has(item.id);
      if (statusFilter === 'pending' && isDone) return false;
      if (statusFilter === 'completed' && !isDone) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = (item.description || '').toLowerCase().includes(q);
        const matchesLoc = (item.location || '').toLowerCase().includes(q);
        const matchesSub = (item.subcategory || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesLoc && !matchesSub) return false;
      }
      return true;
    });
  }, [activeCategory, activeSubcategory, expansionFilter, statusFilter, searchQuery, itemsCompletados_bb]);

  return (
    <div className="h-full w-full bg-[#060508] text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* 1. Header Superior Gótico */}
      <header className="px-3 sm:px-6 py-2.5 sm:py-3 border-b border-rose-950/80 bg-gradient-to-r from-[#070508] via-[#14080e] to-[#070508] flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('hub')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-rose-900/40 via-black to-stone-900 border border-rose-500/60 flex items-center justify-center text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)] hover:scale-105 active:scale-95 transition flex-shrink-0"
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

      {/* 2. Barra de Categorías con Scroll Horizontal */}
      <div className="bg-[#09080c] border-b border-rose-950/60 px-3 sm:px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
        {bloodborneCatalog.categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id] || Sword;
          const isSelected = activeCategory === cat.id;
          const catTotal = bloodborneCatalog.items.filter((i) => i.category === cat.id).length;
          const catDone = bloodborneCatalog.items.filter((i) => i.category === cat.id && itemsCompletados_bb.has(i.id)).length;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-serif text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border flex-shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-rose-600 text-stone-950 border-rose-400 shadow-[0_0_12px_rgba(225,29,72,0.5)]'
                  : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-rose-500/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black/30 text-stone-950 font-bold' : 'bg-black/40 text-stone-400'
                }`}
              >
                {catDone}/{catTotal}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2b. Subcategorías (si hay más de 1) */}
      {availableSubcategories.length > 1 && (
        <div className="bg-black/40 border-b border-stone-900 px-3 sm:px-6 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0 text-xs">
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Filtrar:
          </span>
          <button
            onClick={() => setActiveSubcategory('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-serif transition whitespace-nowrap border ${
              activeSubcategory === 'all'
                ? 'bg-rose-950/80 border-rose-500/60 text-rose-200 font-bold'
                : 'bg-transparent border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            Todas ({bloodborneCatalog.items.filter((i) => i.category === activeCategory).length})
          </button>
          {availableSubcategories.map((sub) => {
            const count = bloodborneCatalog.items.filter(
              (i) => i.category === activeCategory && i.subcategory === sub
            ).length;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-2.5 py-1 rounded-lg text-xs font-serif transition whitespace-nowrap border ${
                  activeSubcategory === sub
                    ? 'bg-rose-950/80 border-rose-500/60 text-rose-200 font-bold'
                    : 'bg-transparent border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {sub} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Filtros y Búsqueda */}
      <div className="bg-black/50 border-b border-stone-800/80 px-3 sm:px-6 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 flex-shrink-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar arma, atuendo, jefe, ubicación o estadística..."
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
              className={`px-2 py-1 rounded-lg transition ${
                expansionFilter === 'all'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setExpansionFilter('base')}
              className={`px-2 py-1 rounded-lg transition ${
                expansionFilter === 'base'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Base
            </button>
            <button
              onClick={() => setExpansionFilter('dlc')}
              className={`px-2 py-1 rounded-lg transition ${
                expansionFilter === 'dlc'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              DLC Cazadores
            </button>
          </div>

          {/* Estado */}
          <div className="flex rounded-xl bg-[#0d090f] border border-stone-800 p-0.5 text-xs font-mono">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'all'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'pending'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2 py-1 rounded-lg transition ${
                statusFilter === 'completed'
                  ? 'bg-rose-500 text-stone-950 font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Hechos
            </button>
          </div>
        </div>
      </div>

      {/* 4. Lista de Ítems */}
      <main className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-6 custom-scrollbar space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-stone-500 font-serif text-sm">
            No se encontraron ítems en esta categoría con los filtros actuales.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map((item) => {
              const isDone = itemsCompletados_bb.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemForModal(item)}
                  className={`group relative p-3 sm:p-3.5 rounded-2xl border transition duration-200 cursor-pointer select-none flex flex-col justify-between hover:scale-[1.01] active:scale-[0.99] shadow-sm ${
                    isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : 'bg-[#0d090f] border-stone-800/80 hover:border-rose-500/50 hover:bg-[#130a11] text-stone-300'
                  }`}
                >
                  <div>
                    {/* Fila superior: Checkbox + Thumbnail + Nombre + DLC badge */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-start gap-2.5 min-w-0">
                        {/* Checkbox botón independiente */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompletadoBB(item.id);
                          }}
                          className="mt-0.5 p-1 -m-1 rounded-lg hover:bg-stone-800/80 transition flex-shrink-0"
                          title={isDone ? 'Marcar como pendiente' : 'Marcar como completado'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-scaleUp" />
                          ) : (
                            <Circle className="w-5 h-5 text-stone-600 hover:text-rose-400 transition" />
                          )}
                        </button>

                        {/* Thumbnail miniatura del ítem si existe */}
                        {item.image && (
                          <div className="w-11 h-11 rounded-xl bg-black/60 border border-stone-800 p-0.5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt=""
                              className="w-full h-full object-contain rounded-lg"
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h3
                            className={`font-serif font-bold text-sm tracking-wide truncate ${
                              isDone ? 'line-through text-stone-400' : 'text-stone-100 group-hover:text-rose-200'
                            }`}
                          >
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                            <span className="text-[10px] font-mono text-stone-400">
                              {item.subcategory || item.category}
                            </span>
                            {item.requirements && (
                              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-rose-950/80 text-rose-300 border border-rose-500/30">
                                {Object.entries(item.requirements)
                                  .map(([k, v]) => `${k.toUpperCase()} ${v}`)
                                  .join(' ')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {item.expansion === 'dlc' || item.isDlc ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex-shrink-0 font-bold">
                          DLC
                        </span>
                      ) : null}
                    </div>

                    {/* Descripción o Lore breve */}
                    {item.description && (
                      <p className="text-xs text-stone-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Fila inferior con Ubicación y Hint de Modal */}
                  <div className="pt-2 border-t border-stone-800/60 mt-2.5 flex items-center justify-between text-[11px] font-mono text-stone-400 gap-2">
                    <span className="truncate max-w-[220px] text-stone-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400/80 flex-shrink-0" />
                      <span className="truncate">{item.location || 'Consultar guía'}</span>
                    </span>
                    <span className="text-rose-400/90 group-hover:text-rose-300 font-serif font-bold text-[11px] flex items-center gap-0.5 flex-shrink-0">
                      <span>Ver ficha</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 5. Dock Inferior Específico de Bloodborne */}
      <footer className="px-4 py-2 border-t border-rose-950/80 bg-[#060508] flex items-center justify-between text-xs text-stone-400 font-serif flex-shrink-0">
        <div className="flex items-center gap-2 flex-wrap">
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
            🕯️ Mazmorras Cáliz
          </button>
          <span>•</span>
          <button
            onClick={onOpenQuests}
            className="hover:text-rose-300 transition"
          >
            🩸 Misiones de Yharnam
          </button>
        </div>

        <div className="text-[11px] font-mono text-rose-400/80 hidden sm:block">
          {filteredItems.length} ítems en vista
        </div>
      </footer>

      {/* 6. Modal de Detalle Completo del Ítem (Estilo Byrgenwerth / EliteGuías) */}
      <BloodborneItemDetailModal
        item={selectedItemForModal}
        isOpen={Boolean(selectedItemForModal)}
        onClose={() => setSelectedItemForModal(null)}
        isDone={selectedItemForModal ? itemsCompletados_bb.has(selectedItemForModal.id) : false}
        onToggle={toggleCompletadoBB}
      />
    </div>
  );
}

export default BloodborneCompendium;
