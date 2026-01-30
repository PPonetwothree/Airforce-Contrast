import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { orbatData } from '../data/orbatData';

const StrategicDeploymentMap = ({ theater }) => {
    const [hoveredBase, pHoveredBase] = useState(null);
    const [showRadius, setShowRadius] = useState(true);

    const currentTheater = orbatData.theaters[theater];

    // Normalized coordinates for the LAC SVG
    // This is a schematic representation, not a true geographic projection
    const getBaseCoords = (baseName, side) => {
        // Schematic mapping for demonstration
        const mappings = {
            "Ngari Gunsa (Ali)": { x: 300, y: 200 },
            "Hotan": { x: 350, y: 150 },
            "Lhasa Gonggar": { x: 600, y: 400 },
            "Shigatse": { x: 550, y: 420 },
            "Ambala": { x: 250, y: 350 },
            "Adampur": { x: 230, y: 320 },
            "Tezpur": { x: 750, y: 450 },
            "Hasimara": { x: 680, y: 450 },
            "Leh": { x: 320, y: 250 },
            "Srinagar": { x: 240, y: 260 }
        };
        return mappings[baseName] || { x: 400, y: 300 };
    };

    const iafBases = orbatData.iaf.commands.flatMap(c => c.bases).filter(b => currentTheater.iafBases.includes(b.name));
    const plaafBases = orbatData.plaaf.commands.flatMap(c => c.bases).filter(b => currentTheater.plaafBases.includes(b.name));

    return (
        <div className="w-full h-full min-h-[500px] relative bg-slate-900/10 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 1000 600" className="w-full h-full max-h-[600px] p-8">
                {/* Schematic Border Line (LAC) */}
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    d="M 200 200 L 400 300 L 500 450 L 800 500"
                    stroke="#334155"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    fill="none"
                />

                {/* IAFF Bases */}
                {iafBases.map((base, i) => {
                    const { x, y } = getBaseCoords(base.name, 'iaf');
                    return (
                        <g key={`iaf-${base.name}`} onMouseEnter={() => pHoveredBase(base)} onMouseLeave={() => pHoveredBase(null)}>
                            {showRadius && (
                                <motion.circle
                                    initial={{ r: 0 }}
                                    animate={{ r: 120 }}
                                    cx={x} cy={y}
                                    className="fill-blue-500/5 stroke-blue-500/20"
                                    strokeWidth="1"
                                />
                            )}
                            <motion.circle
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                cx={x} cy={y} r="6"
                                className="fill-blue-500 stroke-white/20 cursor-pointer"
                            />
                        </g>
                    );
                })}

                {/* PLAAF Bases */}
                {plaafBases.map((base, i) => {
                    const { x, y } = getBaseCoords(base.name, 'plaaf');
                    return (
                        <g key={`plaaf-${base.name}`} onMouseEnter={() => pHoveredBase(base)} onMouseLeave={() => pHoveredBase(null)}>
                            {showRadius && (
                                <motion.circle
                                    initial={{ r: 0 }}
                                    animate={{ r: 150 }}
                                    cx={x} cy={y}
                                    className="fill-red-500/5 stroke-red-500/20"
                                    strokeWidth="1"
                                />
                            )}
                            <motion.circle
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                cx={x} cy={y} r="6"
                                className="fill-red-500 stroke-white/20 cursor-pointer"
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Tooltip / Info Panel */}
            <AnimatePresence>
                {hoveredBase && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-10 left-10 bg-black/80 border border-slate-700 p-6 rounded-xl backdrop-blur-md w-72 shadow-2xl z-50 pointer-events-none"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="text-white font-bold text-lg">{hoveredBase.name}</h4>
                                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                                    {hoveredBase.altitude ? `ALTITUDE: ${hoveredBase.altitude}` : 'STRATEGIC STATION'}
                                </div>
                            </div>
                            <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${hoveredBase.squadrons ? 'bg-blue-900/30 text-blue-400' : 'bg-red-900/30 text-red-400'}`}>
                                {hoveredBase.squadrons ? 'IAF' : 'PLAAF'}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="text-[9px] text-slate-500 uppercase font-mono mb-2">Deployed Units</div>
                                <div className="flex flex-wrap gap-2">
                                    {(hoveredBase.squadrons || hoveredBase.units).map(unit => (
                                        <span key={unit} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                                            {unit}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {hoveredBase.impact && (
                                <div className="pt-3 border-t border-slate-800">
                                    <div className="text-[9px] text-amber-500 uppercase font-mono mb-1">Impact Analysis</div>
                                    <p className="text-[10px] text-slate-400 italic leading-snug">{hoveredBase.impact}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Map Controls */}
            <div className="absolute top-10 right-10 flex flex-col gap-4">
                <button
                    onClick={() => setShowRadius(!showRadius)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${showRadius ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}
                >
                    {showRadius ? 'Hide Reach Radius' : 'Show Reach Radius'}
                </button>
            </div>

            <div className="absolute bottom-10 right-10 text-[9px] font-mono text-slate-600 flex gap-4 uppercase">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>IAF Sector Bases</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>PLAAF Sector Bases</span>
                </div>
            </div>
        </div>
    );
};

export default StrategicDeploymentMap;
