// Pure helpers for the flight mission simulator, kept free of React/three.js so they can be unit tested.

export const SORTIE_DURATION_S = 20; // wall-clock seconds for a full replay
export const SCENE_KM_PER_UNIT = 10; // threat range (km) / 10 = scene radius

// Radar equation: detection range scales with the fourth root of radar cross-section.
// Ranges in mission data are quoted against a 1 m² reference target.
export const rcsRangeFactor = (rcs = 1) => Math.pow(Math.max(rcs, 1e-4), 0.25);

export const effectiveThreatRadius = (threat, rcs) =>
    (threat.range / SCENE_KM_PER_UNIT) * rcsRangeFactor(rcs);

// Position [x, y, z] along the waypoint polyline for progress in [0, 1].
export const positionAt = (waypoints, progress) => {
    const segments = waypoints.length - 1;
    const p = Math.min(Math.max(progress, 0), 1) * segments;
    const i = Math.min(Math.floor(p), segments - 1);
    const t = p - i;
    const a = waypoints[i].pos;
    const b = waypoints[i + 1].pos;
    return { index: i, pos: a.map((v, k) => v + (b[k] - v) * t), next: b };
};

// Names of threats whose (ground-plane) envelope currently contains the aircraft.
export const threatsInRange = (threats, pos, rcs) =>
    threats.filter(threat => {
        const [tx, tz] = threat.scenePos;
        return Math.hypot(pos[0] - tx, pos[2] - tz) < effectiveThreatRadius(threat, rcs);
    });

export const evaluateSortie = ({ time, exposure, maxExposure }) => {
    const exposureRatio = maxExposure > 0 ? exposure / maxExposure : 0;
    return {
        success: exposure <= maxExposure,
        time,
        exposure,
        maxExposure,
        visibility: exposureRatio,
        efficiency: Math.max(0, 1 - exposure / Math.max(time, 1e-6)),
    };
};

// Deterministic replay used by tests: integrates exposure over the whole sortie.
export const simulateSortie = (mission, rcs, dt = 1 / 60) => {
    let exposure = 0;
    let time = 0;
    while (time < SORTIE_DURATION_S) {
        const { pos } = positionAt(mission.waypoints, time / SORTIE_DURATION_S);
        if (threatsInRange(mission.threats, pos, rcs).length) exposure += dt;
        time += dt;
    }
    return evaluateSortie({ time, exposure, maxExposure: mission.constraints.maxExposure });
};
