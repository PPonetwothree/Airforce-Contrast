import React from 'react';
import { motion } from 'framer-motion';

const TrainingTimeline = ({ data }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="space-y-12">
            {data.map((system, systemIndex) => (
                <div key={systemIndex} className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            {system.name} Pipeline // {system.duration}
                        </span>
                    </div>

                    <div className="relative h-12 flex bg-slate-900/30 rounded-full overflow-hidden border border-slate-800/50">
                        {system.stages.map((stage, i) => {
                            // Extract duration number (e.g., "1.0 Year" -> 1.0)
                            const duration = parseFloat(stage.duration);
                            const totalDuration = system.stages.reduce((acc, s) => acc + parseFloat(s.duration), 0);
                            const width = (duration / totalDuration) * 100 + "%";

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ width: 0 }}
                                    animate={{ width }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative h-full flex items-center justify-center border-r border-slate-800/30 last:border-0"
                                    style={{
                                        backgroundColor: system.name.includes('Indian')
                                            ? `rgba(59, 130, 246, ${0.1 + (i * 0.15)})`
                                            : `rgba(239, 68, 68, ${0.1 + (i * 0.2)})`
                                    }}
                                >
                                    <span className="text-[8px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-2">
                                        {stage.name}
                                    </span>

                                    {/* Tooltip-like popup on hover */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                        <div className="text-[9px] font-bold text-white uppercase mb-1">{stage.name}</div>
                                        <div className="text-[8px] text-blue-400 font-mono mb-2">{stage.duration}</div>
                                        <div className="text-[9px] text-slate-500 leading-normal">{stage.detail}</div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between px-2">
                        {system.stages.map((stage, i) => (
                            <div key={i} className="text-[7px] font-mono text-slate-600 uppercase text-center w-0 flex-1">
                                {stage.name.split(' ')[0]}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TrainingTimeline;
