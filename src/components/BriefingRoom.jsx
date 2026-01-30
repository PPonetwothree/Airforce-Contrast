import React from 'react';
import { motion } from 'framer-motion';
import { missionData } from '../data/missionData';
import { Shield, Target, Map as MapIcon, ChevronRight } from 'lucide-react';

const BriefingRoom = ({ onSelectMission }) => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <div className="relative z-10 w-full max-w-5xl px-8 py-12 flex flex-col md:flex-row gap-12">
                {/* Dossier Selector */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-2 mb-8">
                        <Shield className="text-red-500" size={20} />
                        <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Mission Folder: ACTIVE_SORTIES</h3>
                    </div>

                    <div className="space-y-4">
                        {missionData.map((mission) => (
                            <motion.div
                                key={mission.id}
                                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                onClick={() => onSelectMission(mission)}
                                className="p-6 border border-slate-700/50 bg-black/40 rounded-lg cursor-pointer transition-all group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">{mission.difficulty}</span>
                                        <h4 className="text-lg font-bold text-white uppercase">{mission.name}</h4>
                                    </div>
                                    <ChevronRight className="text-slate-600 group-hover:text-red-500 transition-colors" />
                                </div>

                                <p className="text-xs text-slate-400 leading-relaxed italic mb-4">
                                    "{mission.objective.substring(0, 100)}..."
                                </p>

                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                        <MapIcon size={12} className="text-slate-400" />
                                        <span className="text-[9px] font-mono text-slate-300">{mission.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                        <Target size={12} className="text-slate-400" />
                                        <span className="text-[9px] font-mono text-slate-300">{mission.assets[0]} Deployed</span>
                                    </div>
                                </div>

                                <div className="absolute top-0 right-0 w-1 h-full bg-red-600/50 transform translate-x-full group-hover:translate-x-0 transition-transform" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Tactical Overview / Legend */}
                <div className="w-full md:w-80 space-y-8 border-l border-slate-800/50 pl-12 bg-white/2 pb-8 rounded-r-2xl hidden md:block">
                    <div className="space-y-4">
                        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Training Parameters</div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Physics Engine</span>
                                <span className="text-blue-500 font-bold">STRICT_AERO</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Sensor Model</span>
                                <span className="text-blue-500 font-bold">RWR_ACTIVE</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Threat Intel</span>
                                <span className="text-blue-500 font-bold">DECENTRALIZED</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded">
                        <h5 className="text-[10px] font-bold text-red-500 uppercase mb-2">Notice: Strategic Integrity</h5>
                        <p className="text-[9px] text-slate-500 leading-normal font-mono uppercase">
                            Sorties are reconstructed from satellite telemetry and exercise data. Tactical scores are evaluated against documented IAF/PLAAF doctrine.
                        </p>
                    </div>

                    <div className="mt-auto pt-12">
                        <div className="h-1 w-full bg-slate-800 overflow-hidden rounded">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="h-full bg-red-600/30"
                            />
                        </div>
                        <div className="text-[8px] font-mono text-slate-600 mt-2 uppercase">Syncing telemetry... complete</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BriefingRoom;
