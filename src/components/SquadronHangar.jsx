import React, { useState } from 'react';
import { Plane, ShieldCheck, Wrench, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const squadrons = [
    { id: 1, name: "No. 1 Squadron", nickname: "The Tigers", ac: "Mirage 2000", base: "Gwalior", role: "Multi-role", status: "Operational", color: "from-orange-500 to-amber-600", intel: "Pioneering multi-role squadron with deep strike capabilities. Specialized in precision guided munitions." },
    { id: 2, name: "No. 17 Squadron", nickname: "Golden Arrows", ac: "Rafale", base: "Ambala", role: "Omnirole", status: "Active Combat", color: "from-blue-600 to-indigo-700", intel: "Frontline omnirole squadron equipped with Meteor and SCALP missiles. Strategic deterrent." },
    { id: 3, name: "No. 101 Squadron", nickname: "Falcons", ac: "Rafale", base: "Hasimara", role: "Omnirole", status: "Operational", color: "from-blue-500 to-sky-600", intel: "Second Rafale squadron protecting the Eastern sector. Enhanced electronic warfare suites." },
    { id: 4, name: "No. 221 Squadron", nickname: "Valiants", ac: "Su-30MKI", base: "Halwara", role: "Air Dominance", status: "High Readiness", color: "from-yellow-600 to-orange-700", intel: "Heavy air dominance platform. Specialized in BrahMos integration and long-range interception." },
    { id: 5, name: "No. 45 Squadron", nickname: "Flying Daggers", ac: "Tejas Mk1", base: "Sulur", role: "Point Defense", status: "Training", color: "from-emerald-500 to-teal-700", intel: "Indigenously developed Light Combat Aircraft. Agile dogfighter for point defense." },
    { id: 6, name: "99th Air Brigade", nickname: "Xinjiang Strike", ac: "J-16", base: "Hotan", role: "Strike", status: "Deployed", color: "from-red-600 to-red-800", intel: "Advanced multi-role PLAAF fighter based at high altitude. Heavy payload capability." },
];

export const SquadronHangar = () => {
    const [selectedId, setSelectedId] = React.useState(null);

    return (
        <div className="w-full relative">
            <div className="overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory scrollbar-hide">
                <div className="flex gap-6 w-max">
                    {squadrons.map((sq, idx) => (
                        <motion.div
                            key={sq.id}
                            layoutId={`card-${sq.id}`}
                            className="w-80 h-96 relative rounded-3xl overflow-hidden snap-center group cursor-pointer"
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onClick={() => setSelectedId(sq.id)}
                        >
                            {/* Card Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${sq.color} opacity-90`}></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>

                            {/* Content */}
                            <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                                <div>
                                    <div className="text-xs font-mono opacity-70 mb-1 border-b border-white/20 pb-1 flex justify-between">
                                        <span>{sq.base.toUpperCase()}</span>
                                        <span>{sq.role}</span>
                                    </div>
                                    <h3 className="text-3xl font-black italic tracking-tighter mb-1">{sq.nickname.toUpperCase()}</h3>
                                    <p className="text-sm font-bold opacity-90">{sq.name}</p>
                                </div>

                                {/* Center Icon */}
                                <div className="flex-1 flex items-center justify-center">
                                    <Plane className="w-24 h-24 opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500" />
                                </div>

                                <div>
                                    <div className="text-4xl font-black mb-2">{sq.ac}</div>
                                    <div className="flex items-center gap-2 text-xs font-bold bg-black/20 p-2 rounded-lg backdrop-blur-sm w-fit">
                                        {sq.status === "Operational" || sq.status === "Active Combat" || sq.status === "High Readiness" || sq.status === "Deployed"
                                            ? <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                            : <Wrench className="w-4 h-4 text-yellow-400" />
                                        }
                                        <span className="uppercase">{sq.status}</span>
                                    </div>
                                </div>
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Info className="w-5 h-5 text-white/50" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Expanded Detail Modal */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            layoutId={`card-${selectedId}`}
                            className="bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden border border-slate-700 shadow-2xl relative"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                className="absolute top-6 right-6 z-20 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header Image/Background */}
                            <div className={`h-48 bg-gradient-to-br ${squadrons.find(s => s.id === selectedId).color} relative p-8 flex items-end`}>
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="relative z-10 text-white">
                                    <h3 className="text-4xl font-black italic italic tracking-tighter">
                                        {squadrons.find(s => s.id === selectedId).nickname.toUpperCase()}
                                    </h3>
                                    <p className="text-lg font-bold opacity-90">{squadrons.find(s => s.id === selectedId).name}</p>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Assigned Platform</p>
                                        <p className="text-xl font-bold text-white">{squadrons.find(s => s.id === selectedId).ac}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Home Station</p>
                                        <p className="text-xl font-bold text-white">{squadrons.find(s => s.id === selectedId).base}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3">Intelligence Dossier</p>
                                    <p className="text-slate-300 leading-relaxed italic">
                                        "{squadrons.find(s => s.id === selectedId).intel}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: 'Readiness', val: '98%', color: 'text-emerald-400' },
                                        { label: 'Pilot Skill', val: 'ACE', color: 'text-blue-400' },
                                        { label: 'Sortie Rate', val: 'HIGH', color: 'text-orange-400' }
                                    ].map(stat => (
                                        <div key={stat.label} className="text-center p-3 bg-slate-800 rounded-xl border border-slate-700">
                                            <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">{stat.label}</p>
                                            <p className={`text-sm font-black ${stat.color}`}>{stat.val}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
