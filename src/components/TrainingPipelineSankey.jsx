import React from 'react';
import { motion } from 'framer-motion';

const TrainingPipelineSankey = ({ data, mode }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="w-full h-full relative flex items-center justify-center p-4">
            <svg className="w-full h-full" overflow="visible">
                {data.map((system, systemIndex) => {
                    const nodes = system.nodes;
                    const verticalOffset = mode === 'dual' ? (systemIndex === 0 ? -100 : 100) : 0;

                    return (
                        <g key={systemIndex} transform={`translate(0, ${verticalOffset + 150})`}>
                            {/* Links (Paths) */}
                            {nodes.map((node, i) => {
                                if (i === nodes.length - 1) return null;
                                const x1 = (i / (nodes.length - 1)) * 100 + "%";
                                const x2 = ((i + 1) / (nodes.length - 1)) * 100 + "%";
                                const thickness = Math.log10(node.value) * 10;

                                return (
                                    // <line> accepts percentage coordinates; a path `d` does not.
                                    <motion.line
                                        key={`link-${i}`}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.3 }}
                                        x1={x1}
                                        y1={0}
                                        x2={x2}
                                        y2={0}
                                        stroke={node.color}
                                        strokeWidth={thickness}
                                        style={{ vectorEffect: 'non-scaling-stroke' }}
                                    />
                                );
                            })}

                            {/* Nodes */}
                            {nodes.map((node, i) => {
                                const x = (i / (nodes.length - 1)) * 100 + "%";
                                const radius = Math.log10(node.value) * 3;

                                return (
                                    <g key={`node-${i}`}>
                                        <motion.circle
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            cx={x}
                                            cy={0}
                                            r={radius}
                                            fill={node.color}
                                            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                                        />

                                        <text
                                            x={x}
                                            y={-radius - 10}
                                            className="text-[8px] font-mono fill-slate-500 uppercase tracking-tighter"
                                            textAnchor="middle"
                                        >
                                            {node.label}
                                        </text>
                                        <text
                                            x={x}
                                            y={radius + 15}
                                            className="text-[10px] font-bold fill-white"
                                            textAnchor="middle"
                                        >
                                            {node.value.toLocaleString()}
                                        </text>
                                    </g>
                                );
                            })}
                        </g>
                    );
                })}
            </svg>

            {/* Legend for Dual Mode */}
            {mode === 'dual' && (
                <div className="absolute bottom-0 left-0 flex gap-4 text-[9px] font-mono uppercase">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-slate-500">IAF Pipeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="text-slate-500">PLAAF Pipeline</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingPipelineSankey;
