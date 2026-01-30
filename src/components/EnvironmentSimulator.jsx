import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, ArrowDown } from 'lucide-react';

export const EnvironmentSimulator = ({ data }) => {
    const [altitude, setAltitude] = useState(0); // 0 = Sea Level, 100 = High Altitude

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white relative overflow-hidden">

            {/* Dynamic Background Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: `rgba(185, 28, 28, ${altitude / 200})` }}></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-yellow-500" />
                        Physics of High Altitude
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Simulate the impact of Tibetan Plateau operations</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-yellow-500">
                        {(altitude * 140).toLocaleString()} ft
                    </div>
                    <span className="text-xs text-slate-500">Elevation</span>
                </div>
            </div>

            <div className="flex gap-8 items-stretch relative z-10">
                {/* Altimeter Slider */}
                <div className="w-16 bg-slate-800 rounded-full p-2 relative">
                    <div className="absolute inset-x-0 top-2 bottom-2 w-1 mx-auto bg-slate-700"></div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={altitude}
                        onChange={(e) => setAltitude(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    {/* Handle Visual */}
                    <motion.div
                        className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-400 rounded-full shadow-lg absolute left-3 flex items-center justify-center border-2 border-white z-10"
                        animate={{ bottom: `${altitude}%` }} // Using animate instead of inline style for smoothness
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ marginBottom: '-20px' }} // Center handle offset
                    >
                        <span className="text-[8px] font-bold text-slate-900">ALT</span>
                    </motion.div>
                </div>

                {/* Metrics Bars */}
                <div className="flex-1 space-y-8 py-4">
                    {data.effects.map((effect) => {
                        // Linear interpolation based on altitude slider
                        const currentVal = effect.seaLevel - ((effect.seaLevel - effect.highAlt) * (altitude / 100));

                        return (
                            <div key={effect.label}>
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-slate-300">{effect.label}</span>
                                    <span className={`${currentVal < 80 ? 'text-red-400' : 'text-emerald-400'}`}>{currentVal.toFixed(0)}{effect.unit}</span>
                                </div>
                                <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
                                    <motion.div
                                        className={`h-full ${effect.color}`}
                                        animate={{ width: `${currentVal}%` }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                    />
                                    {/* Threshold Marker */}
                                    {altitude > 80 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="absolute right-0 top-0 bottom-0 flex items-center pr-2 bg-red-900/80 backdrop-blur-sm"
                                        >
                                            <span className="text-[10px] font-bold text-red-100 flex items-center gap-1">
                                                <ArrowDown className="w-3 h-3" /> DEGRADED
                                            </span>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="mt-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-sm text-slate-300 relative z-10">
                <span className="text-yellow-500 font-bold">Tactical Implication: </span>
                {altitude < 50
                    ? "At lower altitudes (Indo-Gangetic Plain), engines operate at peak efficiency allowing maximum weapon payloads."
                    : "At Tibetan Plateau altitudes, rarefied air forces PLAAF pilots to sacrifice fuel or weapons, reducing combat radius."}
            </div>
        </div>
    );
};
