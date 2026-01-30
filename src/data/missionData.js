export const missionData = [
    {
        id: "mission-ts-24",
        name: "Tarang Shakti Offensive",
        context: "Operation Tarang Shakti 2024 (Phase II)",
        objective: "Establish air superiority over contested airspace and suppress adversary AEW&C coverage to allow strike package penetration.",
        location: "Jodhpur Sector, India",
        difficulty: "Advanced",
        assets: ["Rafale", "Su-30MKI", "A330 MRTT"],
        adversaries: ["J-10C", "KJ-500"],
        threats: [
            { type: "SAM", name: "HQ-9 Ring", lat: 25.5, lng: 71.0, range: 200 },
            { type: "AWACS", name: "KJ-500 Patrol", lat: 26.0, lng: 70.0, range: 450 }
        ],
        waypoints: [
            { id: 1, pos: [0, 5, -20], label: "Ingress Point", objective: "Low Altitude Penetration" },
            { id: 2, pos: [30, 8, -60], label: "Engagement Zone", objective: "Suppression of Adversary Air (SOAA)" },
            { id: 3, pos: [0, 2, -100], label: "Exfiltration", objective: "Evade Radar Detection" }
        ],
        constraints: {
            fuelLimit: 5000,
            maxDetectionTime: 45 // seconds
        }
    },
    {
        id: "mission-pb-22",
        name: "Pitch Black Intercept",
        context: "LFE (Large Force Employment) Exercise Darwin 2022",
        objective: "Protect high-value assets (C-17 & Tanker) from incoming BVR (Beyond Visual Range) threats during multinational deployment.",
        location: "Darwin, Australia",
        difficulty: "Expert",
        assets: ["Su-30MKI", "Il-78 MKI"],
        adversaries: ["Aggressor Wing"],
        threats: [
            { type: "FIGHTER", name: "BVR Intercept", range: 120 }
        ],
        waypoints: [
            { id: 1, pos: [0, 10, -10], label: "Escort Start" },
            { id: 2, pos: [20, 12, -80], label: "Threat Convergence" },
            { id: 3, pos: [-40, 5, -120], label: "Safe Haven" }
        ],
        constraints: {
            escortIntegrity: 0.9,
            weaponLimit: 4 // BVR missiles
        }
    },
    {
        id: "mission-jt-22",
        name: "Joint Sword Blockade",
        context: "PLA Theatre Command Sortie 2022",
        objective: "Simulation of maritime blockade and air dominance operations. Penetrate ADIZ and maintain station despite carrier-borne intercepts.",
        location: "Taiwan Strait / East China Sea",
        difficulty: "Specialist",
        assets: ["J-20", "H-6K"],
        adversaries: ["QRF Wing"],
        threats: [
            { type: "SAM", name: "Coastal Defense", range: 150 }
        ],
        waypoints: [
            { id: 1, pos: [0, 8, -30], label: "ADIZ Entry" },
            { id: 2, pos: [50, 10, -70], label: "Blockade Station" },
            { id: 3, pos: [100, 2, -50], label: "RTB" }
        ],
        constraints: {
            stealthViolation: 0.2, // detection probability
            timeOnStation: 600 // seconds
        }
    }
];
