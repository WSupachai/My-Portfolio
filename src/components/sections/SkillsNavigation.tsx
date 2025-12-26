'use client'
import { useState } from "react"
import { LucideIcon, Layout, Server, Database, Boxes } from 'lucide-react';
import SkillIcon from '@/src/components/ui/SkillIcon'

type Skill = {
    id: number
    name: string
    category: string
}

const SkillsByCategory = () => {
    const [skills, setSkills] = useState<Skill[]>([])
    const [loading, setLoading] = useState(false)

    const [currentTab, setCurrentTab] = useState<string>('home');

    const loadSkills = async (category: string) => {
        setLoading(true)
        const res = await fetch(`/admin/api/Skills/?category=${category}`)
        const data = await res.json()
        setSkills(data)
        setLoading(false)
    }

    const handleClick = (category: "Frontend" | "Backend" | "Database" | "DevOps") => {
        setCurrentTab(category)
        loadSkills(category)
    }

    return (
        <div className="min-h-screen p-4 md:p-12 relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-4 space-y-4">
                    <h2 className="text-4xl font-extrabold mb-6 leading-tight text-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff99] to-blue-500">
                            Why hire me?
                        </span>
                    </h2>

                    <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-center text-base md:text-lg leading-relaxed">
                        Constantly learning, constantly creating.
                        <br className="hidden md:block" /> 
                        These are the <span className="text-[#00ff99] font-medium">technologies</span> I use to bring ideas to life.
                    </p>

                <NavButton
                    label="Frontend"
                    icon={<Layout size={20} />}
                    active={currentTab === 'Frontend'}
                    onClick={() => handleClick("Frontend")}
                />
                <NavButton
                    label="Backend"
                    icon={<Server size={20} />}
                    active={currentTab === 'Backend'}
                    onClick={() => handleClick('Backend')}
                />
                <NavButton
                    label="Database"
                    icon={<Layout size={20} />}
                    active={currentTab === 'Database'}
                    onClick={() => handleClick('Database')}
                />
                <NavButton
                    label="DevOps"
                    icon={<Boxes size={20} />}
                    active={currentTab === 'DevOps'}
                    onClick={() => handleClick('DevOps')}
                />
            </div>
            {/* Content Area */}
            <div className="lg:col-span-8 bg-[#232329] p-8 rounded-2xl border border-gray-800 min-h-[500px]">
                <div className="animate-fade-in">
                    <h3 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-4">Technical Skills</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {skills.length === 0 ? (
                            <p className="text-gray-500 italic">No skills added yet.</p>
                        ) : (
                            skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="group relative bg-[#1c1c22] p-6 rounded-2xl border border-gray-800 hover:border-[#00ff99] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_-10px_rgba(0,255,153,0.3)]"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-2">
                                            <h4 className="font-bold text-xl text-white group-hover:text-[#00ff99] transition-colors duration-300">
                                                {skill.name}
                                            </h4>
                                            <span className="text-xs text-gray-500">
                                                {skill.category}
                                            </span>
                                        </div>
                                        <div className="p-3 rounded-xl group-hover:bg-[#00ff99]/10 gittransition-colors duration-300">
                                            <SkillIcon
                                                name={skill.name}
                                                className="text-4xl text-gray-500 group-hover:text-[#00ff99] transition-colors duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div >
    )
}
export default SkillsByCategory

interface NavButtonProps {
    active: boolean;          // สถานะว่าถูกเลือกอยู่หรือไม่ (true/false)
    onClick: () => void;      // ฟังก์ชันสำหรับกดปุ่ม (void เพราะไม่ต้อง return ค่า)
    label: string;            // ข้อความบนปุ่ม
    icon: React.ReactNode;    // Type นี้ครอบคลุมทั้ง Icon Component, SVG, หรือแม้แต่ <span>
}

const NavButton = ({ active, onClick, label, icon }: NavButtonProps) => (
    <button
        onClick={onClick}
        className={`w-full text-left px-6 py-4 rounded-xl flex items-center gap-4 transition-all duration-300 
            ${active
                ? 'bg-[#00ff99] text-black font-bold shadow-[0_0_15px_rgba(0,255,153,0.3)]'
                : 'bg-[#232329] text-gray-400 hover:bg-[#2a2a31] hover:text-white'
            }`}
    >
        {icon}
        {label}
    </button>
);
