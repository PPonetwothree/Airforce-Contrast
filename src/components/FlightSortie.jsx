import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';
import { aircraftPerformance } from '../data/aircraftPerformance';

const FlightSortie = ({ mission, onComplete }) => {
    const assetRef = useRef();
    const trailRef = useRef();
    const [currentWaypoint, setCurrentWaypoint] = useState(0);
    const [progress, setProgress] = useState(0);
    const [detectionLevel, setDetectionLevel] = useState(0);
    const [isDetected, setIsDetected] = useState(false);

    // Performance stats for scoring
    const sortieStats = useRef({
        time: 0,
        fuelConsumption: 0,
        detectionSpikes: 0,
        objectiveReached: false
    });

    const performance = aircraftPerformance[mission.assets[0]] || aircraftPerformance["Rafale"];

    useFrame((state, delta) => {
        if (!mission) return;

        // Simulate time and flight
        sortieStats.current.time += delta;
        setProgress(prev => Math.min(prev + delta * 0.05, 1));

        // Simple Waypoint Interp (Analytical Visualization)
        const waypoints = mission.waypoints;
        const wpCount = waypoints.length;
        const totalProgress = progress * (wpCount - 1);
        const index = Math.floor(totalProgress);
        const subProgress = totalProgress % 1;

        if (index < wpCount - 1) {
            const p1 = new THREE.Vector3(...waypoints[index].pos);
            const p2 = new THREE.Vector3(...waypoints[index + 1].pos);
            assetRef.current.position.lerpVectors(p1, p2, subProgress);

            // Look at next point
            assetRef.current.lookAt(p2);

            if (index > currentWaypoint) setCurrentWaypoint(index);
        } else {
            // Sortie complete
            if (!sortieStats.current.objectiveReached) {
                sortieStats.current.objectiveReached = true;
                onComplete({
                    success: true,
                    time: sortieStats.current.time,
                    efficiency: 0.85,
                    visibility: sortieStats.current.detectionSpikes / 10
                });
            }
        }

        // Proximity Detection for Radar Cones
        mission.threats.forEach(threat => {
            const threatPos = new THREE.Vector3(threat.lat - 25, 0, threat.lng - 70); // Rough mapping for 3D space
            const dist = assetRef.current.position.distanceTo(threatPos);
            if (dist < threat.range / 10) { // Scaled distance
                setDetectionLevel(prev => Math.min(prev + delta * 0.5, 1));
                if (detectionLevel > 0.8) {
                    setIsDetected(true);
                    sortieStats.current.detectionSpikes += 1;
                }
            } else {
                setDetectionLevel(prev => Math.max(prev - delta * 0.2, 0));
                if (detectionLevel < 0.2) setIsDetected(false);
            }
        });

        // Handle "jitter" for realistic feel
        assetRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2) * 0.005;
    });

    return (
        <group>
            {/* 3D Grid Floor (Tactical Grid) */}
            <gridHelper args={[200, 20, 0x1e293b, 0x0f172a]} position={[0, -0.1, 0]} />

            {/* Waypoint Markers */}
            {mission.waypoints.map((wp, i) => (
                <group key={i} position={wp.pos}>
                    <Sphere args={[0.2, 16, 16]}>
                        <meshBasicMaterial color={i <= currentWaypoint ? "#3b82f6" : "#64748b"} transparent opacity={0.5} />
                    </Sphere>
                    <Line
                        points={[[0, 0, 0], [0, 5, 0]]}
                        color="#334155"
                        lineWidth={1}
                        dashed
                    />
                </group>
            ))}

            {/* Threat Zones */}
            {mission.threats.map((threat, i) => (
                <group key={i} position={[threat.lat - 25, 0, threat.lng - 70]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[threat.range / 10, 64]} />
                        <meshBasicMaterial color="#ef4444" transparent opacity={0.05} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[threat.range / 10 - 0.5, threat.range / 10, 64]} />
                        <meshBasicMaterial color="#ef4444" transparent opacity={0.2} side={THREE.DoubleSide} />
                    </mesh>
                </group>
            ))}

            {/* The Aircraft Asset (Stylized low-poly primitive) */}
            <group ref={assetRef}>
                <Trail
                    width={2}
                    length={10}
                    color={new THREE.Color(isDetected ? "#ef4444" : "#3b82f6")}
                    attenuation={(t) => t * t}
                >
                    <mesh castShadow>
                        <coneGeometry args={[0.8, 2.5, 4]} />
                        <meshStandardMaterial
                            color={isDetected ? "#ef4444" : "#cbd5e1"}
                            emissive={isDetected ? "#ef4444" : "#0f172a"}
                            emissiveIntensity={0.5}
                        />
                    </mesh>
                </Trail>

                {/* Wings / Structure Placeholder */}
                <mesh position={[0, -0.2, 0.5]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[4, 0.1, 1]} />
                    <meshStandardMaterial color="#64748b" />
                </mesh>

                {/* Sensor Cone Visualization */}
                <mesh position={[0, 0, -10]} rotation={[Math.PI / 2, 0, 0]}>
                    <coneGeometry args={[5, 20, 32]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} />
                </mesh>
            </group>
        </group>
    );
};

export default FlightSortie;
