import React from 'react';
import { motion } from 'framer-motion';
import { SECTIONS, TEMPLATES } from '../constants';
import { BookOpen, XCircle, CheckCircle2, ChevronRight, Hash, Network, Shuffle, Target, Zap, ShieldCheck, Globe, UserX, Share2, Users, Tags } from 'lucide-react';

const GuideSection: React.FC<{ section: typeof SECTIONS[0]; children: React.ReactNode; index: number }> = ({ section, children, index }) => (
    <motion.section
        id={section.id}
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
    >
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-xl text-primary dark:text-indigo-400">
                {section && <section.icon size={28} strokeWidth={2.5} />}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
                {index + 1}. {section.name.substring(3).trim()}
            </h2>
        </div>
        <div className="text-gray-700 dark:text-gray-300 space-y-8">
            {children}
        </div>
    </motion.section>
);

const ExampleCard: React.FC<{ title: string; goodExample: string; badExample: string; }> = ({ title, goodExample, badExample }) => (
    <div className="my-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <BookOpen size={20} className="text-indigo-500" />
            <h4 className="font-bold text-gray-800 dark:text-gray-200">{title}</h4>
        </div>
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800">
            <div className="p-6 bg-red-50/50 dark:bg-red-950/20">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold mb-3">
                    <XCircle size={20} />
                    <span>Poor Example</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">"{badExample}"</p>
            </div>
            <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-3">
                    <CheckCircle2 size={20} />
                    <span>World-Class Example</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">"{goodExample}"</p>
            </div>
        </div>
    </div>
);

const TipCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
            {icon}
        </div>
        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{children}</p>
    </div>
);


