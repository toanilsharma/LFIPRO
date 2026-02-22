import { LfiData, TemplateKey } from './types';

export const perfectSampleLfi: LfiData = {
    template: 'a3',
    problemTitle: 'Hydraulic Fluid Leak Contaminating Assembly Line 4',
    teamMembers: 'John Smith (Maintenance), Sarah Jenkins (Quality), Marcus Yao (Production Supervisor)',
    problemStatement: 'On October 14, 2026, during the second shift, a high-pressure hydraulic line burst on Press Machine Alpha (Line 4). This resulted in 15 gallons of hydraulic fluid leaking onto the assembly floor, contaminating 450 in-process units. The line was shut down for 6 hours, resulting in a production delay of 1,200 units and an estimated $18,500 in scrap and downtime costs.',
    rcaMethod: '5Why',
    rootCause: '**The True Root Cause:** The preventative maintenance schedule for high-pressure hydraulic lines (SOP-PM-102) strictly dictates visual inspection but does not mandate predictive pressure-decay testing. Consequently, internal hose degradation went completely undetected until catastrophic failure occurred under normal operating load.',
    lessons: [
        'Visual inspections are insufficient for predicting failures in high-pressure enclosed systems.',
        'Age-based replacement schedules must be cross-referenced with actual machine cycle counts.',
        'Spill-containment berms should be installed around all fluid-heavy machinery to prevent cross-contamination of product.'
    ],
    immediateAction: '1. Shut down Press Machine Alpha immediately.\n2. Quarantined all 450 affected units.\n3. Dispatched hazmat team to clean the 15-gallon spill.\n4. Replaced the burst hose with spare part #H-992 out of inventory to resume production.',
    correctiveAction: 'Install inline pressure-decay sensors on all hydraulic presses on Line 4 to monitor hose integrity in real-time. Combine this with an automatic machine shutoff if pressure drops rapidly. Owner: Maintenance Engineering. Due: 11/01/2026.',
    systemicAction: 'Rewrite PM Protocol (SOP-PM-102) globally. Transition from "time-based visual inspection" to "cycle-based predictive replacement" for all high-pressure lines. Implement acoustic/pressure testing quarterly. Owner: Plant Director. Due: Q1 2027.',
    validation: 'Track hydraulic-related downtime across all lines for 6 months. Target: 0 incidents. Review pressure sensor data logs weekly for early warning alarms.',
    horizontal: 'Deploy the new predictive maintenance schedule (SOP-PM-102-RevB) and pressure-decay sensors to **ALL** hydraulic presses in Plant A, Plant B, and the European facility by the end of Q2 2027.',
    distribution: '- Review incident and systemic fix at the Friday Global Engineering stand-up.\n- Post the revised SOP training video to the Learning Management System.\n- Add this LFI to the new-hire Maintenance Onboarding curriculum.',
    audience: ['production', 'maintenance', 'engineering', 'management', 'quality'],
    tags: 'hydraulic, leak, pm, maintenance, sensor, contamination',
    images: [],
    riskAssessment: {
        beforeSeverity: 4,
        beforeLikelihood: 3,
        afterLikelihood: 1
    }
};

export const SAMPLE_LFIS: Record<TemplateKey, LfiData> = {
    iso9001: { ...perfectSampleLfi, template: 'iso9001' },
    apqp: { ...perfectSampleLfi, template: 'apqp' },
    sixsigma: { ...perfectSampleLfi, template: 'sixsigma' },
    a3: { ...perfectSampleLfi, template: 'a3' },
};