import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { orbatData } from '../data/orbatData';
import StrategicDeploymentMap from './StrategicDeploymentMap';
import CommandStructureExplorer from './CommandStructureExplorer';
import CombatPowerIndex from './CombatPowerIndex';
import { Network, Map as MapIcon, ShieldAlert, Cpu, Search } from 'lucide-react';

const ORBATIntelligenceHub = () => {
    const [activeView, setActiveView] = useState('map'); // 'map', 'orbat', 'power'
    const [selectedTheater, setSelectedTheater] = useState('ladakh');

    return (
        <section id="orbat-hub" className="py-24 bg-[#050505] border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-emerald-500" />
                            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Strategic Deployment & ORBAT</span>
                        </div>
                        <h2 className="text-4xl font-light tracking-tight text-white">
                            Theatre <span className="font-bold text-slate-400">Order of Battle</span>
                        </h2>
                        <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
                            Real-time visualization of force distribution, base infrastructure, and combat power ratios across the Indo-China frontier.
                        </p>
                    </div>

                    {/* View Toggles */}
                    <div className="flex p-1 bg-slate-900/50 rounded-lg border border-slate-800">
                        {[
                            { id: 'map', label: 'Strategic Map', icon: MapIcon },
                            { id: 'orbat', label: 'Force ORBAT', icon: Network },
                            { id: 'power', label: 'Combat Power', icon: Cpu }
                        ].map((view) => (
                            <button
                                key={view.id}
                                onClick={() => setActiveView(view.id)}
                                className={`flex items-center gap-2 px-6 py-2 rounded-md text-xs font-bold uppercase transition-all ${activeView === view.id
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <view.icon size={14} />
                                {view.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Theater Selector */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {Object.entries(orbatData.theaters).map(([id, theater]) => (
                        <button
                            key={id}
                            onClick={() => setSelectedTheater(id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-xl border transition-all whitespace-nowrap ${selectedTheater === id
                                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                                    : 'border-slate-800 bg-slate-900/20 text-slate-500 hover:border-slate-700'
                                }`}
                        >
                            <ShieldAlert size={14} className={selectedTheater === id ? 'text-emerald-400' : 'text-slate-700'} />
                            <div className="text-left">
                                <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">Theater</div>
                                <div className="text-sm font-bold">{theater.name}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-black/40 border border-slate-800 rounded-2xl overflow-hidden min-h-[600px] relative">
                    <AnimatePresence mode="wait">
                        {activeView === 'map' && (
                            <motion.div
                                key="map"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full"
                            >
                                <StrategicDeploymentMap theater={selectedTheater} />
                            </motion.div>
                        )}

                        {activeView === 'orbat' && (
                            <motion.div
                                key="orbat"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-8"
                            >
                                <CommandStructureExplorer />
                            </motion.div>
                        )}

                        {activeView === 'power' && (
                            <motion.div
                                key="power"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-8"
                            >
                                <CombatPowerIndex theater={selectedTheater} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Intelligence Alert */}
                <div className="mt-8 flex items-center gap-4 p-4 bg-emerald-900/5 border border-emerald-900/20 rounded-xl">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Search className="text-emerald-500" size={16} />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono uppercase tracking-tight">
                        <span className="text-emerald-500 font-bold mr-2">// ANALYST_NOTE:</span>
                        {orbatData.theaters[selectedTheater].description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ORBATIntelligenceHub;
