import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldAlert, Crosshair, ChevronRight, RefreshCw } from 'lucide-react';

export const StrategicWargame = ({ data }) => {
    const [scenario, setScenario] = useState(null);
    const [outcome, setOutcome] = useState(null);

    const reset = () => {
        setScenario(null);
        setOutcome(null);
    };

    return (
        <div className="bg-black border border-slate-800 rounded-3xl overflow-hidden font-mono text-green-500 shadow-2xl relative min-h-[500px] flex flex-col">
            {/* CRT Monitor Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-20"></div>
            <div className="absolute inset-0 bg-green-500/5 pointer-events-none z-10 animate-pulse"></div>

            {/* Header */}
            <div className="bg-slate-900/80 p-4 border-b border-green-900 flex justify-between items-center z-30">
                <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 animate-pulse" />
                    <span className="font-bold tracking-widest text-green-400">WARGAME_SIM_V2.0 // LAC_THEATRE</span>
                </div>
                {scenario && (
                    <button onClick={reset} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded border border-slate-600 flex items-center gap-2">
                        <RefreshCw className="w-3 h-3" /> ABORT/RESET
                    </button>
                )}
            </div>

            <div className="p-8 flex-1 relative z-30 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {/* State 1: Selection */}
                    {!scenario && !outcome && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {data.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => setScenario(s)}
                                    className="bg-slate-900/50 hover:bg-green-900/20 border border-green-800 hover:border-green-500 p-6 rounded-xl text-left transition-all group"
                                >
                                    <h3 className="text-lg font-bold text-green-400 mb-2 group-hover:translate-x-1 transition-transform">{s.title}</h3>
                                    <p className="text-xs text-green-700 group-hover:text-green-600 leading-relaxed">
                                        {s.brief}
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 text-xs text-green-800 group-hover:text-green-400">
                                        INITALIZE <ChevronRight className="w-3 h-3" />
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* State 2: Decision */}
                    {scenario && !outcome && (
                        <motion.div
                            key="decision"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-3xl mx-auto w-full"
                        >
                            <div className="mb-8 border-l-2 border-green-600 pl-4 py-2 bg-green-900/10">
                                <h2 className="text-2xl font-bold text-white mb-2">{scenario.title}</h2>
                                <p className="text-green-300">{scenario.brief}</p>
                            </div>

                            <h3 className="text-sm text-slate-400 mb-4 uppercase tracking-widest">Awaiting Command Directive...</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {scenario.choices.map((choice, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setOutcome(choice.outcome)}
                                        className="bg-slate-900 border border-slate-700 hover:border-green-400 p-6 rounded-xl text-left transition-all relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                                            <Crosshair className="w-12 h-12 text-green-500" />
                                        </div>
                                        <h4 className="font-bold text-white text-lg mb-2">{choice.label}</h4>
                                        <p className="text-sm text-slate-400 group-hover:text-slate-200">{choice.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* State 3: Outcome */}
                    {outcome && (
                        <motion.div
                            key="outcome"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl mx-auto w-full text-center"
                        >
                            <div className={`text-6xl mb-6 flex justify-center ${outcome.score > 50 ? 'text-green-500' : 'text-red-500'}`}>
                                {outcome.score > 50 ? <ShieldAlert /> : <ShieldAlert />}
                            </div>

                            <h2 className={`text-3xl font-black mb-4 uppercase ${outcome.color}`}>{outcome.title}</h2>
                            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-80 outcome-text">
                                <p className="text-lg text-white leading-relaxed">
                                    "{outcome.result}"
                                </p>
                            </div>

                            <div className="mt-8">
                                <span className="text-xs text-slate-500 block mb-2">SIMULATION SCORE</span>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div style={{ width: `${outcome.score}%` }} className={`h-full ${outcome.score > 50 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
