import React from 'react';
import { motion } from 'framer-motion';

const MetricRadarChart = ({ iaf, plaaf, focus }) => {
    const categories = [
        { key: 'selectionRatio', label: 'Selection Rigor' },
        { key: 'simulatorIntegration', label: 'Sim-Actual Ratio' },
        { key: 'instructorExperience', label: 'Instr. Domain' },
        { key: 'technicalEducation', label: 'STEM Depth' },
        { key: 'politicalMandate', label: 'Doctrinal/Political' }
    ];

    const points = (metrics) => categories.map((cat, i) => {
        const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
        const value = metrics[cat.key];
        const r = value * 100;
        return {
            x: 100 + r * Math.cos(angle),
            y: 100 + r * Math.sin(angle)
        };
    });

    const iafPoints = points(iaf);
    const plaafPoints = points(plaaf);

    const pathIAF = `M ${iafPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;
    const pathPLAAF = `M ${plaafPoints.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 200 200" className="w-full max-w-[280px] overflow-visible">
                {/* Radar Background Polygons */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, i) => (
                    <polygon
                        key={i}
                        points={categories.map((_, j) => {
                            const angle = (Math.PI * 2 * j) / categories.length - Math.PI / 2;
                            return `${100 + level * 100 * Math.cos(angle)},${100 + level * 100 * Math.sin(angle)}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="0.5"
                    />
                ))}

                {/* Axes */}
                {categories.map((cat, i) => {
                    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
                    return (
                        <line
                            key={i}
                            x1="100"
                            y1="100"
                            x2={100 + 100 * Math.cos(angle)}
                            y2={100 + 100 * Math.sin(angle)}
                            stroke="#1e293b"
                            strokeWidth="0.5"
                        />
                    );
                })}

                {/* Labels */}
                {categories.map((cat, i) => {
                    const angle = (Math.PI * 2 * i) / categories.length - Math.PI / 2;
                    const x = 100 + 115 * Math.cos(angle);
                    const y = 100 + 115 * Math.sin(angle);
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            className="text-[6px] fill-slate-500 font-bold uppercase"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {cat.label}
                        </text>
                    );
                })}

                {/* PLAAF Polygon */}
                {(focus === 'plaaf' || focus === 'comparison') && (
                    <motion.path
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        d={pathPLAAF}
                        fill="#ef4444"
                        stroke="#ef4444"
                        strokeWidth="1"
                    />
                )}

                {/* IAF Polygon */}
                {(focus === 'iaf' || focus === 'comparison') && (
                    <motion.path
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        d={pathIAF}
                        fill="#3b82f6"
                        stroke="#3b82f6"
                        strokeWidth="1"
                    />
                )}
            </svg>

            <div className="flex gap-4 mt-8">
                {(focus === 'iaf' || focus === 'comparison') && (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-sm" />
                        <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">IAF</span>
                    </div>
                )}
                {(focus === 'plaaf' || focus === 'comparison') && (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-sm" />
                        <span className="text-[8px] font-mono text-slate-400 font-bold uppercase">PLAAF</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricRadarChart;
