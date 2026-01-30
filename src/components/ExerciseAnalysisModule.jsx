import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exerciseData } from '../data/exerciseData';
import ExerciseMap from './ExerciseMap';
import ExerciseTimeline from './ExerciseTimeline';
import ExerciseFilters from './ExerciseFilters';
import IntelligenceDossier from './IntelligenceDossier';
import StrategicAchievementManager from './StrategicAchievementManager';

const ExerciseAnalysisModule = () => {
    const [filters, setFilters] = useState({
        service: 'All',
        year: 'All',
        scale: 'All',
        search: ''
    });
    const [activeExercise, setActiveExercise] = useState(null);
    const [hoveredExercise, setHoveredExercise] = useState(null);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);

    // Filter logic
    const filteredExercises = useMemo(() => {
        return exerciseData.filter(ex => {
            const matchService = filters.service === 'All' || ex.service === filters.service;
            const matchYear = filters.year === 'All' || ex.dateRange.start.startsWith(filters.year);
            const matchScale = filters.scale === 'All' || ex.scale === filters.scale;
            const matchSearch = ex.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                ex.partners.some(p => p.toLowerCase().includes(filters.search.toLowerCase()));
            return matchService && matchYear && matchScale && matchSearch;
        });
    }, [filters]);

    return (
        <section id="exercise-timeline" className="py-20 bg-[#050505] border-t border-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8 bg-blue-500/50" />
                            <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">Strategic Intelligence</span>
                        </div>
                        <h2 className="text-4xl font-light tracking-tight text-slate-100">
                            Exercise <span className="font-semibold text-slate-400">Timeline / Map</span>
                        </h2>
                        <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
                            Analyzing theatre combat readiness and international strategic partnerships through historical exercise patterns (2020—2025).
                        </p>
                    </div>

                    <ExerciseFilters filters={filters} setFilters={setFilters} showHeatmap={showHeatmap} setShowHeatmap={setShowHeatmap} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
                    {/* Map Section */}
                    <div className="lg:col-span-8 bg-[#0a0a0a] rounded-xl border border-slate-900/50 relative overflow-hidden group">
                        <ExerciseMap
                            exercises={filteredExercises}
                            activeExercise={activeExercise}
                            setActiveExercise={setActiveExercise}
                            hoveredExercise={hoveredExercise}
                            setHoveredExercise={setHoveredExercise}
                            showHeatmap={showHeatmap}
                        />

                        {/* Achievement Toast Overlay */}
                        <div className="absolute top-6 right-6 z-20 pointer-events-none">
                            <StrategicAchievementManager
                                exercises={filteredExercises}
                                unlocked={unlockedAchievements}
                                setUnlocked={setUnlockedAchievements}
                            />
                        </div>
                    </div>

                    {/* Side Panel Information (restrained hover intel) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-slate-900/50 p-6 overflow-y-auto">
                            <AnimatePresence mode="wait">
                                {hoveredExercise || activeExercise ? (
                                    <motion.div
                                        key={(hoveredExercise || activeExercise).id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-1">
                                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${(hoveredExercise || activeExercise).service === 'IAF'
                                                    ? 'text-blue-400 border-blue-500/30 bg-blue-500/5'
                                                    : 'text-red-400 border-red-500/30 bg-red-500/5'
                                                }`}>
                                                {(hoveredExercise || activeExercise).service} {(hoveredExercise || activeExercise).scale}
                                            </span>
                                            <h3 className="text-2xl font-medium text-slate-200 uppercase tracking-tight">
                                                {(hoveredExercise || activeExercise).name}
                                            </h3>
                                            <div className="text-xs font-mono text-slate-500">
                                                {(hoveredExercise || activeExercise).dateRange.start} — {(hoveredExercise || activeExercise).dateRange.end}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-white/5 rounded border border-white/5">
                                                <div className="text-[10px] text-slate-500 uppercase mb-1">Location</div>
                                                <div className="text-xs text-slate-300">{(hoveredExercise || activeExercise).location.name}</div>
                                            </div>
                                            <div className="p-3 bg-white/5 rounded border border-white/5">
                                                <div className="text-[10px] text-slate-500 uppercase mb-1">Partners</div>
                                                <div className="text-xs text-slate-300">
                                                    {(hoveredExercise || activeExercise).partners.length > 0
                                                        ? (hoveredExercise || activeExercise).partners.join(', ')
                                                        : 'Unilateral'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-[10px] text-slate-500 uppercase">Strategic Focus</div>
                                            <p className="text-sm text-slate-400 leading-relaxed italic">
                                                "{(hoveredExercise || activeExercise).purpose}"
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="text-[10px] text-slate-500 uppercase">Platforms Deployed</div>
                                            <div className="flex flex-wrap gap-2">
                                                {(hoveredExercise || activeExercise).platforms.map(p => (
                                                    <span key={p} className="text-[10px] px-2 py-1 bg-slate-800 rounded text-slate-300 border border-slate-700">
                                                        {p}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setActiveExercise(hoveredExercise || activeExercise)}
                                            className="w-full py-3 bg-slate-100 hover:bg-white text-black text-xs font-bold uppercase tracking-widest rounded transition-all mt-4"
                                        >
                                            Deeper Analysis
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                                        <div className="w-12 h-12 border border-dashed border-slate-700 rounded-full flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-pulse" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Awaiting Selection</div>
                                            <p className="text-[10px] text-slate-600 max-w-[180px] mt-1">Scroll timeline or click map markers to view tactical intel.</p>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Small Legend */}
                        <div className="bg-[#0a0a0a] rounded-xl border border-slate-900/50 p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-[10px] text-slate-500 uppercase">IAF Assets</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <span className="text-[10px] text-slate-500 uppercase">PLAAF Assets</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline Axis */}
                <div className="mt-12 bg-[#0a0a0a] rounded-xl border border-slate-900/50 p-6">
                    <ExerciseTimeline
                        exercises={filteredExercises}
                        activeExercise={activeExercise}
                        setActiveExercise={setActiveExercise}
                        hoveredExercise={hoveredExercise}
                        setHoveredExercise={setHoveredExercise}
                    />
                </div>
            </div>

            <AnimatePresence>
                {activeExercise && (
                    <IntelligenceDossier
                        exercise={activeExercise}
                        onClose={() => setActiveExercise(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default ExerciseAnalysisModule;
