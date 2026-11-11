export const analysisData = {
    environment: {
        title: "Environmental Impact Simulator",
        description: "Himalayan altitudes severely degrade aircraft performance.",
        effects: [
            { label: "Engine Thrust", seaLevel: 100, highAlt: 65, color: "bg-yellow-500", unit: "%" },
            { label: "Weapons Payload", seaLevel: 100, highAlt: 55, color: "bg-red-500", unit: "%" },
            { label: "Combat Radius", seaLevel: 100, highAlt: 60, color: "bg-orange-500", unit: "%" }
        ],
        context: "At 14,000-17,000ft (Ladakh), low air density reduces thrust by 25-45% and necessitates 30-50% payload reduction for PLAAF aircraft operating from high-altitude bases."
    },
    aircraft: {
        iaf: [
            {
                id: "rafale",
                name: "Rafale",
                role: "Omnirole",
                stats: { bvr: 95, wvr: 95, stealth: 70, tech: 95, payload: 85 },
                traits: ["Meteor Missile", "SPECTRA EW", "Combat Proven"],
                desc: "Technologically superior to most non-stealth threats. Key advantage in EW and BVR."
            },
            {
                id: "su30",
                name: "Su-30MKI",
                role: "Air Dominance",
                stats: { bvr: 80, wvr: 90, stealth: 40, tech: 75, payload: 95 },
                traits: ["Thrust Vectoring", "BrahMos", "Huge Radar"],
                desc: "Kinematic beast. Unmatched in close combat (WVR) but large RCS makes it visible."
            },
            {
                id: "mirage",
                name: "Mirage 2000",
                role: "Multi-role",
                stats: { bvr: 70, wvr: 75, stealth: 50, tech: 70, payload: 65 },
                traits: ["Precision Strike", "High Alt Exp", "Reliable"],
                desc: "Aging but lethal. Excellent high-altitude performance and precision."
            },
            {
                id: "mig29",
                name: "MiG-29UPG",
                role: "Interceptor",
                stats: { bvr: 70, wvr: 85, stealth: 45, tech: 65, payload: 60 },
                traits: ["High T/W Ratio", "Agile", "Interceptor"],
                desc: "Excellent climber for mountain interception. Short legs (range)."
            },
            {
                id: "tejas",
                name: "Tejas Mk1",
                role: "LCA",
                stats: { bvr: 65, wvr: 70, stealth: 60, tech: 75, payload: 50 },
                traits: ["Small RCS", "Composites", "Agile"],
                desc: "Small target, difficult to visually acquire. Limited payload."
            },
            {
                id: "jaguar",
                name: "Jaguar",
                role: "Ground Attack",
                stats: { bvr: 30, wvr: 40, stealth: 30, tech: 60, payload: 80 },
                traits: ["Low Level", "Nuclear Capable", "Strike"],
                desc: "Dedicated striker. Vulnerable in air-to-air."
            }
        ],
        plaaf: [
            {
                id: "j20",
                name: "J-20 Mighty Dragon",
                role: "Stealth Superiority",
                stats: { bvr: 98, wvr: 75, stealth: 95, tech: 95, payload: 80 },
                traits: ["Stealth (LO)", "PL-15 LRAAM", "Sensor Fusion"],
                desc: "The Apex Predator. Stealth allows it to dictate engagement. WVR capability unproven."
            },
            {
                id: "j16",
                name: "J-16 Hidden Dragon",
                role: "Strike Heavy",
                stats: { bvr: 88, wvr: 85, stealth: 45, tech: 85, payload: 95 },
                traits: ["AESA Radar", "PL-15 + PL-10", "EW Suite"],
                desc: "China's premier non-stealth fighter. Massive payload and modern avionics."
            },
            {
                id: "j10c",
                name: "J-10C Vigorous Dragon",
                role: "Multi-role",
                stats: { bvr: 80, wvr: 85, stealth: 55, tech: 80, payload: 70 },
                traits: ["AESA", "PL-15", "Agile"],
                desc: "Goldeneye of the PLAAF. Modern, agile, and numerous. Threat to any 4th gen."
            },
            {
                id: "j11",
                name: "J-11 Flanker-L",
                role: "Air Superiority",
                stats: { bvr: 70, wvr: 80, stealth: 40, tech: 60, payload: 90 },
                traits: ["Range", "Payload", "Numerous"],
                desc: "Workhorse Flanker. Capable but avionics lag behind J-16/J-10C."
            },
            {
                id: "jh7",
                name: "JH-7A Flounder",
                role: "Strike",
                stats: { bvr: 40, wvr: 40, stealth: 20, tech: 50, payload: 85 },
                traits: ["Long Range", "Anti-Ship", "Heavy"],
                desc: "Dedicated bomber truck. Easy prey for fighters."
            }
        ]
    },
    wargame: [
        {
            id: "skirmish",
            title: "Border Skirmish",
            brief: "Ground forces have engaged in the Galwan sector. PLAAF J-11s are probing the LAC. Tensions are high.",
            choices: [
                {
                    label: "Aggressive CAP",
                    desc: "Scramble Su-30MKI to lock on and push them back.",
                    outcome: {
                        title: "Standoff De-escalation",
                        result: "Success. The Su-30s' radar lock warnings force the J-11s to retreat. No shots fired, but escalation risk was critical.",
                        score: 80,
                        color: "text-emerald-400"
                    }
                },
                {
                    label: "Defensive Posture",
                    desc: "Hold aircraft at stand-off distance within Indian territory.",
                    outcome: {
                        title: "Airspace Violation",
                        result: "PLAAF aircraft cross the LAC briefly to test reaction times before turning back. You ceded psychological dominance.",
                        score: 40,
                        color: "text-amber-400"
                    }
                }
            ]
        },
        {
            id: "limited",
            title: "Limited Air Campaign",
            brief: "A deliberate PLAAF offensive to degrade forward airfields in Ladakh using cruise missiles and J-16 strikes.",
            choices: [
                {
                    label: "Forward Defense (S-400)",
                    desc: "Activate S-400 batteries to engage incoming threats.",
                    outcome: {
                        title: "High Cost Defense",
                        result: "The S-400 downs several J-16s and cruise missiles, but is eventually saturated by swarms. Airfields take damage but remain operational.",
                        score: 60,
                        color: "text-blue-400"
                    }
                },
                {
                    label: "Counter-Air (Rafale)",
                    desc: "Launch Rafales to intercept strikers before launch.",
                    outcome: {
                        title: "Tactical Victory",
                        result: "Rafales using Meteor missiles disrupt the attack formation from 150km away. PLAAF mission aborted with heavy losses.",
                        score: 90,
                        color: "text-emerald-400"
                    }
                }
            ]
        },
        {
            id: "sustained",
            title: "Sustained Conflict (Day 30)",
            brief: "War has raged for a month. Attrition is high. Spare parts are critical.",
            choices: [
                {
                    label: "Conserve & Ambush",
                    desc: "Pull back to interior bases and only launch targeted ambushes.",
                    outcome: {
                        title: "Strategic Survival",
                        result: "You preserve the core fleet. PLAAF controls the border skies but cannot push deep without losses. Stalemate favoring defense.",
                        score: 70,
                        color: "text-yellow-400"
                    }
                },
                {
                    label: "All-Out Contest",
                    desc: "Commit all reserves to regain air superiority over the border.",
                    outcome: {
                        title: "Attritional Defeat",
                        result: "Initial success is followed by collapse as PLAAF numerical superiority (3:1) grinds down the smaller IAF fleet. Logistic failure.",
                        score: 20,
                        color: "text-red-500"
                    }
                }
            ]
        }
    ]
};
