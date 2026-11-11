import React from 'react';
import { motion } from 'framer-motion';
import { orbatData } from '../data/orbatData';
import { Shield, Zap, Wind, AlertTriangle } from 'lucide-react';

// Each side gets its own 0-100 track so neither bar can clip the other.
const MetricRow = ({ label, iafVal, plaafVal, icon: Icon }) => (
    <div className="space-y-3">
        <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-2">
                <Icon size={12} />
                {label}
            </div>
            <div className="flex gap-4">
                <span className="text-blue-500">IAF: {iafVal}</span>
                <span className="text-red-500">PLAAF: {plaafVal}</span>
            </div>
        </div>
        {[['bg-blue-600', iafVal], ['bg-red-600', plaafVal]].map(([color, val]) => (
            <div key={color} className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    className={`${color} h-full`}
                />
            </div>
        ))}
    </div>
);

const composite = (m) => Math.round((m.quantity + m.quality + m.awacs + m.logistics) / 4);

const CombatPowerIndex = ({ theater }) => {
    const currentTheater = orbatData.theaters[theater];

    // Indicative analyst estimates (0-100 index per factor), not derived from the dataset.
    const metrics = theater === 'ladakh' ? {
        iaf: { quantity: 65, quality: 85, awacs: 40, logistics: 70 },
        plaaf: { quantity: 85, quality: 90, awacs: 80, logistics: 75 }
    } : {
        iaf: { quantity: 80, quality: 80, awacs: 50, logistics: 85 },
        plaaf: { quantity: 90, quality: 85, awacs: 85, logistics: 70 }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div className="p-6 bg-slate-900/30 border border-slate-800 rounded-2xl border-l-4 border-l-emerald-500 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="text-emerald-500" size={20} />
                        <h3 className="text-white font-bold uppercase tracking-tight text-sm">Theatre Combat Potential</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed italic mb-6">
                        "Numerical superiority in the {currentTheater.name} is partially offset by IAF high-altitude base positioning, though PLAAF 5th-gen deployments present a persistent qualitative asymmetry."
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-black/40 rounded-xl border border-slate-800">
                            <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">IAF Composite</div>
                            <div className="text-2xl font-black text-blue-500">{composite(metrics.iaf)}</div>
                        </div>
                        <div className="text-center p-4 bg-black/40 rounded-xl border border-slate-800">
                            <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">PLAAF Composite</div>
                            <div className="text-2xl font-black text-red-500">{composite(metrics.plaaf)}</div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-amber-900/5 border border-amber-900/20 rounded-2xl flex gap-4 items-start">
                    <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-1" />
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest">Altitude Penalty Active</h4>
                        <p className="text-[10px] text-slate-500 leading-normal">
                            Operations at bases like Ngari Gunsa (4,300m) and Leh (3,500m) incur a 25-35% payload reduction for heavy multi-role fighters.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-8 py-4">
                <MetricRow label="Numerical Strength" iafVal={metrics.iaf.quantity} plaafVal={metrics.plaaf.quantity} icon={Zap} />
                <MetricRow label="Technological Parity" iafVal={metrics.iaf.quality} plaafVal={metrics.plaaf.quality} icon={Wind} />
                <MetricRow label="C4ISR / AWACS Hubs" iafVal={metrics.iaf.awacs} plaafVal={metrics.plaaf.awacs} icon={Zap} />
                <MetricRow label="Logistical Sustainability" iafVal={metrics.iaf.logistics} plaafVal={metrics.plaaf.logistics} icon={Zap} />

                <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-sm" />
                            <span className="text-[9px] font-mono text-slate-500 uppercase">IAF Capability</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-600 rounded-sm" />
                            <span className="text-[9px] font-mono text-slate-500 uppercase">PLAAF Capability</span>
                        </div>
                    </div>
                    <div className="text-[9px] font-mono text-slate-700 uppercase">Indicative index 0-100 · composite = mean of 4</div>
                </div>
            </div>
        </div>
    );
};

export default CombatPowerIndex;
