import { describe, expect, it } from 'vitest';
import { missionData } from '../data/missionData';
import { aircraftPerformance } from '../data/aircraftPerformance';
import { evaluateSortie, positionAt, rcsRangeFactor, simulateSortie } from './sortieModel';

const byId = (id) => missionData.find(m => m.id === id);
const rcsOf = (mission) => aircraftPerformance[mission.assets[0]].rcs;

describe('sortie model', () => {
    it('every mission threat has a scene position and every lead asset has performance data', () => {
        for (const mission of missionData) {
            expect(aircraftPerformance[mission.assets[0]]).toBeDefined();
            for (const threat of mission.threats) {
                expect(threat.scenePos).toHaveLength(2);
                expect(Number.isFinite(threat.range)).toBe(true);
            }
        }
    });

    it('scales detection range with the fourth root of RCS', () => {
        expect(rcsRangeFactor(1)).toBe(1);
        expect(rcsRangeFactor(16)).toBeCloseTo(2);
        expect(rcsRangeFactor(0.0625)).toBeCloseTo(0.5);
    });

    it('interpolates along the waypoint route', () => {
        const wps = [{ pos: [0, 0, 0] }, { pos: [10, 0, 0] }, { pos: [10, 0, 10] }];
        expect(positionAt(wps, 0).pos).toEqual([0, 0, 0]);
        expect(positionAt(wps, 0.25).pos).toEqual([5, 0, 0]);
        expect(positionAt(wps, 1).pos).toEqual([10, 0, 10]);
    });

    it('fails a sortie only when exposure exceeds the limit', () => {
        expect(evaluateSortie({ time: 20, exposure: 2, maxExposure: 3 }).success).toBe(true);
        expect(evaluateSortie({ time: 20, exposure: 4, maxExposure: 3 }).success).toBe(false);
    });

    it('produces outcomes that depend on the aircraft, not a hard-coded success', () => {
        const ts = byId('mission-ts-24');
        const pb = byId('mission-pb-22');
        const jt = byId('mission-jt-22');

        expect(simulateSortie(ts, rcsOf(ts)).success).toBe(true);   // Rafale threads the gap
        expect(simulateSortie(pb, rcsOf(pb)).success).toBe(false);  // Su-30MKI's large RCS is detected
        expect(simulateSortie(jt, rcsOf(jt)).success).toBe(true);   // J-20 stays below the limit

        // Same route flown by a high-RCS aircraft is detected for longer.
        const stealthy = simulateSortie(ts, 0.1).exposure;
        const large = simulateSortie(ts, 4).exposure;
        expect(large).toBeGreaterThan(stealthy);
    });
});
