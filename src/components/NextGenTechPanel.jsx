import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Target, Gauge, Shield } from 'lucide-react';

const TechCard = ({ tech, side, specs }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            className={`rounded-xl border overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg bg-white ring-1 ring-offset-2' : 'bg-white shadow-sm hover:shadow-md'} ${side === 'iaf' ? 'border-orange-100 ring-orange-200' : 'border-red-100 ring-red-200'}`}
        >
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${side === 'iaf' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
                        <Zap className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-800">{tech}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && specs && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-100 bg-slate-50/50"
                    >
                        <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-slate-400 text-xs uppercase tracking-wider block">Engine</span>
                                <div className="font-medium text-slate-900 flex items-center gap-1.5"><Gauge className="w-3 h-3" /> {specs.engine}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-400 text-xs uppercase tracking-wider block">Radar</span>
                                <div className="font-medium text-slate-900 flex items-center gap-1.5"><Target className="w-3 h-3" /> {specs.radar}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-400 text-xs uppercase tracking-wider block">Range</span>
                                <div className="font-medium text-slate-900">{specs.range}</div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-400 text-xs uppercase tracking-wider block">Type</span>
                                <div className="font-medium text-slate-900">{specs.type}</div>
                            </div>
                            <div className="col-span-2 pt-2 border-t border-slate-100 mt-2">
                                <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">Key Features</span>
                                <div className="flex flex-wrap gap-2">
                                    {specs.features.map(f => (
                                        <span key={f} className="px-2 py-1 rounded bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">{f}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export const NextGenTechPanel = ({ data }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-50 rounded-lg"><Shield className="w-6 h-6 text-indigo-600" /></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Next-Generation Systems</h3>
                    <p className="text-sm text-slate-500">Interactive Technical Assessment</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-4">India (IAF)</h4>
                    <div className="space-y-3">
                        {data.iaf.map(item => {
                            // Extract base name for spec lookup (e.g. "Tejas Mk2 (Dev)" -> "Tejas Mk2")
                            const specKey = Object.keys(data.specs).find(k => item.includes(k));
                            return <TechCard key={item} tech={item} side="iaf" specs={specKey ? data.specs[specKey] : null} />
                        })}
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-4">China (PLAAF)</h4>
                    <div className="space-y-3">
                        {data.plaaf.map(item => {
                            const specKey = Object.keys(data.specs).find(k => item.includes(k));
                            return <TechCard key={item} tech={item} side="plaaf" specs={specKey ? data.specs[specKey] : null} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
