import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const StatCard = ({ title, value, subtext, type = 'neutral', delay = 0 }) => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const bgColors = {
        iaf: 'bg-orange-50/50 border-orange-100',
        plaaf: 'bg-red-50/50 border-red-100',
        neutral: 'bg-white border-slate-100',
    };

    const textColors = {
        iaf: 'text-orange-600',
        plaaf: 'text-red-600',
        neutral: 'text-slate-900',
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            variants={variants}
            className={cn(
                "p-6 rounded-xl border shadow-sm backdrop-blur-sm transition-all hover:shadow-md",
                bgColors[type] || bgColors.neutral
            )}
        >
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">{title}</h3>
            <div className={cn("text-3xl font-bold font-mono", textColors[type] || textColors.neutral)}>
                {value.toLocaleString()}
            </div>
            {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
        </motion.div>
    );
};
