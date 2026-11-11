# Airforce Contrast: IAF vs PLAAF

An interactive, open-source comparison of the Indian Air Force (IAF) and the People's Liberation Army Air Force (PLAAF): force structure, basing and geography, exercises, training pipelines, and a set of illustrative simulations.

**Unclassified.** Everything here is compiled from public sources (IISS *Military Balance*, SIPRI Yearbook, US DoD *China Military Power Report*, official releases). Figures for the PLAAF in particular are estimates; treat every number as indicative.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
npm run lint      # ESLint
npm test          # unit tests (Vitest)
```

## Layout

| Path | Contents |
| --- | --- |
| `src/App.jsx` | Page composition (single scrolling page) |
| `src/components/` | UI sections and visualisations |
| `src/data/` | Static datasets (inventory, ORBAT, exercises, training, missions) |
| `src/sim/` | Pure, unit-tested model code used by the simulations |
| `public/assets/` | Map and target imagery (self-hosted, no external requests) |

## Models and their limits

- **Flight mission simulator** (`src/sim/sortieModel.js`): an aircraft flies a fixed waypoint route. Each threat has a nominal detection range against a 1 m² target, scaled by the aircraft's radar cross-section to the ¼ power (radar range equation). Time spent inside any envelope counts as exposure; a sortie fails if exposure exceeds the mission's limit. RCS values are rough public estimates.
- **Deterrence panel** (`src/sim/nuclearEffects.js`): 5 psi blast and third-degree-burn radii for an optimum-height airburst, scaled from Glasstone & Dolan 15 kt reference values (cube-root scaling for blast, about yield^0.41 for thermal effects). It does not estimate casualties or kill probability against hardened targets.
- **Combat power index, wargame, aircraft comparator**: hand-entered analyst estimates and scripted scenarios for discussion. They are not outputs of a campaign model.

## Data currency

Datasets reflect public reporting up to 2025. Notable updates: the IAF's MiG-21 fleet retired in September 2025, bringing fighter strength to about 29 squadrons. Warhead figures are national stockpiles (SIPRI 2025), not air force holdings.
