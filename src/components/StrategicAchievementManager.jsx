import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, BookOpen, Globe } from 'lucide-react';

const achievements = [
    {
        id: 'historian-21',
        title: 'Air Power Historian 2021',
        description: 'Explored all major IAF and PLAAF exercises conducted in 2021.',
        icon: <BookOpen className="text-amber-400" size={16} />,
        requirement: (exercises) => {
            const yr2021 = exercises.filter(ex => ex.dateRange.start.startsWith('2021'));
            return yr2021.length >= 2; // In our sample, it's DK-21 and DW-21/SN-20
        }
    },
    {
        id: 'indo-pacific',
        title: 'Indo-Pacific Observer',
        description: 'Analyzed maritime-adjacent exercises in the Taiwan Strait and Bering Sea.',
        icon: <Globe className="text-blue-400" size={16} />,
        requirement: (exercises) => {
            const regional = exercises.filter(ex => ex.id.includes('tw-22') || ex.id.includes('bp-24'));
            return regional.length >= 2;
        }
    },
    {
        id: 'force-integrator',
        title: 'Multinational Force Integrator',
        description: 'Examined high-intensity multinational drills (Pitch Black, Tarang Shakti).',
        icon: <Star className="text-purple-400" size={16} />,
        requirement: (exercises) => {
            const multinational = exercises.filter(ex => ex.scale === 'Multinational');
            return multinational.length >= 3;
        }
    }
];

const StrategicAchievementManager = ({ exercises, unlocked, setUnlocked }) => {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        achievements.forEach(ach => {
            if (!unlocked.includes(ach.id) && ach.requirement(exercises)) {
                setUnlocked([...unlocked, ach.id]);
                setToast(ach);
                setTimeout(() => setToast(null), 5000);
            }
        });
    }, [exercises, unlocked, setUnlocked]);

    return (
        <div className="relative">
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        className="w-72 bg-slate-900/90 backdrop-blur-md border border-amber-500/30 p-4 rounded-lg shadow-2xl flex items-start gap-4"
                    >
                        <div className="p-2 bg-amber-500/10 rounded-full">
                            <Trophy className="text-amber-500" size={20} />
                        </div>
                        <div className="space-y-1">
                            <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Analytical Breakthrough</div>
                            <h4 className="text-sm font-bold text-white leading-tight">{toast.title}</h4>
                            <p className="text-[10px] text-slate-400 leading-snug">{toast.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mini-badge list indicator */}
            <div className="flex gap-2 mt-4 justify-end">
                {achievements.map(ach => (
                    <div
                        key={ach.id}
                        className={`w-8 h-8 rounded border flex items-center justify-center transition-all ${unlocked.includes(ach.id) ? 'bg-amber-500/10 border-amber-500/30 grayscale-0' : 'bg-slate-900/50 border-slate-800 grayscale opacity-20'
                            }`}
                        title={unlocked.includes(ach.id) ? ach.title : 'Research Locked'}
                    >
                        {ach.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StrategicAchievementManager;
