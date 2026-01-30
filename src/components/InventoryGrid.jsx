import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const AircraftUnit = ({ name, count, type }) => {
    // 1 icon approx 10 aircraft for better detail
    const iconCount = Math.max(1, Math.round(count / 10));

    return (
        <div className="mb-3">
            <div className="flex justify-between items-end mb-1">
                <span className={`text-xs font-bold ${type === 'iaf' ? 'text-orange-600' : 'text-red-600'}`}>{name}</span>
                <span className="text-xs font-mono text-slate-400">{count}</span>
            </div>
            <div className="flex flex-wrap gap-0.5 content-start">
                {Array.from({ length: iconCount }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.01 }}
                    >
                        <Plane
                            className={`w-2.5 h-2.5 ${type === 'iaf' ? 'text-orange-400/80' : 'text-red-400/80'}`}
                            strokeWidth={2}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export const InventoryGrid = ({ data }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Detailed Fleet Inventory</h3>
            <p className="text-xs text-slate-400 mb-8">Visual representation of active combat aircraft (1 Icon ≈ 10 Units)</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* IAF Column */}
                <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 pb-2 border-b border-orange-200">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        Indian Air Force
                    </h4>

                    <div className="space-y-6">
                        {data.details.map((category) => (
                            category.iaf.length > 0 && (
                                <div key={category.category + 'iaf'}>
                                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{category.category}</h5>
                                    <div className="pl-2 border-l-2 border-slate-100 space-y-4">
                                        {category.iaf.map(ac => (
                                            <AircraftUnit key={ac.name} name={ac.name} count={ac.count} type="iaf" />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* PLAAF Column */}
                <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 pb-2 border-b border-red-200">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        PLAAF
                    </h4>

                    <div className="space-y-6">
                        {data.details.map((category) => (
                            category.plaaf.length > 0 && (
                                <div key={category.category + 'plaaf'}>
                                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{category.category}</h5>
                                    <div className="pl-2 border-l-2 border-slate-100 space-y-4">
                                        {category.plaaf.map(ac => (
                                            <AircraftUnit key={ac.name} name={ac.name} count={ac.count} type="plaaf" />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
