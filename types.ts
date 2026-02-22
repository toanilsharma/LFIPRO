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

export interface LfiData {
    template: TemplateKey | null;
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
    riskAssessment?: {
        beforeSeverity: number;
        beforeLikelihood: number;
        afterLikelihood: number;
    } | null;
}