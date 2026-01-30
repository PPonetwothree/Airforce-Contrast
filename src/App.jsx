import React from 'react';
import { militaryData } from './data/militaryData';
import { HeroSection } from './components/HeroSection';
import { StatCard } from './components/StatCard';
import { RadialStatusChart } from './components/RadialStatusChart';
import { BubbleChart } from './components/BubbleChart';
import { ComparisonChart } from './components/ComparisonChart';
import { NextGenTechPanel } from './components/NextGenTechPanel';
import { OrbatMap } from './components/OrbatMap';
import { InventoryGrid } from './components/InventoryGrid';
import { NightingaleChart } from './components/NightingaleChart';
import { StrategicDepthMap } from './components/StrategicDepthMap';
import { EnvironmentSimulator } from './components/EnvironmentSimulator';
// import { ScenarioViewer } from './components/ScenarioViewer'; // Replaced by StrategicWargame
// import { MatchupArena } from './components/MatchupArena'; // Replaced by AircraftComparator
import { AircraftComparator } from './components/AircraftComparator';
import { StrategicWargame } from './components/StrategicWargame';
import { NuclearImpact } from './components/NuclearImpact';
import { SquadronHangar } from './components/SquadronHangar';
import { RetentionGraphics } from './components/RetentionGraphics';
import ExerciseAnalysisModule from './components/ExerciseAnalysisModule';
import MissionSimulator from './components/MissionSimulator';
import TrainingAnalyticsModule from './components/TrainingAnalyticsModule';
import ORBATIntelligenceHub from './components/ORBATIntelligenceHub';
import { analysisData } from './data/analysisData';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      <RetentionGraphics />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-24">

        {/* 1. STRATEGIC OVERVIEW (The Balance of Power) */}
        <section id="strategic-overview" className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Strategic Overview</h2>
            <p className="text-slate-500 mt-2">Force Distribution and Command Area Analysis</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadialStatusChart
                title="IAF Personnel Capacity"
                data={militaryData.personnel.iafBreakdown}
                type="iaf"
              />
              <RadialStatusChart
                title="PLAAF Personnel Capacity"
                data={militaryData.personnel.plaafBreakdown}
                type="plaaf"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RadialStatusChart
                title="IAF Command Area (Sq km)"
                data={militaryData.area.iafBreakdown}
                type="iaf"
              />
              <RadialStatusChart
                title="PLAAF Command Area (Sq km)"
                data={militaryData.area.plaafBreakdown}
                type="plaaf"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <NightingaleChart />
          </div>
        </section>

        {/* 2. THEATRE OF OPERATIONS (The Geography) */}
        <section>
          <StrategicDepthMap data={militaryData.strategicDepth} />
        </section>

        {/* 3. EXERCISE ANALYSIS (The Activity) */}
        <ExerciseAnalysisModule />

        {/* 3. ORDER OF BATTLE (The Forces) */}
        <section className="relative">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center pt-8">Strategic Order of Battle (ORBAT)</h2>
          <OrbatMap iafUnits={militaryData.squadrons.orbat.iaf} plaafUnits={militaryData.squadrons.orbat.plaaf} />
        </section>

        {/* 4. SQUADRON READINESS (The Hangar) */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center pt-8">Squadron Readiness Deck</h2>
          <SquadronHangar />
        </section>

        {/* 5. INVENTORY & TECH (The Hardware) */}
        {/* 4. STRATEGIC DEPLOYMENT & ORBAT (The Context) */}
        <ORBATIntelligenceHub />

        <section id="inventory-grid">
          <InventoryGrid data={militaryData.inventory} />
        </section>

        {/* 6. TRAINING INTELLIGENCE (The Workforce) */}
        <TrainingAnalyticsModule />

        <section className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <NextGenTechPanel data={militaryData.tech} />
        </section>

        {/* 6. ADVANCED WARFARE SIMULATION (The Outcome) */}
        <section className="space-y-12 pt-8 border-t border-slate-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Deep Strategic Analysis</h2>
            <p className="text-slate-500 mt-2">Comprehensive wargaming simulation and tactical breakdown</p>
          </div>

          <EnvironmentSimulator data={analysisData.environment} />

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <AircraftComparator data={analysisData.aircraft} />
          </div>

          <h3 className="text-2xl font-bold text-center text-slate-800 pt-8 border-t border-slate-200">Defence Education: Flight Simulation</h3>
          <MissionSimulator />

          <h3 className="text-2xl font-bold text-center text-slate-800 pt-8 border-t border-slate-200">Strategic Deterrence & Escalation</h3>
          <NuclearImpact iafWarheads={militaryData.warheads.iaf} plaafWarheads={militaryData.warheads.plaaf} />

          <StrategicWargame data={analysisData.wargame} />
        </section>
        <div className="text-center pt-10 border-t border-slate-200">
          <p className="text-slate-400 text-sm">
            Data sources: IISS Military Balance 2024, SIPRI Yearbook 2024, DoD China Military Power Report 2024.
            <br />Some figures for PLAAF are estimates due to classification.
          </p>
        </div>

      </main>
    </div>
  );
}

export default App;
