export const trainingData = {
    iaf: {
        name: "Indian Air Force",
        duration: "6-7 Years",
        stages: [
            { name: "Entry/AFA", duration: "1.0 Year", detail: "NDA/CDSE/NCC entry followed by initial training at Dundigal." },
            { name: "Stage I (Basic)", duration: "0.5 Year", detail: "Flying PC-7 Mk.II; focus on basic airmanship." },
            { name: "Stage II (Inter)", duration: "0.5 Year", detail: "Flying Kiran Mk.II/PC-7; stream selection (Fighters/Transport/Helo)." },
            { name: "Stage III (Advanced)", duration: "1.0 Year", detail: "Fighter stream move to Hawk AJT (Bidar/Kalaikunda)." },
            { name: "OCU/Squadron", duration: "1.5-2.0 Years", detail: "Operational Conversion on Su-30MKI, Rafale, etc." }
        ],
        attrition: {
            total: "25-30%",
            nodes: [
                { id: "applicants", label: "Applicants", value: 50000, color: "#3b82f6" },
                { id: "selected", label: "Selected (AFSB)", value: 500, color: "#60a5fa" },
                { id: "joined", label: "Joined AFA", value: 250, color: "#93c5fd" },
                { id: "stage1", label: "Stage I Pass", value: 220, color: "#bfdbfe" },
                { id: "fighters", label: "Fighter Stream", value: 120, color: "#1e40af" }
            ]
        },
        metrics: {
            selectionRatio: 0.9,
            simulatorIntegration: 0.7,
            instructorExperience: 0.85,
            technicalEducation: 0.9,
            politicalMandate: 0.1
        }
    },
    plaaf: {
        name: "People's Liberation Army Air Force",
        duration: "4-5 Years",
        stages: [
            { name: "University", duration: "2.5 Years", detail: "Aviation University (Changchun); academic + ground school." },
            { name: "Primary Flight", duration: "0.5 Year", detail: "Flying CJ-6; basic flight maneuvers and solo focus." },
            { name: "Basic/Advanced", duration: "1.0 Year", detail: "JL-8 and L-15/JL-9; integrated fighter/multi-role path." },
            { name: "Unit OCU", duration: "0.5-1.0 Year", detail: "Rapid conversion to J-20/J-16 at frontline brigades." }
        ],
        attrition: {
            total: "35-40%",
            nodes: [
                { id: "applicants", label: "Applicants", value: 120000, color: "#ef4444" },
                { id: "selected", label: "Selected (National)", value: 1500, color: "#f87171" },
                { id: "joined", label: "Joined University", value: 1200, color: "#fca5a5" },
                { id: "completed", label: "Flight Qualified", value: 800, color: "#fee2e2" },
                { id: "fighters", label: "Fighter Stream", value: 450, color: "#991b1b" }
            ]
        },
        metrics: {
            selectionRatio: 0.6,
            simulatorIntegration: 0.85,
            instructorExperience: 0.65,
            technicalEducation: 0.75,
            politicalMandate: 0.95
        }
    },
    comparisonSummary: "The IAF focuses on a deliberate, longer timeline (6-7 years) with significant emphasis on Stage III advanced jet training. The PLAAF has transitioned to a '3-phase' integrated model (4-5 years) with higher annual throughput and intense emphasis on political education and simulator-based rapid conversion."
};
