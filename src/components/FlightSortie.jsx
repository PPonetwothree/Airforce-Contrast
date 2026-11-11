import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { aircraftPerformance } from '../data/aircraftPerformance';
import {
    SORTIE_DURATION_S,
    effectiveThreatRadius,
    evaluateSortie,
    positionAt,
    threatsInRange,
} from '../sim/sortieModel';

const FlightSortie = ({ mission, onComplete }) => {
    const assetRef = useRef();
    const [currentWaypoint, setCurrentWaypoint] = useState(0);
    const [isDetected, setIsDetected] = useState(false);

    // Mutable per-frame state lives in a ref so the scene is not re-rendered every frame.
    const sortie = useRef({ time: 0, exposure: 0, waypoint: 0, detected: false, done: false });

    const performance = aircraftPerformance[mission.assets[0]] || aircraftPerformance["Rafale"];
    const rcs = performance.rcs;

    useFrame((state, delta) => {
        const s = sortie.current;
        if (s.done || !assetRef.current) return;

        s.time += delta;
        const progress = Math.min(s.time / SORTIE_DURATION_S, 1);
        const { index, pos, next } = positionAt(mission.waypoints, progress);

        assetRef.current.position.set(...pos);
        assetRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
        assetRef.current.lookAt(...next);

        if (index !== s.waypoint) {
            s.waypoint = index;
            setCurrentWaypoint(index);
        }

        // Radar exposure: seconds spent inside any threat envelope (scaled by aircraft RCS).
        const detected = threatsInRange(mission.threats, pos, rcs).length > 0;
        if (detected) s.exposure += delta;
        if (detected !== s.detected) {
            s.detected = detected;
            setIsDetected(detected);
        }

        if (progress >= 1) {
            s.done = true;
            setCurrentWaypoint(mission.waypoints.length - 1);
            onComplete(evaluateSortie({
                time: s.time,
                exposure: s.exposure,
                maxExposure: mission.constraints.maxExposure,
            }));
        }
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
                <group key={i} position={[threat.scenePos[0], 0, threat.scenePos[1]]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[effectiveThreatRadius(threat, rcs), 64]} />
                        <meshBasicMaterial color="#ef4444" transparent opacity={0.05} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[effectiveThreatRadius(threat, rcs) - 0.5, effectiveThreatRadius(threat, rcs), 64]} />
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
