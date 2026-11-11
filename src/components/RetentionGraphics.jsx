import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Globe, ShieldAlert } from 'lucide-react';

export const RetentionGraphics = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Intro Loading Sequence */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLoading(false)}
                        className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono"
                    >
                        <div className="w-64 h-2 bg-slate-800 rounded-full mb-4 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="h-full bg-emerald-500"
                            />
                        </div>
                        <div className="text-emerald-500 text-xs tracking-[0.3em] animate-pulse">
                            LOADING OPEN-SOURCE DATA...
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4 opacity-50">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" style={{ animationDelay: `${i * 0.2}s` }}></div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tactical Overlay (Always Visible) */}
            <div className="fixed inset-0 pointer-events-none z-40 mix-blend-overlay opacity-30">
                <div className="absolute top-8 left-8 border-t-2 border-l-2 border-white/20 w-8 h-8"></div>
                <div className="absolute top-8 right-8 border-t-2 border-r-2 border-white/20 w-8 h-8"></div>
                <div className="absolute bottom-8 left-8 border-b-2 border-l-2 border-white/20 w-8 h-8"></div>
                <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-white/20 w-8 h-8"></div>

                <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-2">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-white/20 rounded-full"></div>
                    ))}
                </div>
            </div>
        </>
    );
};
