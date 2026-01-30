import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Crosshair, ChevronRight, ShieldAlert } from 'lucide-react';

export const HeroSection = () => {
    const [text, setText] = useState('');
    const fullText = "INITIALIZING THEATRE COMMAND SIMULATION... LOADING TACTICAL DATA... COMPLETE.";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, index));
            index++;
            if (index > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[600px] w-full bg-slate-950 overflow-hidden flex items-center justify-center border-b border-slate-800">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>

            <div className="relative z-10 max-w-4xl px-6 text-center">

                {/* Top Secret Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-500/50 bg-red-900/20 text-red-400 text-xs font-mono font-bold tracking-widest mb-8"
                >
                    <ShieldAlert className="w-3 h-3" />
                    CLASSIFIED // EYES ONLY
                </motion.div>

                {/* Dynamic Typewriter Heading */}
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
                    Theatre Command <span className="text-emerald-500">Simulation</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-400 font-mono mb-8 h-8">
                    <span className="text-emerald-500 mr-2">{'>'}</span>{text}<span className="animate-pulse">_</span>
                </p>

                <p className="text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    A comparative wargame analysis of the Indian Air Force (IAF) versus the People's Liberation Army Air Force (PLAAF) along the Line of Actual Control. Analyze assets, simulate skirmishes, and evaluate strategic depth.
                </p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => document.getElementById('strategic-overview')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold px-8 py-4 rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    >
                        <Terminal className="w-5 h-5" />
                        BEGIN BRIEFING
                    </button>
                    <button
                        onClick={() => document.getElementById('inventory-grid')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-transparent border border-slate-700 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 px-8 py-4 rounded-lg flex items-center gap-2 transition-all font-mono uppercase tracking-wider"
                    >
                        <Crosshair className="w-5 h-5" />
                        View Intel
                    </button>
                </div>
            </div>

            {/* Decorative HUD Elements */}
            <div className="absolute top-10 left-10 text-[10px] font-mono text-emerald-900/40">
                <div>SYS.V.2.0.4</div>
                <div>UPLINK: SECURE</div>
            </div>
            <div className="absolute bottom-10 right-10 text-[10px] font-mono text-emerald-900/40 text-right">
                <div>LAT: 34.0N</div>
                <div>LNG: 77.5E</div>
            </div>
        </div>
    );
};
