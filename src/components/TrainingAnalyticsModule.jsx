import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trainingData } from '../data/trainingData';
import TrainingPipelineSankey from './TrainingPipelineSankey';
import TrainingTimeline from './TrainingTimeline';
import MetricRadarChart from './MetricRadarChart';
import { GraduationCap, TrendingDown, Clock, BarChart3, Info } from 'lucide-react';

const TrainingAnalyticsModule = () => {
    const [activeTab, setActiveTab] = useState('iaf'); // 'iaf', 'plaaf', 'comparison'

    const currentData = trainingData[activeTab === 'comparison' ? 'iaf' : activeTab];

    return (
        <section id="training-analytics" className="py-24 bg-[#050505] border-t border-slate-900 pb-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 bg-blue-500" />
                            <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">Training Workforce Intelligence</span>
                        </div>
                        <h2 className="text-4xl font-light tracking-tight text-white">
                            The <span className="font-bold text-slate-400">Pilot Pipeline</span>
                        </h2>
                        <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
                            Comparative analysis of human capital development, attrition dynamics, and doctrinal training duration across the IAF and PLAAF.
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-slate-900/50 rounded-lg border border-slate-800">
                        {['iaf', 'plaaf', 'comparison'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-md text-xs font-bold uppercase transition-all ${activeTab === tab
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {tab === 'comparison' ? 'Direct Comparison' : tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* 1. Attrition Flow (Sankey) */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-black/40 border border-slate-800 rounded-xl p-8 relative overflow-hidden h-[500px]">
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-3">
                                    <TrendingDown className="text-blue-500" size={18} />
                                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Training Attrition Funnel</h3>
                                </div>
                                {activeTab !== 'comparison' && (
                                    <div className="text-[10px] font-mono text-slate-500 uppercase">
                                        EST. ATTRITION: <span className="text-red-500 font-bold">{currentData.attrition.total}</span>
                                    </div>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="h-[350px]"
                                >
                                    <TrainingPipelineSankey
                                        data={activeTab === 'comparison' ? [trainingData.iaf.attrition, trainingData.plaaf.attrition] : [currentData.attrition]}
                                        mode={activeTab === 'comparison' ? 'dual' : 'single'}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* 2. Timeline Progression */}
                        <div className="bg-black/40 border border-slate-800 rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <Clock className="text-blue-500" size={18} />
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Development Timeline</h3>
                            </div>
                            <TrainingTimeline
                                data={activeTab === 'comparison' ? [trainingData.iaf, trainingData.plaaf] : [currentData]}
                            />
                        </div>
                    </div>

                    {/* 3. Lateral Metrics (Radar/Dossier) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-black/40 border border-slate-800 rounded-xl p-8 h-[400px]">
                            <div className="flex items-center gap-3 mb-6">
                                <BarChart3 className="text-blue-500" size={18} />
                                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Techno-Doctrinal Metrics</h3>
                            </div>
                            <MetricRadarChart
                                iaf={trainingData.iaf.metrics}
                                plaaf={trainingData.plaaf.metrics}
                                focus={activeTab}
                            />
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Info className="text-slate-500" size={14} />
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expert Commentary</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed italic font-serif">
                                {trainingData.comparisonSummary}
                            </p>
                            <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[9px] font-mono">
                                <span className="text-slate-600 uppercase">Confidence Level</span>
                                <span className="text-yellow-600 font-bold">MODERATE_OSINT</span>
                            </div>
                        </div>

                        {/* Highlight Metric */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-blue-900/10 border border-blue-900/30 rounded-xl text-center">
                                <div className="text-[9px] text-blue-500 uppercase font-mono mb-1">Annual Output (Est)</div>
                                <div className="text-2xl font-black text-white">
                                    {activeTab === 'plaaf' ? '750+' : activeTab === 'iaf' ? '180+' : '930'}
                                </div>
                            </div>
                            <div className="p-6 bg-red-900/10 border border-red-900/30 rounded-xl text-center">
                                <div className="text-[9px] text-red-500 uppercase font-mono mb-1">Dropout Phase</div>
                                <div className="text-sm font-bold text-white uppercase">
                                    {activeTab === 'plaaf' ? 'Primary' : 'Stage III'}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TrainingAnalyticsModule;
