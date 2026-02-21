import { LfiData, TemplateKey } from './types';

export const SAMPLE_LFIS: Record<TemplateKey, LfiData> = {
    iso9001: {
        template: 'iso9001',
        teamMembers: 'Alice Chen (Lead Metallurgist), Bob Smith (QA Manager), Charlie Davis (Supply Chain)',
        problemTitle: 'Global Non-Conformance Alert: Sub-Level Assembly Fastener Shear Failure',
        problemStatement: 'On November 14, 2025, during an automated dynamic torque validation phase (ISO 9001:2015 Clause 8.6), an unacceptable 12% failure rate (shear deformation) was observed on grade 8 fasteners in the sub-level hybrid drive assemblies. The failure compromised the structural integrity required under standard TR-8800, leading to a temporary halt of Line C, preventing the shipment of 1,200 hybrid drive units and incurring a downtime cost exceeding $250,000.',
        rcaMethod: '8D / 5Why',
        rootCause: 'Analysis traced the issue to a recent supply chain diversion. The Tier-2 supplier altered their heat treatment tempering cycle to accelerate production. Due to a gap in the incoming material Quality Control specification (SOP-IN-401), the dynamic shear stress resistance was not tested—only static tensile strength was checked. Thus, brittle fasteners passed the receiving inspection.',
        lessons: [
            'Relying solely on static tensile testing for dynamic load-bearing components leaves a critical blind spot in Quality Assurance.',
            'Supply chain modifications, even at Tier-2 levels, must trigger a mandatory Advanced Product Quality Planning (APQP) re-validation.',
            'Incoming inspection protocols must perfectly mirror the operational stresses the component will face in the field.'
        ],
        immediateAction: '1. Immediate global quarantine of all hybrid drive assemblies produced since October 1st. 2. 100% metallurgical analysis initiated on the remaining fastener stock. 3. Sourced emergency replacement stock from the primary certified vendor.',
        correctiveAction: 'Update SOP-IN-401 to mandate a dynamic shear stress test (Method ASTM F606) for all incoming grade 8+ fasteners before releasing them to the production floor.',
        systemicAction: 'Implement an automated AI-driven Supplier Quality Management (SQM) gateway that cross-references supplier process changes with internal validation testing requirements. Any process change will automatically flag the component for full re-PPAP.',
        validation: 'Extract a daily random sample of 50 fasteners from incoming lots for shear testing over the next 120 days. Target: 0% shear failure under dynamic load. Monitor supplier SCAR resolution performance.',
        horizontal: 'Review and update all incoming inspection procedures for any mechanical components subject to dynamic, vibrational, or thermal stress across all global manufacturing facilities.',
        audience: ['quality', 'engineering', 'supply chain', 'management'],
        distribution: 'Published to the Global QMS Dashboard. Mandatory review required by all Regional Quality Directors within 48 hours.',
        tags: 'iso9001, non-conformance, fasteners, heat-treatment, supply chain, dynamic-testing, qms',
        riskAssessment: {
            beforeSeverity: 5,
            beforeLikelihood: 4,
            afterLikelihood: 1
        }
    },
    apqp: {
        template: 'apqp',
        teamMembers: 'Dr. Emily Hughes (Battery Systems), Frank Torres (Automation Eng.), Grace Lee (Safety)',
        problemTitle: 'Critical Product Alert: High-Voltage Battery Thermal Runaway Potential',
        problemStatement: 'During late-stage pre-production validation testing (Phase 4 of APQP), a high-voltage EV battery module (Model BX-90) exhibited a 5°C per minute anomalous temperature increase under simulated fast-charging conditions, ultimately failing the UN 38.3 thermal test. The issue poses a severe safety hazard and risks delaying the entire vehicle platform launch by 6 weeks.',
        rcaMethod: 'Fault Tree Analysis (FTA)',
        rootCause: 'The Fault Tree Analysis revealed that the thermal interface material (TIM) pad, while meeting thickness specifications, suffered from microscopic air voids. These voids reduced the effective thermal conductivity by 40%. The root cause was poor application pressure calibration on the automated pick-and-place gantry (Equipment #TIM-02), which was not captured in the initial Process Failure Mode and Effects Analysis (PFMEA).',
        lessons: [
            'Microscopic material defects can cascade into macroscopic catastrophic failures in high-energy density applications.',
            'PFMEA must account for the specific calibration tolerances of automated application equipment, not just the material properties.',
            'Validation testing under extreme boundary conditions is the final safeguard against unforeseen assembly variables.'
        ],
        immediateAction: '1. Halted all BX-90 module prototype assembly. 2. Safely discharged and quarantined all existing test modules in the blast-proof bunker. 3. Initiated a laser-scanning inspection of all previously applied TIM pads.',
        correctiveAction: 'Recalibrate the gantry application pressure to 150 PSI and install a real-time vision inspection system to detect air voids greater than 0.1mm in the TIM pad immediately after application.',
        systemicAction: 'Revise the APQP master checklist to require 3D topographic scanning validation for all thermal interface applications before Phase 3 approval. Update the PFMEA to include "Insufficient Application Pressure" as a high-severity failure mode.',
        validation: 'Conduct 50 consecutive fast-charge cycles on 10 newly assembled modules. Target: Maximum temperature delta of < 2°C across the module face. Zero thermal runaway events.',
        horizontal: 'Apply the 3D topographic scanning requirement to the power inverter and motor controller assembly lines globally.',
        audience: ['engineering', 'production', 'safety', 'global'],
        distribution: 'Immediate APQP Task Force meeting. Alert issued to the OEM customer detailing the delay and containment strategy. Added to the corporate DFMEA/PFMEA knowledge base.',
        tags: 'apqp, thermal-runaway, ev-battery, pfmea, validation, safety, automation',
        riskAssessment: {
            beforeSeverity: 5,
            beforeLikelihood: 3,
            afterLikelihood: 1
        }
    },
    sixsigma: {
        template: 'sixsigma',
        teamMembers: 'Ian Black (Module Owner), Jennifer Kim (Process Eng.), Kevin White (Facilities/HVAC)',
        problemTitle: 'DMAIC Master Project: Yield Degradation in Microchip Photolithography',
        problemStatement: 'Define/Measure: In Q1 2026, the node 5nm silicon wafer production line experienced a concerning yield drop from 98.5% to 92.1% (Cpk fell to 0.85). The defect tracking system highlighted an increase in "edge-defocus" anomalies during the photolithography exposure step. This yield degradation represents a financial loss of approximately $4.2M per quarter.',
        rcaMethod: 'Design of Experiments (DOE)',
        rootCause: 'Analyze: A fractional factorial DOE analyzed 6 variables. The critical interaction was found between the photoresist spin-coat RPM and the ambient humidity control within the cleanroom module. The HVAC desiccant wheel was degrading faster than expected, causing micro-fluctuations in humidity (from 40% to 45%) which marginally altered the photoresist viscosity at the wafer edges during the High-RPM spin.',
        lessons: [
            'Nanometer-scale manufacturing is hypersensitive to even minor environmental control drifts.',
            'Maintenance schedules for environmental controls must be driven by predictive analytics (wear rates), rather than fixed time intervals.',
            'Complex defect patterns often result from the interaction of two subtly out-of-spec variables, rather than a single massive failure.'
        ],
        immediateAction: '1. Replaced the HVAC desiccant wheel to immediately stabilize humidity at exactly 40%. 2. Adjusted the spin-coat profile to a lower RPM at the edge-bead removal stage to temporarily compensate for any remaining viscosity variation.',
        correctiveAction: 'Improve: Install ultra-precision, fast-response humidity sensors directly inside the spin-coat chamber (rather than relying on the general module sensors) to provide a tight feedback loop to the local environmental control.',
        systemicAction: 'Control: Implement an active Statistical Process Control (SPC) algorithm that links the spin-coat RPM dynamically to the real-time localized humidity sensor reading. Update the PM schedule to use vibration analysis to predict desiccant wheel failure.',
        validation: 'Monitor the Cpk of the edge-focus parameter on the next 10,000 wafers. Target: Cpk restoration to > 1.5. Target zero edge-defocus defects.',
        horizontal: 'Deploy the localized humidity sensor and dynamic SPC algorithm architecture to all photolithography steppers globally.',
        audience: ['production', 'engineering', 'maintenance', 'management'],
        distribution: 'Published detailed technical whitepaper to the internal semiconductor engineering portal. Presented at the quarterly Continuous Improvement Summit.',
        tags: 'six-sigma, dmaic, photolithography, semiconductor, yield, doe, spc, humidity',
        riskAssessment: {
            beforeSeverity: 4,
            beforeLikelihood: 5,
            afterLikelihood: 2
        }
    },
    a3: {
        template: 'a3',
        teamMembers: 'Laura Croft (EHS Specialist), Mike Rivera (Cell Lead), Nancy Wu (Manufacturing Eng.)',
        problemTitle: 'A3 Strategy: Eliminating Ergonomic Hazards in the Sub-Assembly Cell',
        problemStatement: 'Background: The new Alpha-series dashboard assembly line has recorded 4 Recordable Incident Rate (RIR) events in the last 60 days, specifically related to repetitive strain injuries (RSI) in the wrist and shoulder. Cycle times have spiked by 18%, and employee morale in the cell is noticeably declining due to physical fatigue. The target is 0 ergonomic injuries and a stable 45-second cycle time.',
        rcaMethod: 'Gemba Walk / Ergonomic Assessment',
        rootCause: 'Current Condition Analysis: A Rapid Upper Limb Assessment (RULA) scoring during a Gemba walk revealed that operators are forced to perform a blind, overhead torque operation using heavy pneumatic tools. The fixture design requires hyper-extension of the wrist while managing a 3.5kg tool load, repetitively, 400 times a shift.',
        lessons: [
            'Ergonomics must be integrated into the initial fixture design phase, not addressed reactively after injuries occur.',
            'Heavy tooling requires zero-gravity assist mechanisms to decouple tool weight from the operator.',
            'Designing for the operator\'s natural posture ("Neutral Zone") directly improves both safety and cycle time simultaneously.'
        ],
        immediateAction: '1. Rotated operators through the station every 2 hours to limit exposure time. 2. Provided mandatory micro-breaks (5 mins) every hour with physical therapy-approved stretching exercises.',
        correctiveAction: 'Countermeasures: 1. Install an articulated zero-gravity tool balancer arm to suspend the pneumatic torque gun. 2. Redesign the assembly fixture on a rotating trunnion, allowing the operator to flip the dashboard and perform the fastening facing downward in the ergonomic "power zone".',
        systemicAction: 'Target State: Integrate an ergonomic sign-off gate (requiring a RULA score of < 3) into the standard equipment procurement and custom fixture design process.',
        validation: 'Follow-up: 1. Re-evaluate the station using the RULA tool after modifications. Target: Score < 3. 2. Monitor RIR for the cell for 6 months. Target: 0 RSI incidents. 3. Track cycle time stability to achieve the 45-second goal.',
        horizontal: 'Conduct a plant-wide sweep specifically looking for any overhead fastening operations or stations requiring tools heavier than 1.5kg without a balancer.',
        audience: ['production', 'safety', 'engineering', 'management'],
        distribution: 'A3 printed and displayed at the cell\'s visual management board. Findings presented to the plant safety committee and the equipment design team.',
        tags: 'a3, lean, safety, ergonomics, gemba, rula, continuous-improvement',
        riskAssessment: {
            beforeSeverity: 4,
            beforeLikelihood: 4,
            afterLikelihood: 1
        }
    }
};