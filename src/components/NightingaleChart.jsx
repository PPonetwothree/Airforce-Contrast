import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

export const NightingaleChart = () => {
    // Strategic Reach & Personnel Strength Data normalized for visualization
    const data = [
        { subject: 'Personnel', A: 170, B: 400, fullMark: 500 }, // in thousands
        { subject: 'Pilots', A: 38, B: 70, fullMark: 100 }, // in hundreds
        { subject: 'Warheads', A: 17, B: 50, fullMark: 600 }, // in tens
        { subject: 'Missiles', A: 60, B: 120, fullMark: 150 }, // Abstract index
        { subject: 'Area', A: 6, B: 54, fullMark: 60 }, // in 100k sq km
        { subject: 'Induction', A: 10, B: 100, fullMark: 120 }, // Annual rate
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center h-full relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-slate-200 to-red-500"></div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 mt-4 z-10">Strategic Balance</h3>
            <p className="text-xs text-slate-400 mb-6 z-10">Multi-axis capability comparison</p>

            <div className="w-full h-80 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                        <PolarGrid opacity={0.3} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#1e293b', fontWeight: 'bold' }}
                        />
                        <Radar
                            name="IAF"
                            dataKey="A"
                            stroke="#f97316"
                            strokeWidth={3}
                            fill="#f97316"
                            fillOpacity={0.4}
                        />
                        <Radar
                            name="PLAAF"
                            dataKey="B"
                            stroke="#ef4444"
                            strokeWidth={3}
                            fill="#ef4444"
                            fillOpacity={0.4}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4 text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full opacity-50"></div>
                    <span className="text-slate-600">IAF</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full opacity-50"></div>
                    <span className="text-slate-600">PLAAF</span>
                </div>
            </div>
        </motion.div>
    );
};
