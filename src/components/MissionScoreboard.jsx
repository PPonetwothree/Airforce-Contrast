import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, ShieldAlert, Zap, ArrowLeft, RefreshCw, BookOpen } from 'lucide-react';

const MissionScoreboard = ({ performance, mission, onRestart, onExit }) => {
    const score = performance?.success ? 'MISSION_SUCCESS' : 'MISSION_FAILED';

    return (
        <div className="w-full max-w-4xl bg-[#0a0a0a]/95 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
            {/* Header */}
            <div className="p-8 border-b border-slate-800 bg-blue-500/5">
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <div className="text-[10px] font-mono text-blue-400 tracking-widest uppercase font-bold">Operational Evaluation Report</div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">{score}</h2>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-slate-500 font-mono uppercase">Reference Sortie</div>
                        <div className="text-xs text-slate-300 font-bold uppercase">{mission.id}</div>
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Clock className="text-slate-500" size={18} />
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Completion Time</div>
                    </div>
                    <div className="text-4xl font-light text-slate-200">
                        {Math.floor(performance?.time / 60)}:{(performance?.time % 60).toFixed(0).padStart(2, '0')}
                        <span className="text-xs text-slate-500 ml-2 font-mono">MIN</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-relaxed uppercase">
                        Within the projected operational window for high-intensity engagement.
                    </p>
                </div>

                <div className="p-8 space-y-6 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <ShieldAlert className="text-slate-500" size={18} />
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Visibility Index</div>
                    </div>
                    <div className="text-4xl font-light text-slate-200">
                        {(performance?.visibility * 10).toFixed(1)}
                        <span className="text-xs text-slate-500 ml-2 font-mono">SIG</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-relaxed uppercase">
                        {performance?.visibility > 0.5 ? 'EXCESSIVE EXPOSURE TO ADVERSARY SENSORS.' : 'LOW OBSERVABLE PROFILE MAINTAINED.'}
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3">
                        <Zap className="text-slate-500" size={18} />
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Sortie Efficiency</div>
                    </div>
                    <div className="text-4xl font-light text-slate-200">
                        {(performance?.efficiency * 100).toFixed(0)}%
                    </div>
                    <p className="text-[10px] text-slate-600 leading-relaxed uppercase">
                        Energy management and fuel consumption optimal for combat radius.
                    </p>
                </div>
            </div>

            {/* Intelligence Unlock Section */}
            <div className="p-8 bg-blue-600/5 border-t border-slate-800">
                <div className="flex items-start gap-6">
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <BookOpen className="text-blue-500" size={24} />
                    </div>
                    <div className="space-y-2">
                        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Intelligence Unlocked</div>
                        <h4 className="text-lg font-bold text-white uppercase italic">IAF Doctrine: Offensive Counter Air (OCA)</h4>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                            Real-world missions like *Tarang Shakti* emphasize the integration of 4.5 Gen fighters (Rafale) with heavy dominance platforms (Su-30MKI). This sortie demonstrates the "High-Low" mix strategy used to suppress advanced A2/AD (Anti-Access/Area Denial) envelopes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex justify-between">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase transition-all rounded font-mono"
                >
                    <ArrowLeft size={14} />
                    Return to HQ
                </button>
                <button
                    onClick={onRestart}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase transition-all rounded font-mono shadow-lg shadow-blue-600/20"
                >
                    <RefreshCw size={14} />
                    Retry Sortie
                </button>
            </div>
        </div>
    );
};

export default MissionScoreboard;
