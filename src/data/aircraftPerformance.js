export const aircraftPerformance = {
    "Rafale": {
        type: "Multirole",
        role: "Air Superiority / Strike",
        maxSpeed: 1.8, // Mach
        climbRate: 300, // m/s
        turnRate: 28, // deg/s
        radarRange: 160, // km
        rcs: 0.1, // m^2 (Stealth adjusted)
        sensors: ["AESA Radar", "IR Search & Track (IRST)", "Spectral EW Suite"],
        weapons: ["Meteor (BVR)", "MICA", "Scalp"]
    },
    "Su-30MKI": {
        type: "Air Dominance",
        role: "Superiority",
        maxSpeed: 2.0,
        climbRate: 230,
        turnRate: 25,
        radarRange: 180,
        rcs: 4.0, // High RCS due to size/engine
        sensors: ["Bars PESA Radar", "IRST", "EW Jammer"],
        weapons: ["Astra (BVR)", "R-77", "BrahMos (Air)"]
    },
    "J-20": {
        type: "5th Gen Stealth",
        role: "Air Superiority",
        maxSpeed: 2.2,
        climbRate: 305,
        turnRate: 26,
        radarRange: 200,
        rcs: 0.05, // High stealth
        sensors: ["Type 1475 AESA", "EOTS", "DAS"],
        weapons: ["PL-15 (BVR)", "PL-10"]
    },
    "J-10C": {
        type: "Vigorous Dragon",
        role: "Multirole",
        maxSpeed: 1.8,
        climbRate: 280,
        turnRate: 30,
        radarRange: 140,
        rcs: 1.0,
        sensors: ["AESA Radar", "Advanced EW"],
        weapons: ["PL-15", "PL-10"]
    },
    "KJ-500": {
        type: "AEW&C",
        role: "Surveillance",
        maxSpeed: 0.8,
        climbRate: 50,
        turnRate: 5,
        radarRange: 470,
        rcs: 20.0,
        sensors: ["Phased Array Radar", "SIGINT"],
        weapons: ["None"]
    }
};
