import { describe, expect, it } from 'vitest';
import { blastRadiusKm, thermalRadiusKm } from './nuclearEffects';

describe('nuclear effects scaling', () => {
    it('matches the 15 kt reference values', () => {
        expect(blastRadiusKm(15)).toBeCloseTo(1.7);
        expect(thermalRadiusKm(15)).toBeCloseTo(1.9);
    });

    it('scales blast with the cube root of yield', () => {
        expect(blastRadiusKm(15 * 8) / blastRadiusKm(15)).toBeCloseTo(2);
    });

    it('keeps megaton-class radii in the published range', () => {
        expect(blastRadiusKm(3000)).toBeGreaterThan(9);
        expect(blastRadiusKm(3000)).toBeLessThan(11);
        expect(thermalRadiusKm(3000)).toBeGreaterThan(15);
        expect(thermalRadiusKm(3000)).toBeLessThan(20);
    });
});
