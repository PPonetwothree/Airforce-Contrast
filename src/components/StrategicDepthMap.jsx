import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, ArrowUp, ArrowDown, Target, Building2 } from 'lucide-react';

export const MapContainer = ({ children, height = "h-96" }) => (
    <div className={`relative w-full ${height} bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-inner group`}>
        <div className="absolute inset-0 bg-[url('/assets/topo_himalayas.png')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        {children}

        {/* Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none border-2 border-slate-800/50 rounded-2xl"></div>
    </div>
);

export const StrategicDepthMap = ({ data }) => {
    return (
        <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden text-white shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Strategic Depth & Geography</h2>
                <p className="text-slate-400 mb-8 max-w-2xl">Visualizing the critical impact of terrain on air operations. The Himalayan barrier creates distinct operational environments for the IAF and PLAAF.</p>

                {/* Cross Section Visualization */}
                <MapContainer height="h-[500px]" className="mb-12 border-2 border-slate-700/50 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {/* Sky */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>

                    {/* Terrain Profile (Stylized) */}
                    <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Indian Plains (Left) to Himalayas (Center) to Tibetan Plateau (Right) */}
                        <path d="M0,90 L30,90 L45,40 L55,30 L65,35 L100,25 L100,100 L0,100 Z" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                        <path d="M0,92 L30,92 L45,42 L55,32 L65,37 L100,27 L100,100 L0,100 Z" fill="#0f172a" opacity="0.5" />
                    </svg>

                    {/* Indian Side (Left) */}
                    <div className="absolute left-10 bottom-10 z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-orange-500/20 p-2 rounded-lg border border-orange-500/50 mb-2">
                                <ArrowUp className="w-6 h-6 text-orange-500" />
                            </div>
                            <span className="text-sm font-bold text-orange-400">Low Altitude</span>
                            <span className="text-xs text-slate-400">Full Payload</span>
                            <span className="text-xs text-slate-500 mt-1">Indo-Gangetic Plain</span>
                        </motion.div>
                    </div>

                    {/* Border / Himalayas (Center) */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-32 z-20 text-center">
                        <Mountain className="w-12 h-12 text-slate-600 mx-auto mb-2 opacity-50" />
                        <div className="px-2 py-1 bg-white/10 backdrop-blur rounded text-[10px] font-bold tracking-widest uppercase border border-white/10">Himalayas</div>
                    </div>

                    {/* Chinese Side (Right) */}
                    <div className="absolute right-10 top-20 z-20">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center"
                        >
                            <div className="bg-red-500/20 p-2 rounded-lg border border-red-500/50 mb-2">
                                <ArrowDown className="w-6 h-6 text-red-500" />
                            </div>
                            <span className="text-sm font-bold text-red-400">High Altitude</span>
                            <span className="text-xs text-slate-400">Reduced Payload</span>
                            <span className="text-xs text-slate-500 mt-1">Tibetan Plateau</span>
                        </motion.div>
                    </div>

                    {/* Animations: Pulsing Bases */}
                    <motion.div
                        className="absolute left-[20%] bottom-[12%] w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_15px_#f97316]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute left-[20%] bottom-[8%] text-[10px] text-orange-500 font-mono">IAF Bases</div>

                    <motion.div
                        className="absolute right-[15%] top-[30%] w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#dc2626]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    <div className="absolute right-[15%] top-[34%] text-[10px] text-red-500 font-mono">PLAAF Bases</div>

                </MapContainer>

                {/* Comparative Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-5 h-5 text-orange-500" />
                            <h3 className="font-bold text-lg text-slate-200">India (IAF)</h3>
                        </div>
                        <div className="space-y-3 text-sm text-slate-400">
                            <p><span className="text-slate-200 font-medium">Core Vulnerability:</span> Close proximity of airbases and industrial hubs to the border.</p>
                            <p><span className="text-slate-200 font-medium">Operational Edge:</span> Low altitude bases allow for maximum take-off weight and weapon load.</p>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-3 mb-4">
                            <Building2 className="w-5 h-5 text-red-500" />
                            <h3 className="font-bold text-lg text-slate-200">China (PLAAF)</h3>
                        </div>
                        <div className="space-y-3 text-sm text-slate-400">
                            <p><span className="text-slate-200 font-medium">Core Advantage:</span> Immense strategic depth; industrial heartland is 2000km+ away.</p>
                            <p><span className="text-slate-200 font-medium">Operational Challenge:</span> High altitude reduces engine performance, range, and payload capacity.</p>
                        </div>
                    </div>
                </div>

                {/* Integrated Facts Carousel */}
                <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                    <div className="p-1 bg-blue-500/20 rounded">
                        <Target className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-sm text-blue-200">
                        <span className="font-bold text-blue-100 block mb-1">Key Analysis</span>
                        While China enjoys vast <span className="text-white font-bold">strategic depth</span> protecting its core, its forward airpower faces <span className="text-white font-bold">physics-based limitations</span>. India faces the inverse: superior individual aircraft performance per sortie, but a <span className="text-white font-bold">vulnerable rapid-response</span> geography.
                    </div>
                </div>
            </div>
        </div >
    );
};
