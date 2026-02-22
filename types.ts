import { ElementType } from 'react';

export type SectionKey = 'template' | 'problem' | 'rootcause' | 'lessons' | 'actions' | 'prevention' | 'sharing' | 'preview';

export type TemplateKey = 'iso9001' | 'apqp' | 'sixsigma' | 'a3';

export interface Section {
    id: SectionKey;
    name: string;
    icon: ElementType;
}

export interface Template {
    id: TemplateKey;
    icon: ElementType;
    name: string;
    description: string;
    standards: string;
}

export interface TimelineEvent {
    id: string;
    time: string;
    date: string;
    description: string;
}

export interface FishboneNode {
    id: string;
    text: string;
}

export interface FishboneData {
    man: FishboneNode[];
    machine: FishboneNode[];
    material: FishboneNode[];
    method: FishboneNode[];
    measurement: FishboneNode[];
    environment: FishboneNode[];
}

export interface MatrixConfig {
    size: 3 | 4 | 5;
    severityLabels: string[];
    likelihoodLabels: string[];
}

export interface ActionItem {
    id: string;
    type: 'Immediate' | 'Corrective' | 'Systemic';
    description: string;
    owner: string;
    department?: string;
    dueDate: string;
    status: 'Open' | 'In Progress' | 'Closed';
}

export interface CustomField {
    id: string;
    label: string;
    value: string;
}

export interface LfiData {
    template: TemplateKey | null;
    incidentComplexity?: 'minor' | 'major';
    teamMembers: string;
    problemTitle: string;
    problemStatement: string;
    rcaMethod: string;
    rootCause: string;
    lessons: [string, string, string];
    immediateAction: string;
    correctiveAction: string;
    systemicAction: string;
    validation: string;
    horizontal: string;
    audience: string[];
    distribution: string;
    tags: string;
    images: string[];
    timelineEvents: TimelineEvent[];
    actionItems?: ActionItem[];
    distributionMatrix?: Record<string, boolean>;
    fishboneData?: FishboneData;
    customFields?: CustomField[];
    riskAssessment?: {
        beforeSeverity: number;
        beforeLikelihood: number;
        afterLikelihood: number;
    } | null;
    matrixConfig?: MatrixConfig;
}