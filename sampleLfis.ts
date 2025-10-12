import { LfiData, TemplateKey } from './types';

export const SAMPLE_LFIS: Record<TemplateKey, LfiData> = {
    iso9001: {
        template: 'iso9001',
        problemTitle: 'Non-Conformance: Incorrect Material Hardness on Batch 7B-2241',
        problemStatement: 'On October 26, 2024, during routine final inspection, Quality Control identified that 35% of parts (70 out of 200 units) from Lot 7B-2241 failed Rockwell hardness testing, measuring an average of 45 HRC instead of the specified 58-62 HRC. This deviation from specification P-77 Rev. D has resulted in the entire lot being quarantined, causing a potential shipment delay of 3 days and an estimated scrap/rework cost of $15,000.',
        rcaMethod: '5Why',
        rootCause: 'The heat treatment furnace\'s temperature control procedure (SOP-HT-102) did not include a mandatory secondary verification step after cycle programming. An operator inadvertently entered 1500°F instead of 1600°F due to a typographical error, and the lack of a required cross-check in the system allowed this deviation to go undetected before the cycle began.',
        lessons: [
            'Procedural control points are critical for preventing human error in manual data entry processes.',
            'Automated system validation checks are more reliable than relying solely on operator diligence for critical process parameters.',
            'A single point of failure in a critical process setup can lead to significant non-conformance and financial loss.'
        ],
        immediateAction: '1. Lot 7B-2241 has been quarantined and flagged for 100% re-inspection and disposition (re-treat or scrap). \n2. Production planning notified of potential shipment delay. \n3. A temporary deviation notice was issued mandating a supervisor sign-off on all furnace programming until a permanent fix is implemented.',
        correctiveAction: 'Update SOP-HT-102 to include a mandatory peer-verification step for all heat treatment cycle parameters. The second operator must verify settings against the work order and co-sign the setup sheet before the cycle can be initiated. Owner: J. Doe (Quality Eng). Due: 11/15/2024.',
        systemicAction: 'Initiate a project to upgrade the furnace control software to include automated parameter validation against the production order\'s material specifications. The system will prevent a cycle from starting if parameters are outside the allowed tolerance. Owner: T. Smith (Eng. Mgr). Due: Q2 2025.',
        validation: '1. Audit 100% of heat treatment setup sheets for 30 days to ensure dual-signature compliance. Target: 100% compliance. \n2. Monitor hardness test results for all heat-treated batches for 90 days. Target: 0 hardness-related non-conformances.',
        horizontal: '1. Review all other critical equipment programming procedures (e.g., CNC machines, chemical baths) for similar gaps in parameter verification. \n2. Apply the principle of dual-verification to any process identified with manual critical parameter entry.',
        audience: ['production', 'quality', 'engineering', 'management'],
        distribution: '1. Present findings at the weekly Quality Review Board meeting. \n2. Conduct mandatory re-training for all heat treatment operators on the updated SOP-HT-102. \n3. Add this LFI to the central Quality Management System (QMS) database.',
        tags: 'heat treatment, furnace, material hardness, non-conformance, process control, sop, verification'
    },
    apqp: {
        template: 'apqp',
        problemTitle: '8D Report: Gasket Seal Failure on AC Compressor Assembly',
        problemStatement: 'Team has been established with members from Engineering, Quality, and Production. On October 28, 2024, our Tier-1 customer (OEM Automotive) reported a 0.5% failure rate (500 ppm) due to refrigerant leaks from the main housing gasket on AC Compressor model AC-45 Rev. B. This issue was identified during their end-of-line pressure decay testing. The problem has led to a customer complaint (Ref: C-2024-112), a potential line stoppage, and a request for a formal 8D investigation.',
        rcaMethod: 'Fishbone',
        rootCause: 'The gasket installation fixture (Tool #AF-1138) had worn guide pins, allowing for inconsistent gasket seating (average 0.3mm off-center). This misalignment created a weak point in the seal, which failed under the specified 15-bar pressure test. The fixture\'s preventative maintenance (PM) plan did not include a tolerance check for the guide pins, only a visual inspection, which was insufficient to detect the gradual wear.',
        lessons: [
            'Preventative Maintenance plans must include quantitative tolerance checks for critical tooling features, not just qualitative visual inspections.',
            'Tooling wear is a predictable failure mode and should be a key input for FMEA documents.',
            'End-of-line testing can catch defects but does not prevent them; robust in-process controls are essential.'
        ],
        immediateAction: '1. All suspect inventory at our facility and the customer\'s site has been placed on quality hold (approx. 5,000 units). \n2. 100% inspection and pressure testing of all quarantined stock has been initiated. \n3. A certified, backup installation fixture (Tool #AF-1139) has been put into service on the production line.',
        correctiveAction: 'Refurbish the worn installation fixture (Tool #AF-1138) with new, hardened steel guide pins. Owner: M. Jones (Maint. Supervisor). Due: 11/05/2024.',
        systemicAction: '1. Update the PM procedure for all assembly fixtures to include a go/no-go gauge check for critical alignment features, to be performed quarterly. \n2. Review and update the Process FMEA for the AC compressor assembly to increase the Occurrence rating for "tooling wear" and add the gauge check as a new detection control. Owner: R. Singh (Process Eng). Due: 12/01/2024.',
        validation: '1. Track customer-reported leak failures for 6 months. Target: < 10 ppm. \n2. Analyze Coordinate Measuring Machine (CMM) data for gasket concentricity on 5 units per shift for 30 days. Target: Concentricity to be within 0.05mm tolerance.',
        horizontal: 'Review the PM and FMEA documentation for all other gasket/seal installation processes across the plant to ensure tooling wear is adequately controlled and monitored.',
        audience: ['production', 'quality', 'maintenance', 'engineering', 'management', 'global'],
        distribution: '1. Submit formal 8D report to the customer via their supplier portal. \n2. Add this LFI to the corporate lessons learned database. \n3. Hold a "Quality Alert" meeting with all assembly line teams to review the failure and the implemented corrective actions.',
        tags: '8D, APQP, gasket, seal failure, leak, tooling, fixture, preventative maintenance, FMEA'
    },
    sixsigma: {
        template: 'sixsigma',
        problemTitle: 'DMAIC Project: Reduce Coating Thickness Variation on TX-9 Resistors',
        problemStatement: 'Define/Measure: In Q3 2024, the resistive coating process for TX-9 resistors exhibited a high level of variation, with a Cpk of 0.78, well below the target of 1.33. Data analysis of 500 samples showed the coating thickness ranged from 15 to 35 microns, against a specification of 25 microns ±5. This variation has led to a 4% final test yield loss, costing an average of $22,000 per month in scrap.',
        rcaMethod: 'Pareto',
        rootCause: 'Analyze: A Design of Experiments (DOE) revealed a statistically significant interaction between the spray nozzle viscosity and the conveyor belt speed. The root cause was determined to be an uncontrolled ambient temperature fluctuation in the coating bay (ranging from 65°F to 85°F), which directly impacted the coating fluid\'s viscosity. The existing process controls did not account for this variable.',
        lessons: [
            'Environmental factors like ambient temperature can be critical, unmonitored variables in processes sensitive to fluid dynamics.',
            'Statistical Process Control (SPC) should be implemented on input variables (like viscosity), not just output characteristics (like thickness).',
            'A robust process control plan is essential to sustain the gains from a DMAIC project.'
        ],
        immediateAction: '1. Implemented a temporary manual procedure to measure coating viscosity every 30 minutes and adjust conveyor speed according to a lookup chart to compensate for temperature changes. \n2. Increased final testing frequency to quarantine any out-of-spec batches more quickly.',
        correctiveAction: 'Improve: Install a dedicated HVAC and climate control system in the coating bay to maintain a stable ambient temperature of 72°F ±2°F. Owner: B. Carter (Facilities Mgr). Due: 12/20/2024.',
        systemicAction: 'Control: 1. Implement a real-time SPC system to monitor both coating viscosity and bay temperature. An alarm will trigger if either parameter moves outside the control limits. \n2. Update the process control plan to include these new checks and define the reaction plan for alarms. Owner: S. Lee (Controls Eng). Due: 01/30/2025.',
        validation: '1. Monitor Cpk for coating thickness for three consecutive months. Target: Cpk ≥ 1.33. \n2. Track final test yield loss for three months. Target: Yield loss due to coating thickness < 0.1%.',
        horizontal: 'Audit other fluid application processes (e.g., conformal coating, potting) to assess their vulnerability to uncontrolled ambient temperature and implement similar environmental controls where necessary.',
        audience: ['production', 'quality', 'maintenance', 'engineering'],
        distribution: '1. Hold a formal DMAIC project tollgate review to close the project and share results with leadership. \n2. Publish a one-page summary of the project findings and improvements on the company\'s continuous improvement portal.',
        tags: 'Six Sigma, DMAIC, Cpk, process variation, coating, viscosity, SPC, DOE, process control'
    },
    a3: {
        template: 'a3',
        problemTitle: 'A3 Report: Reduce Changeover Time on CNC Milling Center #3',
        problemStatement: 'Background: CNC Milling Center #3 currently has an average changeover time of 55 minutes (from last good part to first good part). This is 25 minutes over the target of 30 minutes. This excess time reduces machine availability and limits our ability to respond to smaller, more frequent customer orders, impacting our Just-in-Time (JIT) goals.',
        rcaMethod: 'Other', // A3 is the method
        rootCause: 'Root Cause Analysis: Video analysis and operator interviews revealed that 40% of the changeover time (approx. 22 minutes) is spent searching for the next job\'s tooling, fixtures, and programs. There is no standardized pre-staging process; each operator develops their own method, leading to high variability and wasted motion (transportation and searching).',
        lessons: [
            'Standardized work is the foundation for stability and continuous improvement.',
            'Visual management systems, like shadow boards and designated staging areas, can drastically reduce searching waste.',
            'Engaging operators in designing new processes ensures higher buy-in and more practical solutions.'
        ],
        immediateAction: 'N/A - Actions are part of countermeasures.',
        correctiveAction: 'Countermeasures: \n1. Create a dedicated "changeover cart" with a shadow board for all required tools for CNC #3. \n2. Establish a standardized pre-staging process where the operator for the next job prepares the cart 30 minutes before the current job finishes. \n3. Relocate the tool pre-setter station next to CNC #3 to reduce walking distance. \n(See Action Plan for owners and dates)',
        systemicAction: 'N/A - Covered in Countermeasures/Follow-up',
        validation: 'Check/Follow-up: \n1. Measure changeover time for every changeover on CNC #3 for the next 30 days. Post results daily on the team\'s performance board. \n2. Conduct weekly 5-minute check-ins with operators to gather feedback and identify any issues with the new process.',
        horizontal: 'Follow-up: If successful after 30 days, develop a plan to roll out the standardized changeover cart and pre-staging process to all 5 CNC Milling Centers in the department by the end of the next quarter.',
        audience: ['production', 'engineering'],
        distribution: 'The A3 document itself will be posted on the Gemba board for the machining cell. The key learnings will be shared during the next monthly Kaizen event.',
        tags: 'A3, lean, kaizen, changeover, SMED, waste reduction, standardized work, JIT'
    }
};