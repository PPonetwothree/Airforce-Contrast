import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { orbatData } from '../data/orbatData';
import { ChevronRight, Database, MapPin, Activity } from 'lucide-react';

const CommandStructureExplorer = () => {
    const [activeSide, setActiveSide] = useState('iaf');
    const commands = orbatData[activeSide].commands;

    return (
        <div className="space-y-8">
            {/* Side Switcher */}
            <div className="flex gap-4 border-b border-slate-800 pb-4">
                <button
                    onClick={() => setActiveSide('iaf')}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase transition-all ${activeSide === 'iaf' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-300'
                        }`}
                >
                    Indian Air Force
                </button>
                <button
                    onClick={() => setActiveSide('plaaf')}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase transition-all ${activeSide === 'plaaf' ? 'text-red-500 border-b-2 border-red-500' : 'text-slate-500 hover:text-slate-300'
                        }`}
                >
                    PLAAF Intelligence
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commands.map((cmd, idx) => (
                    <motion.div
                        key={cmd.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 bg-slate-900/30 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-white font-bold tracking-tight">{cmd.name}</h3>
                                <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">HQ: {cmd.hq}</div>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                                <Database size={16} className="text-slate-400" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            {cmd.bases.map((base) => (
                                <div key={base.name} className="relative pl-6 border-l border-slate-800">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-black" />

                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-slate-300">{base.name}</span>
                                            {base.altitude && (
                                                <span className="text-[8px] bg-slate-800/80 text-orange-400 px-1.5 py-0.5 rounded uppercase font-mono">
                                                    {base.altitude}
                                                </span>
                                            )}
                                        </div>
                                        <MapPin size={12} className="text-slate-600" />
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {(base.squadrons || base.units).map(unit => (
                                            <div key={unit} className="flex items-center gap-2 px-2 py-1 bg-black/40 border border-slate-800 rounded text-[9px] font-mono text-slate-400">
                                                <ChevronRight size={10} className="text-slate-700" />
                                                {unit}
                                            </div>
                                        ))}
                                    </div>

                                    {base.impact && (
                                        <div className="mt-3 text-[9px] text-slate-500 italic leading-tight flex gap-2 items-start">
                                            <Activity size={10} className="mt-0.5 text-slate-600 shrink-0" />
                                            {base.impact}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CommandStructureExplorer;
