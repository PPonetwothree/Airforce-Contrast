import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Activity, Navigation, Wind, Crosshair } from 'lucide-react';

const TacticalHUD = ({ mission, onAbort }) => {
    const [telemetry, setTelemetry] = useState({
        alt: 25000,
        speed: 0.85,
        heading: 270,
        fuel: 4850
    });

    // Mock telemetry animation
    useEffect(() => {
        const timer = setInterval(() => {
            setTelemetry(prev => ({
                alt: prev.alt + (Math.random() - 0.5) * 50,
                speed: prev.speed + (Math.random() - 0.5) * 0.01,
                heading: (prev.heading + (Math.random() - 0.5) * 2) % 360,
                fuel: prev.fuel - 1
            }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 font-mono">
            {/* Top Bar: Mission Info */}
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                        <span className="text-[10px] text-white font-bold uppercase tracking-widest">LIVE_TELEMETRY // {mission.name}</span>
                    </div>
                    <div className="text-[9px] text-slate-500 uppercase">{mission.context}</div>
                </div>

                <button
                    onClick={onAbort}
                    className="pointer-events-auto px-4 py-1.5 bg-red-600/10 border border-red-600/50 text-red-500 text-[10px] font-bold uppercase hover:bg-red-600 hover:text-white transition-all rounded"
                >
                    Abort Sortie
                </button>
            </div>

            {/* Center: Aiming Reticle (Fixed) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 opacity-40">
                <div className="w-48 h-48 border border-blue-500/30 rounded-full relative">
                    <div className="absolute top-1/2 left-0 w-8 h-px bg-blue-500" />
                    <div className="absolute top-1/2 right-0 w-8 h-px bg-blue-500" />
                    <div className="absolute top-0 left-1/2 w-px h-8 bg-blue-500" />
                    <div className="absolute bottom-0 left-1/2 w-px h-8 bg-blue-500" />
                </div>
                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">AQUISITION_ACTIVE</div>
            </div>

            {/* Side HUD Elements */}
            <div className="flex justify-between items-end">
                {/* Left: Flight Data */}
                <div className="space-y-6 w-48">
                    <div className="p-4 bg-black/40 border-l-2 border-blue-500 backdrop-blur-sm space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 uppercase">Alt</span>
                            <span className="text-sm text-blue-400 font-bold">{Math.round(telemetry.alt).toLocaleString()} FT</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 uppercase">Speed</span>
                            <span className="text-sm text-blue-400 font-bold">M {telemetry.speed.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 uppercase">Heading</span>
                            <span className="text-sm text-white font-bold">{Math.round(telemetry.heading)}°</span>
                        </div>
                    </div>

                    <div className="p-4 bg-black/40 border-l-2 border-slate-700 backdrop-blur-sm flex items-center gap-3">
                        <Activity className="text-slate-500" size={16} />
                        <div className="space-y-1">
                            <div className="text-[8px] text-slate-500 uppercase">G-Force</div>
                            <div className="text-xs text-white">1.2 G</div>
                        </div>
                    </div>
                </div>

                {/* Right: Combat Status */}
                <div className="space-y-6 w-48 text-right">
                    <div className="p-4 bg-black/40 border-r-2 border-red-500 backdrop-blur-sm space-y-3">
                        <div className="text-[10px] text-red-500 font-bold uppercase mb-2">Threat Intel (RWR)</div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500">Track</span>
                                <span className="text-red-400">NOMINAL</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-slate-500">Search</span>
                                <span className="text-slate-300">HQ-9_S300</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-black/40 border-r-2 border-slate-700 backdrop-blur-sm flex items-center justify-end gap-3">
                        <div className="space-y-1">
                            <div className="text-[8px] text-slate-500 uppercase">Fuel Status</div>
                            <div className="text-xs text-white uppercase">{telemetry.fuel} LBS</div>
                        </div>
                        <Wind className="text-slate-500" size={16} />
                    </div>
                </div>
            </div>

            {/* Decorative Border Corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-800" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-slate-800" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-slate-800" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-800" />
        </div>
    );
};

export default TacticalHUD;
