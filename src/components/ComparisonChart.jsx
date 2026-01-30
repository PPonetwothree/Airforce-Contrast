import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

export const ComparisonChart = ({ title, data, dataKey1, dataKey2, label1, label2, unit = '' }) => {
    const chartData = [
        { name: label1 || 'IAF', value: data[dataKey1], color: '#f97316' }, // Orange 500
        { name: label2 || 'PLAAF', value: data[dataKey2], color: '#ef4444' }, // Red 500
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            </div>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fill: '#64748b', fontSize: 14 }}
                            width={60}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-400 mt-4">{data.note}</p>
        </motion.div>
    );
};
