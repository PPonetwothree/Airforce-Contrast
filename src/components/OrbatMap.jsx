import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plane, Shield, Info, Target } from 'lucide-react';

const MapMarker = ({ unit, onClick, isSelected }) => (
    <motion.button
        className={`absolute -translate-x-1/2 -translate-y-1/2 group z-10 ${isSelected ? 'z-20' : ''}`}
        style={{ left: unit.cords.x, top: unit.cords.y }}
        whileHover={{ scale: 1.2 }}
        onClick={() => onClick(unit)}
    >
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg backdrop-blur-sm transition-colors ${unit.side === 'iaf'
            ? 'bg-blue-500/20 border-blue-400 text-blue-100 shadow-blue-500/30'
            : 'bg-red-500/20 border-red-500 text-red-100 shadow-red-500/30'
            } ${isSelected ? 'ring-4 ring-white/20 scale-110' : ''}`}>
            <Plane className={`w-4 h-4 ${unit.side === 'plaaf' ? 'rotate-180' : ''}`} />

            {/* Ripple Effect */}
            <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${unit.side === 'iaf' ? 'bg-blue-400' : 'bg-red-400'}`}></span>
        </div>

        {/* Tooltip Label */}
        <div className={`absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900/90 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${unit.side === 'iaf' ? 'text-blue-300' : 'text-red-300'
            }`}>
            <span className="font-bold">{unit.base}</span>
        </div>
    </motion.button>
);

export const OrbatMap = ({ iafUnits, plaafUnits }) => {
    const [filter, setFilter] = useState('all'); // all, iaf, plaaf
    const [selectedUnit, setSelectedUnit] = useState(null);

    // Remapped coordinates for new map_indochina_border.png
    // Assuming map covers Ladakh (left) to Arunachal (right)
    const units = [
        // IAF (Blue)
        { ...iafUnits[0], cords: { x: '23%', y: '52%' }, side: 'iaf' }, // Ambala
        { ...iafUnits[1], cords: { x: '21%', y: '50%' }, side: 'iaf' }, // Halwara
        { ...iafUnits[2], cords: { x: '18%', y: '38%' }, side: 'iaf' }, // Srinagar
        { ...iafUnits[3], cords: { x: '78%', y: '65%' }, side: 'iaf' }, // Hasimara
        { ...iafUnits[4], cords: { x: '88%', y: '62%' }, side: 'iaf' }, // Tezpur

        // PLAAF (Red)
        { ...plaafUnits[0], cords: { x: '25%', y: '28%' }, side: 'plaaf' }, // Hotan
        { ...plaafUnits[1], cords: { x: '68%', y: '48%' }, side: 'plaaf' }, // Lhasa
        { ...plaafUnits[2], cords: { x: '62%', y: '52%' }, side: 'plaaf' }, // Shigatse
        { ...plaafUnits[3], cords: { x: '35%', y: '38%' }, side: 'plaaf' }, // Ngari Gunsa
        { ...plaafUnits[4], cords: { x: '75%', y: '45%' }, side: 'plaaf' }  // Nyingchi
    ];

    const filteredUnits = units.filter(u => filter === 'all' || u.side === filter);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
            {/* Map Area */}
            <div className="lg:col-span-2 relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">

                {/* Tactical Map Background */}
                <div className="absolute inset-0 bg-[url('/assets/map_indochina_border.png')] bg-cover bg-center opacity-60"></div>
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>

                {/* Tactical Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                {/* Legend / Filter */}
                <div className="absolute top-6 left-6 flex gap-2 z-20">
                    <button onClick={() => setFilter('all')} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${filter === 'all' ? 'bg-slate-100 text-slate-900' : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:bg-slate-800'}`}>ALL UNITS</button>
                    <button onClick={() => setFilter('iaf')} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${filter === 'iaf' ? 'bg-blue-500 text-white' : 'bg-slate-900/80 text-blue-400 border border-blue-900/50 hover:bg-blue-900/20'}`}>IAF (BLUE)</button>
                    <button onClick={() => setFilter('plaaf')} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${filter === 'plaaf' ? 'bg-red-600 text-white' : 'bg-slate-900/80 text-red-400 border border-red-900/50 hover:bg-red-900/20'}`}>PLAAF (RED)</button>
                </div>

                {/* Markers */}
                <div className="relative w-full h-full">
                    {filteredUnits.map((unit, idx) => (
                        <MapMarker
                            key={idx}
                            unit={unit}
                            isSelected={selectedUnit?.name === unit.name}
                            onClick={setSelectedUnit}
                        />
                    ))}
                </div>

                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-500">
                    SECTOR: LAC_EAST_WEST // SAT_UPLINK_ACTIVE
                </div>
            </div>

            {/* Info Panel */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-slate-400" />
                    Unit Intelligence
                </h3>

                {selectedUnit ? (
                    <motion.div
                        key={selectedUnit.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1"
                    >
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 ${selectedUnit.side === 'iaf' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                            <Shield className="w-3 h-3" />
                            {selectedUnit.side === 'iaf' ? 'Western Air Command' : 'Western Theater Command'}
                        </div>

                        <h2 className="text-3xl font-black text-slate-900 mb-1">{selectedUnit.sq}</h2>
                        <h4 className="text-lg font-bold text-slate-500 mb-6 font-mono border-b border-slate-100 pb-4">
                            Base: {selectedUnit.base}
                        </h4>

                        <div className="space-y-6">
                            <div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Aircraft Assigned</span>
                                <div className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                    <Plane className="w-5 h-5" />
                                    {selectedUnit.ac}
                                </div>
                            </div>

                            <div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Operational Role</span>
                                <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    {selectedUnit.role || "Primary air superiority and interception duties for the sector. High readiness status maintained."}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400">Readiness</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className={`w-2 h-4 rounded-sm ${i <= 4 ? (selectedUnit.side === 'iaf' ? 'bg-blue-500' : 'bg-red-500') : 'bg-slate-200'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                        <Target className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-sm font-bold text-slate-400">Select a unit on the map<br />for detailed intelligence.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
