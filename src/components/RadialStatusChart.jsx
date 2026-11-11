import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

export const RadialStatusChart = ({ data, title }) => {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 320, height: 256 }}>
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="30%"
                        outerRadius="100%"
                        barSize={15}
                        data={data}
                        startAngle={180}
                        endAngle={0}
                    >
                        <RadialBar
                            minAngle={15}
                            label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }}
                            background
                            clockWise
                            dataKey="value"
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Legend iconSize={10} layout="vertical" verticalAlign="bottom" wrapperStyle={{ bottom: 0, fontSize: '10px' }} />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
