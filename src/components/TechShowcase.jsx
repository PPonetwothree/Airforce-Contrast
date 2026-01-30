import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Shield, Zap } from 'lucide-react';

const TechItem = ({ name, side, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: side === 'iaf' ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: delay * 0.1 }}
        className={`flex items-center gap-3 p-3 rounded-lg border ${side === 'iaf' ? 'bg-orange-50 border-orange-100' : 'bg-red-50 border-red-100'}`}
    >
        {side === 'iaf' ? <Shield className="w-5 h-5 text-orange-500" /> : <Zap className="w-5 h-5 text-red-500" />}
        <span className="font-medium text-slate-700">{name}</span>
    </motion.div>
);

export const TechShowcase = ({ data }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 rounded-lg"><Plane className="w-6 h-6 text-blue-600" /></div>
                <h3 className="text-xl font-bold text-slate-900">{data.title}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-4 border-b border-orange-100 pb-2">Indian Air Force</h4>
                    <div className="space-y-3">
                        {data.iaf.map((tech, i) => (
                            <TechItem key={tech} name={tech} side="iaf" delay={i} />
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4 border-b border-red-100 pb-2">PLAAF</h4>
                    <div className="space-y-3">
                        {data.plaaf.map((tech, i) => (
                            <TechItem key={tech} name={tech} side="plaaf" delay={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
