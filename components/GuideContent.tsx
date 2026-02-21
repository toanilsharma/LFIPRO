import React from 'react';
import { SECTIONS, TEMPLATES } from '../constants';

const GuideSection: React.FC<{ section: typeof SECTIONS[0]; children: React.ReactNode }> = ({ section, children }) => (
    <section id={section.id} className="mb-16">
        <div className="flex justify-between items-center mb-8 pb-5 border-b-2 border-gray-100">
            <h2 className="text-3xl font-bold flex items-center gap-4" style={{ color: 'var(--primary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {section && <section.icon size={30} strokeWidth={2} />}
                </span>
                {section.name.substring(3)}
            </h2>
        </div>
        {children}
    </section>
);

const ExampleCard: React.FC<{ title: string; goodExample: string; badExample: string; }> = ({ title, goodExample, badExample }) => (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg my-6">
        <h4 className="font-bold text-indigo-800 text-lg mb-4">{title}</h4>
        <div className="text-gray-700 space-y-4">
            <div>
                <strong className="text-red-600 block mb-1">❌ Bad Example:</strong>
                <p className="pl-4 border-l-2 border-red-200">{badExample}</p>
            </div>
            <div>
                <strong className="text-green-600 block mb-1">✅ Good Example:</strong>
                <p className="pl-4 border-l-2 border-green-200">{goodExample}</p>
            </div>
        </div>
    </div>
);

const TipCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-100 transition-all duration-300 hover:border-teal-500 hover:shadow-lg">
        <div className="text-3xl mb-3">{icon}</div>
        <h4 className="font-bold text-lg text-[var(--primary)] mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
    </div>
);


const GuideContent: React.FC = () => {
    return (
        <div>
            <GuideSection section={SECTIONS[0]}>
                <p className="text-lg text-gray-600 mb-6">The structure of your LFI is crucial for clarity and compliance. Different industries use standardized templates to ensure all critical information is captured. Choosing the right one sets the foundation for an effective document.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {TEMPLATES.map(template => (
                        <div key={template.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                            <div className="text-indigo-600 mb-4 bg-gray-50 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">
                                <template.icon size={32} strokeWidth={2} />
                            </div>
                            <div className="text-xl font-bold text-[var(--primary)] mb-2">{template.name}</div>
                            <div className="text-gray-600 text-sm leading-relaxed">{template.description}</div>
                            <div className="mt-4 pt-4 border-t-2 border-gray-100 text-xs font-semibold text-[var(--secondary)]">{template.standards}</div>
                        </div>
                    ))}
                </div>
            </GuideSection>

            <GuideSection section={SECTIONS[1]}>
                <p className="text-lg text-gray-600 mb-6">This is the foundation of your LFI. It must be clear, concise, and factual. A well-written problem statement allows anyone in the organization to understand the issue and its significance without prior context. Focus on the 5 W's: What, When, Where, Who, and the business iMpact.</p>
                <ExampleCard
                    title="✨ Example: Problem Statement"
                    badExample="The paint on some parts was peeling off recently."
                    goodExample="During Q3 2024 (When), 15% of units from Production Line 3 (Where) failed the final paint adhesion test (What), resulting in a $25,000 loss in scrap and rework costs (Impact)."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <TipCard icon="📍" title="Be Specific">Include exact dates, locations, quantities, and metrics. Avoid vague terms like "recently" or "many".</TipCard>
                    <TipCard icon="📈" title="Quantify Impact">Use numbers: costs, time lost, defect rates, customer impact. This makes the problem tangible and justifies action.</TipCard>
                    <TipCard icon="🎯" title="Stay Objective">Describe the facts, not opinions or premature conclusions. The 'why' comes in the root cause section.</TipCard>
                </div>
            </GuideSection>

            <GuideSection section={SECTIONS[2]}>
                <p className="text-lg text-gray-600 mb-6">This is the most critical part of the analysis. A true root cause is almost always a systemic issue—a flaw in a process, procedure, or system—not an individual's mistake. Dig deep until you find a cause that, if fixed, will prevent the problem from ever recurring.</p>
                <ExampleCard
                    title="✨ Example: Root Cause"
                    badExample="The operator installed the wrong sensor."
                    goodExample="The maintenance SOP lacked a verification step to ensure the correct sensor part number was installed. This process gap allowed for human error to go undetected."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <TipCard icon="🏛️" title="System, Not Person">Blaming an individual stops the learning process. Ask, "What system or process allowed this error to occur?"</TipCard>
                    <TipCard icon="🤔" title="Use the '5 Whys'">Continuously ask "Why?" to move from a symptomatic cause to the deep, systemic root cause.</TipCard>
                </div>
            </GuideSection>

            <GuideSection section={SECTIONS[3]}>
                <p className="text-lg text-gray-600 mb-6">A lesson is the core transferable knowledge gained from the incident. It should be a concise, actionable principle that can be applied to other areas of the organization to prevent similar failures.</p>
                <ExampleCard
                    title="✨ Example: Lesson Learned"
                    badExample="Technicians need to be more careful."
                    goodExample="Any modification to a maintenance procedure, even for efficiency, must trigger a mandatory review by Quality Assurance to ensure critical control points are not inadvertently weakened."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <TipCard icon="🌍" title="Make it Transferable">Good lessons can be applied to other areas, processes, or products. Think beyond this specific incident.</TipCard>
                    <TipCard icon="🎓" title="Focus on 'What' Not 'Who'">The lesson should address a systemic gap, not an individual's performance.</TipCard>
                    <TipCard icon="🔄" title="Actionable Insights">Each lesson should clearly imply what should be done differently in the future.</TipCard>
                </div>
            </GuideSection>

            <GuideSection section={SECTIONS[4]}>
                <p className="text-lg text-gray-600 mb-6">Actions turn lessons into reality. They must be clear, specific, and assignable. Use the SMART framework to ensure every action is effective: Specific, Measurable, Assignable, Realistic, and Time-bound.</p>
                <ExampleCard
                    title="✨ Example: Implementation Action"
                    badExample="Fix the maintenance procedure."
                    goodExample="Update Maintenance SOP-M-442 to include a mandatory barcode scan verification for sensor part numbers. Owner: J. Smith. Due: 11/30/2024. Success measured by 100% audit compliance."
                />
                <div className="bg-indigo-50 p-4 rounded-lg mt-6">
                    <h4 className="font-bold text-indigo-800">SMART Checklist</h4>
                    <ul className="list-disc list-inside text-gray-700 mt-2">
                        <li><strong>S</strong>pecific: Is the action clear and unambiguous?</li>
                        <li><strong>M</strong>easurable: Can you quantify the result?</li>
                        <li><strong>A</strong>ssignable: Does it have a clear owner?</li>
                        <li><strong>R</strong>ealistic: Is it achievable?</li>
                        <li><strong>T</strong>ime-bound: Is there a target completion date?</li>
                    </ul>
                </div>
            </GuideSection>

            <GuideSection section={SECTIONS[5]}>
                <p className="text-lg text-gray-600 mb-6">How will you know your fix worked? And where else can you apply this lesson? This section ensures the LFI has a lasting impact beyond the initial problem.</p>
                <h4 className="text-xl font-bold text-gray-800 mt-8 mb-4">Effectiveness Validation</h4>
                <p className="text-gray-600 mb-4">Define specific metrics and a timeline to monitor them. Example: "Monitor Line 3 for sensor-related errors for 90 days. Target: zero occurrences. Review maintenance audit logs weekly for 100% compliance with the new SOP step."</p>

                <h4 className="text-xl font-bold text-gray-800 mt-8 mb-4">Horizontal Deployment</h4>
                <p className="text-gray-600 mb-4">Identify all other similar processes, equipment, or facilities where this same failure could occur. Plan to implement the same corrective actions there. Example: "Audit all 12 production lines for similar maintenance SOP gaps by EOY. Implement the updated verification step globally by the end of Q1 2025."</p>
            </GuideSection>

            <GuideSection section={SECTIONS[6]}>
                <p className="text-lg text-gray-600 mb-6">An LFI is useless if it isn't shared with the right people. Create a clear plan to communicate the lessons to all relevant audiences and make the document easily searchable for future reference.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <TipCard icon="📡" title="Use Multiple Channels">Combine emails, team meetings, and database entries. Don't rely on a single method.</TipCard>
                    <TipCard icon="🎯" title="Target the Audience">Tailor the message for different groups. An operator needs different details than a manager.</TipCard>
                    <TipCard icon="🏷️" title="Use Searchable Tags">Add keywords like "welding," "sensor," "calibration" so others facing similar problems can find your LFI.</TipCard>
                </div>
            </GuideSection>

            <GuideSection section={SECTIONS[7]}>
                <p className="text-lg text-gray-600 mb-6">Before publishing your LFI, run through this final checklist to ensure it meets the highest standards of quality and will be an effective tool for organizational learning.</p>
                <ul className="space-y-3">
                    {['Is the problem statement clear, concise, and quantified?', 'Is the root cause systemic (process-related) rather than personal?', 'Is the main lesson learned transferable to other areas?', 'Are all actions SMART (Specific, Measurable, Assignable, Realistic, Time-bound)?', 'Is there a clear plan to verify the effectiveness of the actions?', 'Have you identified where else to apply this lesson (horizontal deployment)?', 'Is there a distribution plan to share the LFI with all relevant audiences?'].map(item => (
                        <li key={item} className="flex items-start p-4 bg-gray-100 rounded-lg">
                            <span className="text-green-500 font-bold mr-3">✓</span>
                            <span className="text-gray-700">{item}</span>
                        </li>
                    ))}
                </ul>
            </GuideSection>
        </div>
    );
};

export default GuideContent;
