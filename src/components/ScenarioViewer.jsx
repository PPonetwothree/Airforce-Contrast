import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, AlertTriangle, Crosshair, Scale } from 'lucide-react';

export const ScenarioViewer = ({ scenarios }) => {
    const [activeScenario, setActiveScenario] = useState(0);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[500px]">
            {/* Sidebar List */}
            <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <FolderOpen className="w-5 h-5 text-blue-600" />
                        Mission Files
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Select a wargame scenario</p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {scenarios.map((s, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveScenario(idx)}
                            className={`w-full text-left p-4 rounded-xl transition-all border ${activeScenario === idx ? 'bg-white shadow-md border-blue-200' : 'hover:bg-slate-100 border-transparent text-slate-500'}`}
                        >
                            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${activeScenario === idx ? 'text-blue-600' : 'text-slate-400'}`}>Scenario 0{idx + 1}</div>
                            <div className="font-bold text-slate-800 text-sm">{s.title}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Detail View */}
            <div className="flex-1 p-8 relative bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeScenario}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <h2 className="text-3xl font-bold text-slate-800">{scenarios[activeScenario].title}</h2>
                            <span className="px-3 py-1 bg-slate-800 text-white text-xs font-mono rounded">
                                EST. DURATION: {scenarios[activeScenario].duration}
                            </span>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex-1">
                            <h4 className="flex items-center gap-2 font-bold text-slate-600 mb-4 uppercase text-xs tracking-wider">
                                <Crosshair className="w-4 h-4" /> Operational Analysis
                            </h4>
                            <p className="text-slate-700 leading-relaxed text-lg">
                                {scenarios[activeScenario].desc}
                            </p>
                        </div>

                        {/* Outcome Probability Bar */}
                        <div className="bg-slate-900 rounded-xl p-6 text-white">
                            <div className="flex justify-between items-end mb-4">
                                <h4 className="flex items-center gap-2 font-bold text-slate-300 uppercase text-xs tracking-wider">
                                    <Scale className="w-4 h-4" /> Projected Advantage
                                </h4>
                                <span className="font-bold text-orange-400">{scenarios[activeScenario].outcome}</span>
                            </div>

                            <div className="h-6 bg-slate-800 rounded-full overflow-hidden relative flex">
                                {/* IAF Bar */}
                                <motion.div
                                    className="h-full bg-orange-500 flex items-center justify-center"
                                    initial={{ width: '50%' }}
                                    animate={{ width: `${100 - scenarios[activeScenario].bias}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <span className="text-[10px] font-bold">IAF</span>
                                </motion.div>

                                {/* PLAAF Bar */}
                                <motion.div
                                    className="h-full bg-red-600 flex items-center justify-center"
                                    initial={{ width: '50%' }}
                                    animate={{ width: `${scenarios[activeScenario].bias}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    <span className="text-[10px] font-bold">PLAAF</span>
                                </motion.div>
                            </div>

                            {scenarios[activeScenario].bias > 60 && (
                                <div className="mt-3 flex items-start gap-2 text-xs text-red-300 bg-red-900/20 p-2 rounded">
                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                    PLAAF numerical superiority and industrial depth become decisive in sustained operations.
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