const GuideContent: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto pb-12">
            <GuideSection index={0} section={SECTIONS[0]}>
                <p className="text-lg md:text-left leading-relaxed">
                    The structure of your LFI is crucial for clarity and compliance. Different industries use standardized templates to ensure all critical information is captured. Choosing the right one sets the foundation for an effective document.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {TEMPLATES.map(template => (
                        <div key={template.id} className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-colors group">
                            <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-900 text-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <template.icon size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{template.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-left leading-relaxed mb-4">{template.description}</p>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                                {template.standards}
                            </div>
                        </div>
                    ))}
                </div>
            </GuideSection>

            <GuideSection index={1} section={SECTIONS[1]}>
                <p className="text-lg md:text-left leading-relaxed">
                    This is the foundation of your LFI. It must be clear, concise, and factual. A well-written problem statement allows anyone in the organization to understand the issue and its significance without prior context. Focus on the 5 W's: What, When, Where, Who, and the business iMpact.
                </p>
                <ExampleCard
                    title="Drafting the Problem Statement"
                    badExample="The paint on some parts was peeling off recently."
                    goodExample="During Q3 2024 (When), 15% of units from Production Line 3 (Where) failed the final paint adhesion test (What), resulting in a $25,000 loss in scrap and rework costs (Impact)."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TipCard icon={<Target size={24} />} title="Be Specific">Include exact dates, locations, quantities, and metrics. Avoid vague terms like "recently" or "many".</TipCard>
                    <TipCard icon={<Hash size={24} />} title="Quantify Impact">Use numbers: costs, time lost, defect rates, customer impact. This makes the problem tangible and justifies action.</TipCard>
                    <TipCard icon={<ShieldCheck size={24} />} title="Stay Objective">Describe the facts, not opinions or premature conclusions. The 'why' comes in the root cause section.</TipCard>
                </div>
            </GuideSection>

            <GuideSection index={2} section={SECTIONS[2]}>
                <p className="text-lg md:text-left leading-relaxed">
                    This is the most critical part of the analysis. A true root cause is almost always a systemic issue—a flaw in a process, procedure, or system—not an individual's mistake. Dig deep until you find a cause that, if fixed, will prevent the problem from ever recurring.
                </p>
                <ExampleCard
                    title="Identifying Systemic Root Causes"
                    badExample="The operator installed the wrong sensor."
                    goodExample="The maintenance SOP lacked a verification step to ensure the correct sensor part number was installed. This process gap allowed human error to occur undetected."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TipCard icon={<Network size={24} />} title="System, Not Person">Blaming an individual stops the learning process. Ask, "What system or process allowed this error to occur?"</TipCard>
                    <TipCard icon={<Shuffle size={24} />} title="Use the '5 Whys'">Continuously ask "Why?" to move from a symptomatic cause to the deep, systemic root cause.</TipCard>
                </div>
            </GuideSection>

            <GuideSection index={3} section={SECTIONS[3]}>
                <p className="text-lg md:text-left leading-relaxed">
                    A lesson is the core transferable knowledge gained from the incident. It should be a concise, actionable principle that can be applied to other areas of the organization to prevent similar failures.
                </p>
                <ExampleCard
                    title="Formulating Lessons Learned"
                    badExample="Technicians need to be more careful."
                    goodExample="Any modification to a maintenance procedure, even for efficiency, must trigger a mandatory review by Quality Assurance to ensure critical control points remain intact."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TipCard icon={<Globe size={24} />} title="Make it Transferable">Good lessons can be applied to other areas, processes, or products. Think beyond this specific incident.</TipCard>
                    <TipCard icon={<UserX size={24} />} title="Focus on 'What' Not 'Who'">The lesson should address a systemic gap, not an individual's performance.</TipCard>
                    <TipCard icon={<Zap size={24} />} title="Actionable Insights">Each lesson should clearly imply what should be done differently in the future.</TipCard>
                </div>
            </GuideSection>

            <GuideSection index={4} section={SECTIONS[4]}>
                <p className="text-lg md:text-left leading-relaxed">
                    Actions turn lessons into reality. They must be clear, specific, and assignable. Use the SMART framework to ensure every action is effective: Specific, Measurable, Assignable, Realistic, and Time-bound.
                </p>
                <ExampleCard
                    title="Defining Corrective Actions"
                    badExample="Fix the maintenance procedure."
                    goodExample="Update Maintenance SOP-M-442 to include a mandatory barcode scan verification for sensor part numbers. Owner: J. Smith. Due: 11/30/2024. Success measured by 100% audit compliance."
                />
                <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 mt-8">
                    <h4 className="font-bold text-indigo-800 dark:text-indigo-400 flex items-center gap-2 mb-4">
                        <CheckCircle2 size={20} />
                        The SMART Checklist
                    </h4>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2"><ChevronRight className="text-indigo-500 shrink-0 mt-0.5" size={18} /> <strong>Specific:</strong> Is the action clear and unambiguous?</li>
                        <li className="flex items-start gap-2"><ChevronRight className="text-indigo-500 shrink-0 mt-0.5" size={18} /> <strong>Measurable:</strong> Can you quantify the result?</li>
                        <li className="flex items-start gap-2"><ChevronRight className="text-indigo-500 shrink-0 mt-0.5" size={18} /> <strong>Assignable:</strong> Does it have a clear owner?</li>
                        <li className="flex items-start gap-2"><ChevronRight className="text-indigo-500 shrink-0 mt-0.5" size={18} /> <strong>Realistic:</strong> Is it practically achievable?</li>
                        <li className="flex items-start gap-2"><ChevronRight className="text-indigo-500 shrink-0 mt-0.5" size={18} /> <strong>Time-bound:</strong> Is there a target completion date?</li>
                    </ul>
                </div>
            </GuideSection>

            <GuideSection index={5} section={SECTIONS[5]}>
                <p className="text-lg md:text-left leading-relaxed">
                    How will you know your fix worked? And where else can you apply this lesson? This section ensures the LFI has a lasting impact beyond the initial problem.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <ShieldCheck size={24} className="text-green-500" /> Effectiveness Validation
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-green-500 pl-4 py-2 bg-gray-50 dark:bg-gray-800/50">
                            "Monitor Line 3 for sensor-related errors for 90 days. Target: zero occurrences. Review maintenance audit logs weekly for 100% compliance with the new SOP step."
                        </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                            <Network size={24} className="text-blue-500" /> Horizontal Deployment
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 dark:bg-gray-800/50">
                            "Audit all 12 production lines for similar maintenance SOP gaps by EOY. Implement the updated verification step globally by the end of Q1 2025."
                        </p>
                    </div>
                </div>
            </GuideSection>

            <GuideSection index={6} section={SECTIONS[6]}>
                <p className="text-lg md:text-left leading-relaxed">
                    An LFI is useless if it isn't shared with the right people. Create a clear plan to communicate the lessons to all relevant audiences and make the document easily searchable for future reference.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <TipCard icon={<Share2 size={24} />} title="Use Multiple Channels">Combine emails, team meetings, and database entries. Don't rely on a single method.</TipCard>
                    <TipCard icon={<Users size={24} />} title="Target the Audience">Tailor the message for different groups. An operator needs different details than a manager.</TipCard>
                    <TipCard icon={<Tags size={24} />} title="Use Searchable Tags">Add keywords like 'process', 'software', 'human-factors' so others facing similar problems can find your LFI.</TipCard>
                </div>
            </GuideSection>

            <GuideSection index={7} section={SECTIONS[7]}>
                <p className="text-lg md:text-left leading-relaxed border-l-4 border-emerald-500 pl-4 mb-8 italic text-gray-600 dark:text-gray-400">
                    Before publishing your LFI, run through this final checklist to ensure it meets the highest standards of quality and will be an effective tool for organizational learning.
                </p>
                <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <h4 className="font-bold tracking-widest uppercase text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            Final Review Checklist
                        </h4>
                    </div>
                    <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                            'Is the problem statement clear, concise, and quantified?',
                            'Is the root cause systemic (process-related) rather than personal?',
                            'Is the main lesson learned transferable to other areas?',
                            'Are all actions SMART (Specific, Measurable, Assignable, Realistic, Time-bound)?',
                            'Is there a clear plan to verify the effectiveness of the actions?',
                            'Have you identified where else to apply this lesson (horizontal deployment)?',
                            'Is there a distribution plan to share the LFI with all relevant audiences?'
                        ].map((item, i) => (
                            <li key={i} className="flex items-start p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5 mr-4" size={20} />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </GuideSection>
        </div>
    );
};

export default GuideContent;
