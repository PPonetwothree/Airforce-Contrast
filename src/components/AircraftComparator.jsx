import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Info, Zap, Shield, Radar, Crosshair } from 'lucide-react';
import { clsx } from 'clsx';

const StatRow = ({ label, left, right, max = 100 }) => (
    <div className="flex items-center gap-4 mb-3">
        <div className="flex-1 text-right">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex justify-end">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(left / max) * 100}%` }}
                    className="h-full bg-orange-500"
                />
            </div>
            <span className="text-[10px] font-bold text-slate-500">{left}</span>
        </div>
        <div className="w-24 text-center text-xs font-bold text-slate-300 uppercase tracking-wider">{label}</div>
        <div className="flex-1 text-left">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(right / max) * 100}%` }}
                    className="h-full bg-red-600"
                />
            </div>
            <span className="text-[10px] font-bold text-slate-500">{right}</span>
        </div>
    </div>
);

export const AircraftComparator = ({ data }) => {
    const [leftId, setLeftId] = useState(data.iaf[0].id);
    const [rightId, setRightId] = useState(data.plaaf[0].id);

    const left = data.iaf.find(a => a.id === leftId) || data.iaf[0];
    const right = data.plaaf.find(a => a.id === rightId) || data.plaaf[0];

    // Calculate Win Probability
    const leftScore = Object.values(left.stats).reduce((a, b) => a + b, 0);
    const rightScore = Object.values(right.stats).reduce((a, b) => a + b, 0);
    const total = leftScore + rightScore;
    const leftProb = Math.round((leftScore / (total || 1)) * 100);

    return (
        <div className="bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

            <div className="p-8 relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black italic text-white flex items-center gap-2">
                        <Swords className="text-blue-500" /> AERIAL DUEL SIMULATOR
                    </h2>
                    <div className="bg-slate-800 px-4 py-1 rounded-full text-xs font-mono text-slate-400">
                        Database: {data.iaf.length + data.plaaf.length} Platforms
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Selector (IAF) */}
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-orange-500/20">
                        <label className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2 block">Blue Force (IAF)</label>
                        <select
                            value={leftId}
                            onChange={(e) => setLeftId(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white font-bold mb-6 focus:ring-2 focus:ring-orange-500 outline-none"
                        >
                            {data.iaf.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>

                        <div className="text-center">
                            <div className="text-6xl font-black text-slate-800/50 mb-4 select-none absolute top-32 left-10 scale-150 opacity-20">{left.role}</div>
                            <h3 className="text-2xl font-bold text-white mb-1">{left.name}</h3>
                            <p className="text-orange-400 text-xs font-mono uppercase mb-4">{left.role}</p>

                            <div className="space-y-2 text-left">
                                {left.traits.map(t => (
                                    <div key={t} className="bg-slate-900/80 px-3 py-2 rounded border-l-4 border-orange-500 text-xs text-slate-300">
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center Stats */}
                    <div className="flex flex-col justify-center">
                        <div className="text-center mb-6">
                            <span className="text-xs font-bold text-slate-500 uppercase">Projected Win Probability</span>
                            <div className="h-4 bg-slate-800 rounded-full mt-2 overflow-hidden flex relative">
                                <motion.div
                                    animate={{ width: `${leftProb}%` }}
                                    className="h-full bg-orange-500"
                                />
                                <motion.div
                                    animate={{ width: `${100 - leftProb}%` }}
                                    className="h-full bg-red-600"
                                />

                                <div className="absolute inset-0 flex justify-between px-2 items-center text-[9px] font-black text-black/50">
                                    <span>{leftProb}%</span>
                                    <span>{100 - leftProb}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <StatRow label="BVR Combat" left={left.stats.bvr} right={right.stats.bvr} />
                            <StatRow label="Dogfight (WVR)" left={left.stats.wvr} right={right.stats.wvr} />
                            <StatRow label="Stealth" left={left.stats.stealth} right={right.stats.stealth} />
                            <StatRow label="Avionics" left={left.stats.tech} right={right.stats.tech} />
                            <StatRow label="Payload" left={left.stats.payload} right={right.stats.payload} />
                        </div>

                        <div className="mt-8 bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl">
                            <h4 className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase mb-2">
                                <Info className="w-4 h-4" /> Tactical Insight
                            </h4>
                            <p className="text-xs text-blue-200 leading-relaxed">
                                {left.stats.stealth > right.stats.stealth + 20
                                    ? `${left.name} dominates the opening engagement via stealth, potentially ending the fight before ${right.name} can detect it.`
                                    : right.stats.stealth > left.stats.stealth + 20
                                        ? `${right.name} holds the first-look, first-shot advantage. ${left.name} must rely on EW and terrain masking.`
                                        : "A highly contested matchup. Outcome depends heavily on AWACS support and pilot skill."}
                            </p>
                        </div>
                    </div>

                    {/* Right Selector (PLAAF) */}
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-red-600/20">
                        <label className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2 block">Red Force (PLAAF)</label>
                        <select
                            value={rightId}
                            onChange={(e) => setRightId(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white font-bold mb-6 focus:ring-2 focus:ring-red-500 outline-none"
                        >
                            {data.plaaf.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>

                        <div className="text-center">
                            <div className="text-6xl font-black text-slate-800/50 mb-4 select-none absolute top-32 right-10 scale-150 opacity-20">{right.role}</div>
                            <h3 className="text-2xl font-bold text-white mb-1">{right.name}</h3>
                            <p className="text-red-400 text-xs font-mono uppercase mb-4">{right.role}</p>

                            <div className="space-y-2 text-right">
                                {right.traits.map(t => (
                                    <div key={t} className="bg-slate-900/80 px-3 py-2 rounded border-r-4 border-red-500 text-xs text-slate-300">
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
