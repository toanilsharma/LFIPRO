import { Section, Template, TemplateKey } from './types';
import {
    FileText, AlertTriangle, Search, Lightbulb, Zap, ShieldAlert, Globe, FileCheck,
    Factory, CarFront, BarChart3, Presentation
} from 'lucide-react';

export const SECTIONS: Section[] = [
    { id: 'template', name: '1. Select Template', icon: FileText },
    { id: 'problem', name: '2. Problem Context', icon: AlertTriangle },
    { id: 'rootcause', name: '3. Root Cause', icon: Search },
    { id: 'lessons', name: '4. Lessons Learned', icon: Lightbulb },
    { id: 'actions', name: '5. Implementation', icon: Zap },
    { id: 'prevention', name: '6. Prevention', icon: ShieldAlert },
    { id: 'sharing', name: '7. Knowledge Sharing', icon: Globe },
    { id: 'preview', name: '8. Review & Export', icon: FileCheck },
];

export const TEMPLATES: Template[] = [
    { id: 'iso9001', icon: Factory, name: 'ISO 9001 CAPA', description: 'Perfect for diverse quality management systems. Emphasizes rigorous corrective and preventive actions.', standards: 'ISO 9001:2015 | Enterprise Quality' },
    { id: 'apqp', icon: CarFront, name: 'APQP/8D', description: 'Automotive industry standard. Team-based problem solving with systematic root cause elimination.', standards: 'APQP | 8D Methodology | AIAG' },
    { id: 'sixsigma', icon: BarChart3, name: 'Six Sigma DMAIC', description: 'Data-driven approach focusing on measurable improvements. Ideal for process optimization.', standards: 'Six Sigma | DMAIC | Lean' },
    { id: 'a3', icon: Presentation, name: 'A3 Thinking', description: 'A lean, systemic problem-solving approach. Concise, visual analysis focusing on continuous improvement.', standards: 'Lean Problem Solving | Continuous Improvement' }
];

export const TEMPLATE_NAMES: Record<string, string> = TEMPLATES.reduce((acc, t) => {
    acc[t.id] = t.name;
    return acc;
}, {} as Record<string, string>);

export const REQUIRED_FIELDS_MAP = {
    problemTitle: "Problem Title",
    problemStatement: "Problem Statement & Impact",
    rootCause: "Root Cause Identified",
    lessons: "Key Lesson #1",
    immediateAction: "Immediate Action",
    correctiveAction: "Corrective Action",
    systemicAction: "Systemic Improvements",
    validation: "Effectiveness Validation",
    horizontal: "Horizontal Deployment Plan"
};
