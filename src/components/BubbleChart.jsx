import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, ZAxis, Cell } from 'recharts';
import { motion } from 'framer-motion';

export const BubbleChart = ({ title, data, unit = '' }) => {
    // Transform simple key-value to bubble data format
    // X-axis: arbitrary category spacing, Y-axis: Value/Magnitude, Z-axis: Bubble Size (Value)
    const chartData = [
        { name: 'IAF', x: 30, y: data.iaf, z: data.iaf, color: '#f97316' }, // Orange
        { name: 'PLAAF', x: 70, y: data.plaaf, z: data.plaaf, color: '#ef4444' } // Red
    ];

    const maxVal = Math.max(data.iaf, data.plaaf);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center h-full"
        >
            <div className="mb-4 text-center w-full">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            </div>

            <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis type="number" dataKey="x" domain={[0, 100]} hide />
                        <YAxis type="number" dataKey="y" domain={[0, maxVal * 1.2]} hide />
                        <ZAxis type="number" dataKey="z" range={[2000, 8000]} /> {/* Bubble Size Range */}
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const d = payload[0].payload;
                                    return (
                                        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs">
                                            <p className="font-bold text-base mb-1">{d.name}</p>
                                            <p>{title}: <span className="font-mono text-emerald-400">{d.y.toLocaleString()}</span> {unit}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Scatter name={title} data={chartData}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>

                {/* Custom Labels overlay because Scatters can be tricky with positioning text inside */}
                <div className="absolute inset-0 pointer-events-none flex justify-between px-10 items-end pb-8">
                    <div className="text-center w-1/2 flex flex-col items-center" style={{ paddingRight: '20%' }}>
                        <span className="text-2xl font-bold text-orange-600 block">{data.iaf.toLocaleString()}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">India (IAF)</span>
                    </div>
                    <div className="text-center w-1/2 flex flex-col items-center" style={{ paddingLeft: '20%' }}>
                        <span className="text-2xl font-bold text-red-600 block">{data.plaaf.toLocaleString()}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">China (PLAAF)</span>
                    </div>
                </div>
            </div>
            <p className="text-xs text-center text-slate-400 mt-2">{data.note}</p>
        </motion.div>
    );
};
