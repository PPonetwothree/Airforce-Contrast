// Threat `scenePos` is [x, z] in 3D scene units; `range` is nominal detection range in km
// against a 1 m² target (scene radius = range / 10, scaled by the aircraft RCS^(1/4)).
export const missionData = [
    {
        id: "mission-ts-24",
        lesson: {
            title: "IAF Doctrine: Offensive Counter Air (OCA)",
            body: "Real-world exercises like Tarang Shakti emphasise integrating 4.5-gen fighters (Rafale) with heavy platforms (Su-30MKI). A low radar cross-section shrinks every adversary sensor envelope, which is why the Rafale can thread between the HQ-9 and KJ-500 coverage here."
        },
        name: "Tarang Shakti Offensive",
        context: "Operation Tarang Shakti 2024 (Phase II)",
        objective: "Establish air superiority over contested airspace and suppress adversary AEW&C coverage to allow strike package penetration.",
        location: "Jodhpur Sector, India",
        difficulty: "Advanced",
        assets: ["Rafale", "Su-30MKI", "A330 MRTT"],
        adversaries: ["J-10C", "KJ-500"],
        threats: [
            { type: "SAM", name: "HQ-9 Ring", scenePos: [36, -68], range: 200 },
            { type: "AWACS", name: "KJ-500 Patrol", scenePos: [-30, -95], range: 450 }
        ],
        waypoints: [
            { id: 1, pos: [0, 5, -20], label: "Ingress Point", objective: "Low Altitude Penetration" },
            { id: 2, pos: [30, 8, -60], label: "Engagement Zone", objective: "Suppression of Adversary Air (SOAA)" },
            { id: 3, pos: [0, 2, -100], label: "Exfiltration", objective: "Evade Radar Detection" }
        ],
        constraints: {
            maxExposure: 3 // seconds of simulated radar exposure tolerated before the sortie is compromised
        }
    },
    {
        id: "mission-pb-22",
        lesson: {
            title: "Large Force Employment: Escort Under BVR Threat",
            body: "Escorting high-value assets ties fighters to a fixed route. The Su-30MKI's large radar cross-section (~4 m² assumed) extends adversary detection range to roughly 1.4x its 1 m² nominal, so routing alone cannot keep it undetected."
        },
        name: "Pitch Black Intercept",
        context: "LFE (Large Force Employment) Exercise Darwin 2022",
        objective: "Protect high-value assets (C-17 & Tanker) from incoming BVR (Beyond Visual Range) threats during multinational deployment.",
        location: "Darwin, Australia",
        difficulty: "Expert",
        assets: ["Su-30MKI", "Il-78 MKI"],
        adversaries: ["Aggressor Wing"],
        threats: [
            { type: "FIGHTER", name: "BVR Intercept", scenePos: [5, -95], range: 120 }
        ],
        waypoints: [
            { id: 1, pos: [0, 10, -10], label: "Escort Start" },
            { id: 2, pos: [20, 12, -80], label: "Threat Convergence" },
            { id: 3, pos: [-40, 5, -120], label: "Safe Haven" }
        ],
        constraints: {
            maxExposure: 3 // seconds of simulated radar exposure tolerated before the sortie is compromised
        }
    },
    {
        id: "mission-jt-22",
        lesson: {
            title: "PLA Theatre Operations: Low-Observable Presence",
            body: "Joint Sword 2022 showed the PLA rehearsing blockade and presence operations. A very low-RCS platform (J-20, ~0.05 m² assumed) cuts detection range to under half of nominal, letting it hold station inside defended airspace for longer."
        },
        name: "Joint Sword Blockade",
        context: "PLA Theatre Command Sortie 2022",
        objective: "Simulation of maritime blockade and air dominance operations. Penetrate ADIZ and maintain station despite carrier-borne intercepts.",
        location: "Taiwan Strait / East China Sea",
        difficulty: "Specialist",
        assets: ["J-20", "H-6K"],
        adversaries: ["QRF Wing"],
        threats: [
            { type: "SAM", name: "Coastal Defense", scenePos: [58, -64], range: 150 }
        ],
        waypoints: [
            { id: 1, pos: [0, 8, -30], label: "ADIZ Entry" },
            { id: 2, pos: [50, 10, -70], label: "Blockade Station" },
            { id: 3, pos: [100, 2, -50], label: "RTB" }
        ],
        constraints: {
            maxExposure: 3 // seconds of simulated radar exposure tolerated before the sortie is compromised
        }
    }
];
