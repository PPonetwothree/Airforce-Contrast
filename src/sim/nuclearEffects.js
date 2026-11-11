// Approximate nuclear weapon effect radii for an optimum-height airburst.
// Reference values (15 kt, Hiroshima-class) follow Glasstone & Dolan, "The Effects of Nuclear
// Weapons" (1977), as reproduced in public tools such as NUKEMAP:
//   - 5 psi overpressure (most residential buildings collapse): ~1.7 km
//   - 3rd-degree burns (clear day): ~1.9 km
// Blast radii scale with the cube root of yield; thermal radii scale at roughly yield^0.41.
// These are educational approximations, not targeting data.

const REF_KT = 15;
const REF_BLAST_KM = 1.7;
const REF_THERMAL_KM = 1.9;
const THERMAL_EXPONENT = 0.41;

export const blastRadiusKm = (kt) => REF_BLAST_KM * Math.cbrt(kt / REF_KT);

export const thermalRadiusKm = (kt) => REF_THERMAL_KM * Math.pow(kt / REF_KT, THERMAL_EXPONENT);

export const roundKm = (km) => Math.round(km * 10) / 10;
