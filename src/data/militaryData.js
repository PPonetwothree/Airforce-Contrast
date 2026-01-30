export const militaryData = {
    inventory: {
        title: "Total Aircraft Inventory",
        iaf: 1716,
        plaaf: 3304,
        note: "PLAAF inventory estimated between 3304-3733. IAF active approx 1716.",
        details: [
            {
                category: "Stealth / 5th Gen",
                iaf: [],
                plaaf: [{ name: "J-20 Mighty Dragon", count: 300 }]
            },
            {
                category: "Heavy / Air Superiority",
                iaf: [{ name: "Su-30MKI", count: 262 }],
                plaaf: [
                    { name: "J-16 Hidden Dragon", count: 350 },
                    { name: "J-11 Flanker-L", count: 250 }
                ]
            },
            {
                category: "Medium / Multi-role",
                iaf: [
                    { name: "MiG-29UPG", count: 75 },
                    { name: "Mirage 2000", count: 50 },
                    { name: "Rafale", count: 36 }
                ],
                plaaf: [
                    { name: "J-10 Vigorous Dragon", count: 600 }
                ]
            },
            {
                category: "Light / Interceptor",
                iaf: [
                    { name: "Jaguar (Strike)", count: 125 },
                    { name: "MiG-21 Bison", count: 50 },
                    { name: "Tejas Mk1", count: 32 }
                ],
                plaaf: [
                    { name: "JH-7 Flounder (Strike)", count: 200 },
                    { name: "J-7/8 (Retiring)", count: 250 }
                ]
            },
            {
                category: "Strategic Bombers",
                iaf: [],
                plaaf: [{ name: "H-6 Badger", count: 120 }]
            }
        ]
    },
    squadrons: {
        title: "Combat Squadrons",
        iaf: 31,
        plaaf: 120, // Estimated based on 25+ frontline brigades x ~30-40 aircraft or equivalent
        note: "IAF sanctioned 42, actual 31. PLAAF operates 25+ frontline brigades.",
        orbat: {
            iaf: [
                { name: "No. 1 Squadron (Tigers)", ac: "Mirage 2000", base: "Gwalior", lat: 26.29, lng: 78.22, role: "Multi-role" },
                { name: "No. 7 Squadron (Battle Axes)", ac: "Mirage 2000", base: "Gwalior", lat: 26.29, lng: 78.22, role: "Multi-role" },
                { name: "No. 101 Squadron (Falcons)", ac: "Rafale", base: "Hasimara", lat: 26.70, lng: 89.37, role: "Air Superiority" },
                { name: "No. 17 Squadron (Golden Arrows)", ac: "Rafale", base: "Ambala", lat: 30.37, lng: 76.81, role: "Air Superiority" },
                { name: "No. 221 Squadron (Valiants)", ac: "Su-30MKI", base: "Halwara", lat: 30.74, lng: 75.64, role: "Air Superiority" },
                { name: "No. 20 Squadron (Lightnings)", ac: "Su-30MKI", base: "Lohegaon", lat: 18.58, lng: 73.92, role: "Air Superiority" },
                { name: "No. 220 Squadron (Desert Tigers)", ac: "Su-30MKI", base: "Halwara", lat: 30.74, lng: 75.64, role: "Air Superiority" },
                { name: "No. 45 Squadron (Flying Daggers)", ac: "Tejas Mk1", base: "Sulur", lat: 11.01, lng: 77.10, role: "LCA" },
                { name: "No. 18 Squadron (Flying Bullets)", ac: "Tejas Mk1", base: "Sulur", lat: 11.01, lng: 77.10, role: "LCA" },
                { name: "No. 21 Squadron (Ankush)", ac: "Su-30MKI", base: "Sirsa", lat: 29.53, lng: 75.05, role: "Air Superiority" }
            ],
            plaaf: [
                { name: "99th Air Brigade", ac: "J-16", base: "Hotan", lat: 37.13, lng: 79.87, role: "Strike" },
                { name: "98th Air Brigade", ac: "J-16", base: "Chongqing", lat: 29.49, lng: 106.42, role: "Strike" },
                { name: "97th Air Brigade", ac: "J-20A", base: "Dazu", lat: 29.64, lng: 105.79, role: "Stealth Superiority" },
                { name: "111st Air Brigade", ac: "J-20A/J-11B", base: "Korla", lat: 41.68, lng: 86.13, role: "Superiority" },
                { name: "109th Air Brigade", ac: "J-11A", base: "Changji", lat: 44.00, lng: 87.26, role: "Interceptor" },
                { name: "16th Air Brigade", ac: "J-11B", base: "Yinchuan", lat: 38.48, lng: 106.00, role: "Interceptor" },
                { name: "18th Air Brigade", ac: "J-10C", base: "Dingxi", lat: 35.38, lng: 104.09, role: "Multi-role" },
                { name: "Lhasa Base Unit", ac: "J-10/J-11 (Rotational)", base: "Lhasa Gonggar", lat: 29.29, lng: 90.91, role: "High Altitude" }
            ]
        }
    },
    warheads: {
        title: "Nuclear Warheads",
        iaf: 172,
        plaaf: 500,
        note: "China projected to have 1000 by 2030.",
    },
    missiles: {
        title: "Missile Arsenal",
        description: "Key Strategic Assets",
        iaf: ["Astra Mk1/2", "Meteor (BVRAAM)", "BrahMos (Cruise)", "S-400 (SAM)"],
        plaaf: ["PL-15 (LRAAM)", "PL-10", "KD-88", "YJ-12", "HQ-9 (SAM)"],
    },
    pilots: {
        title: "Pilot Strength",
        iaf: 3834,
        plaaf: 7000,
        note: "IAF sanctioned 4239. PLAAF data opaque.",
    },
    personnel: {
        title: "Total Personnel",
        iaf: 170576,
        plaaf: 400000,
        note: "PLAAF includes airborne and potential dual-role staff.",
    },
    induction: {
        title: "Annual Induction (Est.)",
        iaf: 10,
        plaaf: 100,
    },
    sorties: {
        title: "Sorties per Day (Surge)",
        iaf: 1.5,
        plaaf: 1.1,
    },
    area: {
        title: "Command Theatre Area",
        iaf: 603991,
        plaaf: 5452900,
    },
    strategicDepth: {
        title: "Strategic Depth Analysis",
        description: "Geographic advantages and infrastructure depth.",
        iaf: {
            label: "Indo-Gangetic Plain",
            altitude: "Low Altitude (<1000ft)",
            advantage: "Full Payload Take-off",
            disadvantage: "Close to Border (Lack of Depth)",
            bases: ["Ambala (250km)", "Halwara (200km)", "Hasimara (100km)"]
        },
        plaaf: {
            label: "Tibetan Plateau",
            altitude: "High Altitude (>12000ft)",
            advantage: "Natural Barrier & Deep Interior",
            disadvantage: "Payload Restrictions (Rarefied Air)",
            bases: ["Lhasa (150km)", "Nyingchi (15km)", "Hotan (350km)"]
        },
        facts: [
            "PLAAF fighters often restricted to 50% payload/fuel due to high-altitude take-offs.",
            "IAF bases allow full mission payload but are within range of Chinese tactical missiles.",
            "China has built 16+ high-altitude airbases with hardened shelters to mitigate IAF advantages.",
            "India lacks strategic depth in the north; major industrial hubs are close to the front.",
            "China's core industrial base is 2000km+ away, offering immense strategic depth."
        ]
    },
    tech: {
        title: "Next Gen Technologies",
        iaf: ["Tejas Mk2 (Prototype)", "AMCA (5th Gen Stealth)", "Ghatak UCAV Project"],
        plaaf: ["J-20 (Fifth Gen)", "J-31/35 Stealth Unit", "GJ-11 Sharp Sword"],
        specs: {
            "J-20": {
                type: "Stealth Air Superiority",
                engine: "2x WS-15 (180kN)",
                radar: "Type 1475 AESA (KLJ-5)",
                range: "2000km+ (Est)",
                features: ["Supercruise", "Sensor Fusion", "EOTS"],
                generation: "5th"
            },
            "Rafale": {
                type: "Omnirole Fighter",
                engine: "2x M88-2 (75kN)",
                radar: "RBE2 AA AESA",
                range: "3700km (Ferry)",
                features: ["Spectra EW", "Meteor Integration", "Low RCS"],
                generation: "4.5+"
            },
            "Tejas Mk2": {
                type: "Medium Weight Fighter",
                engine: "GE F414-INS6 (98kN)",
                radar: "Uttam AESA",
                range: "2500km (Ferry)",
                features: ["Canards", "OBOGS", "Advanced EW"],
                generation: "4.5"
            },
            "AMCA": {
                type: "5th Gen Stealth Fighter",
                engine: "Unknown (Dev)",
                radar: "AESA (Gallium Nitride)",
                range: "2800km (Est)",
                features: ["Internal Weapon Bay", "Serpentine Intake", "RCS Reduction"],
                generation: "5th"
            },
            "Ghatak": {
                type: "Stealth UCAV",
                engine: "Dry Kaveri derivative",
                radar: "Passive/EO",
                range: "1500km (Est)",
                features: ["Flying Wing", "Stealthy Intake", "Precision Strike"],
                generation: "n/a"
            },
            "J-31/35": {
                type: "5th Gen Stealth (Carrier/Air)",
                engine: "2x WS-13/19",
                radar: "AESA (Active Search)",
                range: "1200km (Combat)",
                features: ["Multi-role", "Foldable Wings (Naval)", "EOTS"],
                generation: "5th"
            },
            "GJ-11": {
                type: "Stealth Strike UCAV",
                engine: "Unknown Jet",
                radar: "Internal Synthetic Aperture",
                range: "4000km+ (Est)",
                features: ["Flying Wing", "Internal Payload", "Data-link Swarming"],
                generation: "n/a"
            }
        }
    }
};
