import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cog, Building2, ClipboardCheck, Wrench, Users, Briefcase } from 'lucide-react';

const roles = [
    { icon: <ShieldCheck size={28} />, title: "Safety & Compliance", color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-500/20" },
    { icon: <Briefcase size={28} />, title: "Operations Leaders", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/20" },
    { icon: <Building2 size={28} />, title: "Department Managers", color: "text-violet-500", bg: "bg-violet-100 dark:bg-violet-500/20" },
    { icon: <ClipboardCheck size={28} />, title: "Quality Teams", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/20" },
    { icon: <Users size={28} />, title: "HR & Training", color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-500/20" },
];

const WhoThisIsFor: React.FC = () => {
    return (
        <section className="py-10">
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
                    Built For Every Team
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Designed for anyone responsible for turning incidents into lasting improvements — in any industry, any business.
                </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {roles.map((role, idx) => (
                    <motion.div
                        key={idx}
                        className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md hover:shadow-lg hover:border-primary/40 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${role.bg} ${role.color}`}>
                            {role.icon}
                        </div>
                        <span className="font-bold text-gray-800 dark:text-gray-200 text-center text-sm">{role.title}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhoThisIsFor;
