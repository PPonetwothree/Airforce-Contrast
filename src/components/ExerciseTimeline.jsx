import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const ExerciseTimeline = ({ exercises, activeExercise, setActiveExercise, hoveredExercise, setHoveredExercise }) => {
    const scrollRef = useRef(null);

    // Generate Year Markers (2020-2025)
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Calculate position (percent) based on date
    const getPos = (dateStr) => {
        const date = new Date(dateStr);
        const start = new Date("2020-01-01");
        const end = new Date("2025-12-31");
        return ((date - start) / (end - start)) * 100;
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end mb-2 px-2">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Temporal Distribution</div>
                <div className="text-[10px] font-mono text-slate-600">DRAG TO NAVIGATE (2020 — 2025)</div>
            </div>

            <div
                ref={scrollRef}
                className="w-full relative h-32 bg-black/40 rounded-lg border border-slate-900/50 overflow-x-auto scrollbar-hide select-none"
            >
                <div className="absolute top-0 left-0 h-full w-[2400px] pointer-events-none">
                    {/* Year Grid */}
                    <div className="flex w-full h-full border-b border-slate-900/30">
                        {years.map(year => (
                            <div key={year} className="flex-1 border-r border-slate-900/50 relative pt-2 px-4">
                                <span className="text-[10px] font-bold text-slate-700 font-mono italic">{year}</span>
                                <div className="flex justify-between w-full absolute bottom-0 left-0 px-4 pb-2 opacity-20">
                                    {months.map(m => <span key={m} className="text-[8px] text-slate-500">{m[0]}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Timeline Events Axis */}
                    <div className="absolute top-12 left-0 w-full h-16">
                        {exercises.map((ex) => {
                            const startPos = getPos(ex.dateRange.start);
                            const endPos = getPos(ex.dateRange.end);
                            const width = Math.max(0.5, endPos - startPos); // ensure visibility
                            const isSelected = activeExercise?.id === ex.id;
                            const isHovered = hoveredExercise?.id === ex.id;
                            const color = ex.service === 'IAF' ? 'bg-blue-500' : 'bg-red-500';

                            return (
                                <motion.div
                                    key={ex.id}
                                    className={`absolute h-3 rounded-full cursor-pointer pointer-events-auto transition-all ${color} ${isHovered || isSelected ? 'opacity-100 scale-y-125 z-10' : 'opacity-40'
                                        }`}
                                    style={{
                                        left: `${startPos}%`,
                                        width: `${width}%`,
                                        top: ex.service === 'IAF' ? '10px' : '30px',
                                        boxShadow: isHovered || isSelected ? `0 0 10px ${ex.service === 'IAF' ? 'rgba(59,130,246,0.5)' : 'rgba(239,68,68,0.5)'}` : 'none'
                                    }}
                                    onMouseEnter={() => setHoveredExercise(ex)}
                                    onMouseLeave={() => setHoveredExercise(null)}
                                    onClick={() => setActiveExercise(ex)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex justify-between px-1">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="text-[9px] text-slate-600 uppercase">IAF Series</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span className="text-[9px] text-slate-600 uppercase">PLAAF Series</span>
                    </div>
                </div>
                <div className="text-[9px] text-slate-700 font-mono uppercase">Reference: OSINT Data (Moderate Confidence)</div>
            </div>
        </div>
    );
};

export default ExerciseTimeline;
