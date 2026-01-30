import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Sky } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { missionData } from '../data/missionData';
import BriefingRoom from './BriefingRoom';
import FlightSortie from './FlightSortie';
import TacticalHUD from './TacticalHUD';
import MissionScoreboard from './MissionScoreboard';

const MissionSimulator = () => {
    const [currentMission, setCurrentMission] = useState(null);
    const [missionState, setMissionState] = useState('BRIEFING'); // BRIEFING, SIMULATING, DEBRIEF
    const [performance, setPerformance] = useState(null);

    const startMission = (mission) => {
        setCurrentMission(mission);
        setMissionState('SIMULATING');
    };

    const endMission = (scoreData) => {
        setPerformance(scoreData);
        setMissionState('DEBRIEF');
    };

    return (
        <section id="mission-simulator" className="py-24 bg-[#020202] border-t border-slate-900 overflow-hidden relative min-h-[900px]">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.15),transparent)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 h-full flex flex-col">
                <div className="mb-12">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-8 bg-red-600/50" />
                        <span className="text-xs font-mono tracking-widest text-red-500 uppercase">Classified Training Environment</span>
                    </div>
                    <h2 className="text-4xl font-light tracking-tight text-white mt-2">
                        Flight <span className="font-bold text-slate-400">Mission Simulator</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl text-sm leading-relaxed mt-2 font-mono">
                        V 4.8.0 // DOCTRINAL SORTIE REPLAY // CROSS-THEATRE INTEROPERABILITY ANALYSIS
                    </p>
                </div>

                <div className="flex-1 relative bg-[#050505] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {missionState === 'BRIEFING' && (
                            <motion.div
                                key="briefing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-10"
                            >
                                <BriefingRoom onSelectMission={startMission} />
                            </motion.div>
                        )}

                        {missionState === 'SIMULATING' && (
                            <motion.div
                                key="sim"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 h-full w-full"
                            >
                                <Canvas shadows gl={{ antialias: true }}>
                                    <PerspectiveCamera makeDefault position={[0, 10, 40]} fov={50} />
                                    <OrbitControls enableDamping dampingFactor={0.05} maxDistance={200} minDistance={10} />

                                    <Suspense fallback={null}>
                                        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimutal={0.25} />
                                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                                        <ambientLight intensity={0.2} />
                                        <pointLight position={[100, 100, 100]} intensity={0.5} />

                                        {/* The 3D Mission Core */}
                                        <FlightSortie
                                            mission={currentMission}
                                            onComplete={endMission}
                                        />
                                    </Suspense>
                                </Canvas>

                                {/* 2D HUD Layout */}
                                <TacticalHUD
                                    mission={currentMission}
                                    onAbort={() => setMissionState('BRIEFING')}
                                />
                            </motion.div>
                        )}

                        {missionState === 'DEBRIEF' && (
                            <motion.div
                                key="debrief"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 z-20 flex items-center justify-center p-8"
                            >
                                <MissionScoreboard
                                    performance={performance}
                                    mission={currentMission}
                                    onRestart={() => setMissionState('SIMULATING')}
                                    onExit={() => setMissionState('BRIEFING')}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default MissionSimulator;
