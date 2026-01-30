import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ExerciseMap = ({ exercises, activeExercise, setActiveExercise, hoveredExercise, setHoveredExercise, showHeatmap }) => {

    // Minimalist World Map projection (pseudo-mercator for visual vibes)
    // Coordinates are roughly: x = (long + 180) * (width / 360), y = (90 - lat) * (height / 180)
    const mapWidth = 1000;
    const mapHeight = 500;

    const project = (lat, lng) => {
        const x = (lng + 180) * (mapWidth / 360);
        const y = (90 - lat) * (mapHeight / 180);
        return { x, y };
    };

    const heatmapPoints = useMemo(() => {
        if (!showHeatmap) return [];
        return exercises.map(ex => {
            const { x, y } = project(ex.location.lat, ex.location.lng);
            return { x, y, r: ex.intensity * 60, opacity: 0.15 };
        });
    }, [exercises, showHeatmap]);

    return (
        <div className="w-full h-full relative cursor-crosshair select-none bg-slate-950/20">
            <svg
                viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}
            >
                {/* Subdued World Outline (Simplified for aesthetic) */}
                <rect width={mapWidth} height={mapHeight} fill="transparent" />

                {/* Heatmap Layer */}
                {showHeatmap && (
                    <g>
                        <defs>
                            <filter id="heatmap-blur">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                            </filter>
                        </defs>
                        <g filter="url(#heatmap-blur)">
                            {heatmapPoints.map((p, i) => (
                                <circle
                                    key={i}
                                    cx={p.x}
                                    cy={p.y}
                                    r={p.r}
                                    fill="#fbbf24"
                                    fillOpacity={p.opacity}
                                />
                            ))}
                        </g>
                    </g>
                )}

                {/* Global Grid Lines */}
                <g stroke="rgba(255,255,255,0.03)" strokeWidth="0.5">
                    {[...Array(12)].map((_, i) => (
                        <line key={`v-${i}`} x1={i * (mapWidth / 12)} y1="0" x2={i * (mapWidth / 12)} y2={mapHeight} />
                    ))}
                    {[...Array(6)].map((_, i) => (
                        <line key={`h-${i}`} x1="0" y1={i * (mapHeight / 6)} x2={mapWidth} y2={i * (mapHeight / 6)} />
                    ))}
                </g>

                {/* Exercise Markers */}
                {exercises.map((ex) => {
                    const { x, y } = project(ex.location.lat, ex.location.lng);
                    const isSelected = activeExercise?.id === ex.id;
                    const isHovered = hoveredExercise?.id === ex.id;
                    const markerColor = ex.service === 'IAF' ? '#3b82f6' : '#ef4444';

                    return (
                        <g
                            key={ex.id}
                            className="cursor-pointer"
                            onClick={() => setActiveExercise(ex)}
                            onMouseEnter={() => setHoveredExercise(ex)}
                            onMouseLeave={() => setHoveredExercise(null)}
                        >
                            <motion.circle
                                cx={x}
                                cy={y}
                                initial={{ r: 0 }}
                                animate={{
                                    r: isSelected ? 8 : (isHovered ? 6 : 3),
                                    strokeWidth: isSelected ? 4 : (isHovered ? 2 : 0)
                                }}
                                fill={markerColor}
                                stroke={markerColor}
                                strokeOpacity={0.3}
                                className="transition-all"
                            />

                            {/* Scale Halo */}
                            <circle
                                cx={x}
                                cy={y}
                                r={ex.scale === 'Multinational' ? 12 : (ex.scale === 'Theatre' ? 16 : 8)}
                                fill="transparent"
                                stroke={markerColor}
                                strokeWidth="0.5"
                                strokeDasharray="2 2"
                                className="opacity-20"
                            />

                            {/* Precise Labeling on Hover/Select */}
                            {(isHovered || isSelected) && (
                                <foreignObject x={x + 10} y={y - 12} width="120" height="20">
                                    <div className="text-[8px] font-mono text-slate-400 whitespace-nowrap bg-black/80 px-1 border-l border-white/20">
                                        {ex.name}
                                    </div>
                                </foreignObject>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Map Decoration: HUD elements */}
            <div className="absolute bottom-4 left-4 flex gap-4 pointer-events-none opacity-40">
                <div className="text-[10px] font-mono text-slate-500">
                    SCANNING: {exercises.length} ACTIVE_RECORDS
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">
                    MODE: {showHeatmap ? 'HEAT_INTENSITY' : 'SPATIAL_OBJECTS'}
                </div>
            </div>
        </div>
    );
};

export default ExerciseMap;
