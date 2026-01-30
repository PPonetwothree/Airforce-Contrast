import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Swords, Zap } from 'lucide-react';

const StatBar = ({ label, value, color }) => (
    <div className="mb-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            <span>{label}</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
                className={`h-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1 }}
            />
        </div>
    </div>
);

export const MatchupArena = ({ data }) => {
    const [selectedId, setSelectedId] = useState(data[0].id);
    const matchup = data.find(m => m.id === selectedId);

    return (
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            {/* Header Tabs */}
            <div className="flex border-b border-slate-700">
                {data.map(m => (
                    <button
                        key={m.id}
                        onClick={() => setSelectedId(m.id)}
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${selectedId === m.id ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-500 hover:text-slate-300'}`}
                    >
                        {m.title}
                    </button>
                ))}
            </div>

            <div className="p-8 relative">
                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-slate-900 text-xl border-4 border-slate-800 shadow-xl italic transform -rotate-12">
                        VS
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={matchup.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-12"
                    >
                        {/* IAF Fighter */}
                        <div className="text-right border-r border-slate-800 pr-12 pt-4">
                            <h3 className="text-3xl font-black text-orange-500 mb-1">{matchup.iaf.name}</h3>
                            <div className="text-xs font-mono text-slate-400 uppercase mb-6">{matchup.iaf.role}</div>

                            <div className="space-y-4 mb-6">
                                {matchup.iaf.traits.map(t => (
                                    <div key={t} className="inline-block bg-slate-800 px-3 py-1 rounded text-xs font-bold text-slate-300 ml-2 border border-slate-700 shadow-sm">
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <StatBar label="Overall Advantage" value={matchup.iaf.advantage} color="bg-orange-500" />
                        </div>

                        {/* PLAAF Fighter */}
                        <div className="text-left pl-12 pt-4">
                            <h3 className="text-3xl font-black text-red-500 mb-1">{matchup.plaaf.name}</h3>
                            <div className="text-xs font-mono text-slate-400 uppercase mb-6">{matchup.plaaf.role}</div>

                            <div className="space-y-4 mb-6">
                                {matchup.plaaf.traits.map(t => (
                                    <div key={t} className="inline-block bg-slate-800 px-3 py-1 rounded text-xs font-bold text-slate-300 mr-2 border border-slate-700 shadow-sm">
                                        {t}
                                    </div>
                                ))}
                            </div>

                            <StatBar label="Overall Advantage" value={matchup.plaaf.advantage} color="bg-red-500" />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Analysis Box */}
                <div className="mt-12 bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex gap-4">
                    <div className="bg-blue-500/20 p-2 rounded h-fit">
                        <Swords className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wide mb-2">Tactical Assessment</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {matchup.analysis}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
