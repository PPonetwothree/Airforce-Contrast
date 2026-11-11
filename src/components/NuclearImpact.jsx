import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radiation, Target, AlertTriangle } from 'lucide-react';
import { blastRadiusKm, thermalRadiusKm, roundKm } from '../sim/nuclearEffects';

// `hardness` describes how the target responds to an airburst; hardened and buried targets
// generally require a surface burst and high accuracy, which this airburst model does not cover.
const targets = [
    { id: 'tb1', name: 'Strategic Airbase', type: 'Counter-Force', desc: 'Main Bomber Wing HQ', image: '/assets/target_airbase.png', hardness: 'Soft-Medium', note: 'Aircraft in the open and fuel stores are vulnerable well inside the 5 psi ring; hardened shelters are not.' },
    { id: 'tb2', name: 'Command Bunker', type: 'C4ISR Node', desc: 'Hardened Underground Facility', image: '/assets/target_bunker.png', hardness: 'Very Hard (buried)', note: 'Deeply buried facilities are largely unaffected by airburst overpressure; defeat depends on surface burst, accuracy and depth.' },
    { id: 'tb3', name: 'Missile Silo Complex', type: 'Strategic', desc: 'ICBM Launch Site', image: '/assets/target_silo.png', hardness: 'Hardened', note: 'Silos are built to withstand overpressures far above 5 psi; kill probability is driven by accuracy (CEP), not these radii.' },
    { id: 'tb4', name: 'Naval Dockyard', type: 'Logistics', desc: 'Carrier Strike Group Port', image: '/assets/target_dockyard.png', hardness: 'Soft', note: 'Cranes, warehouses and ships alongside are vulnerable across the 5 psi ring; collateral effects on adjacent urban areas are likely.' },
];

const yields = [
    { kt: 15, label: 'Tactical (15kt)', note: 'Hiroshima size' },
    { kt: 100, label: 'Strategic (100kt)', note: 'Typical modern warhead class' },
    { kt: 3000, label: 'Megaton-class (3Mt)', note: 'DF-5 class (legacy heavy ICBM)' },
].map(y => ({ ...y, r_blast: roundKm(blastRadiusKm(y.kt)), r_thermal: roundKm(thermalRadiusKm(y.kt)) }));

export const NuclearImpact = ({ iafWarheads, plaafWarheads }) => {
    const [selectedTarget, setSelectedTarget] = useState(targets[0]);
    const [selectedYield, setSelectedYield] = useState(yields[1]);

    return (
        <div className="bg-slate-900 rounded-3xl overflow-hidden border border-red-900/30 shadow-2xl relative min-h-[500px] flex md:flex-row flex-col">

            {/* Sidebar Controls */}
            <div className="w-full md:w-1/3 bg-slate-950 p-6 border-r border-slate-800 z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-red-900/20 rounded-lg">
                        <Radiation className="w-6 h-6 text-red-500 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-100">Deterrence Logic</h3>
                        <p className="text-xs text-slate-500">Calculate Impact Radius</p>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">1. Select Target Profile</label>
                    <div className="space-y-2">
                        {targets.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setSelectedTarget(t)}
                                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${selectedTarget.id === t.id ? 'bg-red-900/20 border-red-500 text-red-100' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                            >
                                <div className="font-bold">{t.name}</div>
                                <div className="text-[10px] opacity-70">{t.type}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">2. Select Yield (Kt)</label>
                    <div className="grid grid-cols-1 gap-2">
                        {yields.map(y => (
                            <button
                                key={y.kt}
                                onClick={() => setSelectedYield(y)}
                                className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${selectedYield.kt === y.kt ? 'bg-orange-900/20 border-orange-500 text-orange-100' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                            >
                                <div className="font-bold">{y.label}</div>
                                <div className="text-[10px] opacity-70">{y.note}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                    <div className="flex justify-between text-xs mb-2">
                        <span className="text-slate-500">India (national stockpile)</span>
                        <span className="text-orange-400 font-bold">{iafWarheads} Warheads</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-500">China (national stockpile)</span>
                        <span className="text-red-500 font-bold">{plaafWarheads} Warheads</span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-3 leading-relaxed">
                        SIPRI Yearbook 2025 estimates. Totals cover all delivery systems, not air force holdings alone.
                    </p>
                </div>
            </div>

            {/* Main Visualizer */}
            <div className="flex-1 bg-black relative overflow-hidden flex items-center justify-center">
                {/* Target Image Background */}
                <div className="absolute inset-0 z-0 opacity-50">
                    <img src={selectedTarget.image} alt={selectedTarget.name} className="w-full h-full object-cover grayscale mix-blend-screen" />
                </div>

                {/* Map Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-10"></div>

                {/* Target Icon */}
                <div className="relative z-20 flex flex-col items-center">
                    <Target className="w-8 h-8 text-slate-700 mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    <span className="text-xs font-mono text-white bg-black/50 px-2 py-1 rounded uppercase tracking-widest backdrop-blur-sm">{selectedTarget.name}</span>
                </div>

                {/* Blast Rings */}
                <motion.div
                    className="absolute rounded-full border border-yellow-500/30 bg-yellow-500/10 z-20 flex items-center justify-center"
                    initial={{ width: 0, height: 0 }}
                    animate={{ width: selectedYield.r_blast * 20, height: selectedYield.r_blast * 20 }} // Scale factor for visual
                    transition={{ type: "spring", stiffness: 50 }}
                >
                    <span className="absolute -top-6 text-[10px] text-yellow-500 font-bold whitespace-nowrap">5 psi blast: {selectedYield.r_blast}km</span>
                </motion.div>

                <motion.div
                    className="absolute rounded-full border border-red-600/30 bg-red-600/10 z-10 flex items-center justify-center"
                    initial={{ width: 0, height: 0 }}
                    animate={{ width: selectedYield.r_thermal * 20, height: selectedYield.r_thermal * 20 }}
                    transition={{ type: "spring", stiffness: 40 }}
                >
                    <span className="absolute -bottom-6 text-[10px] text-red-500 font-bold whitespace-nowrap">3rd-degree burns: {selectedYield.r_thermal}km</span>
                </motion.div>

                {/* Impact Stats Overlay */}
                <div className="absolute top-6 right-6 bg-slate-900/90 border border-slate-700 p-4 rounded-xl backdrop-blur-md z-30 w-64">
                    <h4 className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs mb-3">
                        <AlertTriangle className="w-4 h-4" /> Impact Assessment
                    </h4>
                    <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex justify-between">
                            <span>Target Hardness:</span>
                            <span className="text-white">{selectedTarget.hardness}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{selectedTarget.note}</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed border-t border-slate-700 pt-2 mt-2">
                            Radii: optimum-height airburst, scaled from Glasstone &amp; Dolan reference values. Casualties depend on population density, burst height, weather and warning time and are not modelled here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
