export const orbatData = {
    iaf: {
        commands: [
            {
                name: "Western Air Command (WAC)",
                hq: "New Delhi",
                focus: "Pakistan Border / Kashmir",
                bases: [
                    { name: "Ambala", lat: 30.34, lon: 76.82, squadrons: ["No. 17 (Rafale)", "No. 5 (Jaguar)", "No. 224 (Jaguar)"], impact: "Critical Strategic Hub" },
                    { name: "Adampur", lat: 31.43, lon: 75.76, squadrons: ["No. 47 (MiG-29)", "No. 223 (MiG-29)", "No. 14 (Jaguar)"] },
                    { name: "Srinagar", lat: 33.99, lon: 74.77, squadrons: ["No. 51 (MiG-21 - Retiring)", "Mi-17 Units"], altitude: "1,655m" },
                    { name: "Pathankot", lat: 32.23, lon: 75.63, squadrons: ["No. 3 (MiG-21 - Retiring)", "Attack Helos"] }
                ]
            },
            {
                name: "Eastern Air Command (EAC)",
                hq: "Shillong",
                focus: "LAC / Tibet Frontier",
                bases: [
                    { name: "Tezpur", lat: 26.71, lon: 92.78, squadrons: ["No. 102 (Su-30MKI)", "No. 31 (Su-30MKI)"], impact: "Forward Fighter Base" },
                    { name: "Hasimara", lat: 26.71, lon: 89.33, squadrons: ["No. 101 (Rafale)"], impact: "Doklam Sector Cover" },
                    { name: "Chabua", lat: 27.48, lon: 95.12, squadrons: ["No. 102 (Su-30MKI)", "Training Units"] },
                    { name: "Bagdogra", lat: 26.68, lon: 88.33, squadrons: ["Tactical Transport", "Forward Detachments"] }
                ]
            }
        ]
    },
    plaaf: {
        commands: [
            {
                name: "Western Theater Command (WTCAF)",
                hq: "Chengdu",
                focus: "India/LAC Border (Tibet/Xinjiang)",
                bases: [
                    { name: "Ngari Gunsa (Ali)", lat: 32.10, lon: 80.05, altitude: "4,300m", units: ["J-11B Brigade", "UAV Detachments"], impact: "Extreme Altitude Frontline" },
                    { name: "Hotan", lat: 37.04, lon: 79.86, units: ["J-16 Brigade", "J-11 Brigade"], impact: "Aksai Chin Cover" },
                    { name: "Lhasa Gonggar", lat: 29.30, lon: 90.91, altitude: "3,600m", units: ["J-20 Brigade (Det)", "J-10C Brigade"], impact: "Tibet Strategic Hub" },
                    { name: "Shigatse", lat: 29.35, lon: 89.31, altitude: "3,800m", units: ["H-6K Bomber Det", "J-16 Brigade"] }
                ]
            }
        ]
    },
    theaters: {
        ladakh: {
            name: "Ladakh / Aksai Chin Sector",
            iafBases: ["Leh", "Thoise", "Srinagar", "Adampur"],
            plaafBases: ["Ngari Gunsa", "Hotan", "Kashgar"],
            threatRating: "CRITICAL",
            description: "Direct confrontation zone post-2020. Extreme altitude limits fighter payloads for both sides."
        },
        arunachal: {
            name: "Arunachal / Eastern Sector",
            iafBases: ["Tezpur", "Chabua", "Hasimara"],
            plaafBases: ["Linzhi", "Hoping", "Lhasa"],
            threatRating: "HIGH",
            description: "Focus on deep strike and air superiority over the Tawang and Dibang valleys."
        }
    },
    combatPowerFactors: {
        stealth: 3.5,
        aesaMultiRole: 2.2,
        upgraded4th: 1.8,
        legacy: 1.2
    }
};
