import React from 'react';
import { Search, Filter, Flame } from 'lucide-react';

const ExerciseFilters = ({ filters, setFilters, showHeatmap, setShowHeatmap }) => {
    return (
        <div className="flex flex-wrap items-center gap-4 bg-slate-900/30 p-2 rounded-lg border border-white/5 backdrop-blur-sm">
            {/* Service Filter */}
            <div className="flex items-center bg-[#050505] rounded border border-slate-800 px-3">
                <Filter size={12} className="text-slate-500 mr-2" />
                <select
                    className="bg-transparent text-xs text-slate-300 py-1.5 outline-none font-mono uppercase"
                    value={filters.service}
                    onChange={(e) => setFilters({ ...filters, service: e.target.value })}
                >
                    <option value="All">All Services</option>
                    <option value="IAF">IAF (Blue)</option>
                    <option value="PLAAF">PLAAF (Red)</option>
                </select>
            </div>

            {/* Year Filter */}
            <div className="flex items-center bg-[#050505] rounded border border-slate-800 px-3">
                <select
                    className="bg-transparent text-xs text-slate-300 py-1.5 outline-none font-mono uppercase"
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                >
                    <option value="All">All Years</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
            </div>

            {/* Scale Filter */}
            <div className="flex items-center bg-[#050505] rounded border border-slate-800 px-3">
                <select
                    className="bg-transparent text-xs text-slate-300 py-1.5 outline-none font-mono uppercase"
                    value={filters.scale}
                    onChange={(e) => setFilters({ ...filters, scale: e.target.value })}
                >
                    <option value="All">All Scales</option>
                    <option value="Bilateral">Bilateral</option>
                    <option value="Multinational">Multinational</option>
                    <option value="Theatre">Theatre Level</option>
                </select>
            </div>

            {/* Search Input */}
            <div className="flex items-center bg-[#050505] rounded border border-slate-800 px-3 w-48">
                <Search size={12} className="text-slate-500 mr-2" />
                <input
                    type="text"
                    placeholder="SEARCH EXERCISES..."
                    className="bg-transparent text-[10px] text-slate-300 py-1.5 outline-none font-mono uppercase w-full placeholder:text-slate-700"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
            </div>

            <div className="h-6 w-px bg-slate-800 mx-1" />

            {/* Heatmap Toggle */}
            <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all ${showHeatmap
                        ? 'bg-amber-500/10 border-amber-500/50 text-amber-500'
                        : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
            >
                <Flame size={12} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Heatmap</span>
            </button>
        </div>
    );
};

export default ExerciseFilters;
