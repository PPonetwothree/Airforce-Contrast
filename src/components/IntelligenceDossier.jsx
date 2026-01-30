import React from 'react';
import { motion } from 'framer-motion';
import { X, Shield, Users, Target, Calendar, MapPin, ExternalLink } from 'lucide-react';

const IntelligenceDossier = ({ exercise, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl bg-[#0a0a0a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative"
            >
                {/* Dossier Header */}
                <div className={`p-8 border-b border-slate-800 relative ${exercise.service === 'IAF' ? 'bg-blue-500/5' : 'bg-red-500/5'
                    }`}>
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${exercise.service === 'IAF' ? 'text-blue-400 border-blue-500/30' : 'text-red-400 border-red-500/30'
                                    }`}>
                                    CLASSIFIED: {exercise.service}—{exercise.id.toUpperCase()}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">VERSION 5.4.0</span>
                            </div>
                            <h2 className="text-4xl font-bold text-slate-100 tracking-tight uppercase">
                                {exercise.name} <span className="text-slate-600 font-light">Exercise</span>
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-slate-900 hover:bg-slate-800 rounded-full text-slate-400 transition-all border border-slate-800"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Main Info */}
                    <div className="col-span-2 p-8 space-y-8 border-r border-slate-800 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest">
                                <Target size={14} />
                                Strategic Objective
                            </div>
                            <p className="text-lg text-slate-300 leading-relaxed font-serif italic border-l-2 border-slate-800 pl-6">
                                "{exercise.purpose}"
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase">
                                    <Calendar size={12} />
                                    Operational Window
                                </div>
                                <div className="text-slate-200">
                                    <div className="text-xl font-medium">{exercise.dateRange.start}</div>
                                    <div className="text-xs text-slate-500">to {exercise.dateRange.end}</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase">
                                    <MapPin size={12} />
                                    Deployment Focal Point
                                </div>
                                <div className="text-slate-200">
                                    <div className="text-xl font-medium">{exercise.location.name}</div>
                                    <div className="text-xs text-slate-500">COORD: {exercise.location.lat}, {exercise.location.lng}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase">
                                Analytic Annotation
                            </div>
                            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-sm text-slate-400 leading-relaxed">
                                This {exercise.scale.toLowerCase()} engagement demonstrates significant {exercise.service} {
                                    exercise.scale === 'Multinational' ? 'diplomatic reach and interoperability' : 'territorial command and control'
                                }. Participation of {exercise.platforms.slice(0, 3).join(', ')} indicates high-end air superiority focus. Confidence level in reported platforms is {exercise.confidence * 100}%.
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="p-8 space-y-8 bg-[#070707]">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase">
                                <Users size={12} />
                                Coalition Partners
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {exercise.partners.length > 0 ? exercise.partners.map(p => (
                                    <span key={p} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-bold text-blue-400">
                                        {p}
                                    </span>
                                )) : (
                                    <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400 italic">
                                        Unilateral/Independent
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase">
                                <Shield size={12} />
                                Platform Inventory
                            </div>
                            <div className="space-y-2">
                                {exercise.platforms.map(p => (
                                    <div key={p} className="flex items-center justify-between group">
                                        <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{p}</span>
                                        <ExternalLink size={10} className="text-slate-700 opacity-0 group-hover:opacity-100" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-800 mt-auto">
                            <div className="text-[10px] text-slate-600 font-mono uppercase mb-4">Integrity Status</div>
                            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${exercise.intensity * 100}%` }}
                                    className="h-full bg-blue-500"
                                />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-[8px] text-slate-700 font-mono">INTENSITY_INDEX</span>
                                <span className="text-[8px] text-slate-400 font-mono">{(exercise.intensity * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-900/30 border-t border-slate-800 flex justify-between items-center">
                    <div className="text-[9px] font-mono text-slate-600 tracking-wider">
                        REPRODUCTION PROHIBITED // DEFENSE ANALYSIS COMMUNIQUE
                    </div>
                    <div className="text-[9px] font-mono text-slate-500">
                        RECORD_ID: {exercise.id}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default IntelligenceDossier;
