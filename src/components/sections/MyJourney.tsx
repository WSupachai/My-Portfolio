'use client'
import { useState } from "react"
import { Briefcase, GraduationCap } from 'lucide-react';
const MyJourney = () => {
    const [activeTab, setActiveTab] = useState('experience');

    const experience = [
        {
            year: "2023-Present",
            role: "Programmer",
            institution: "Better World Green Public Company Limited",
            desc: "VB.NET and C# Developer building web applications with .NET MVC."
        },
        {
            year: "2023",
            role: "Web Developer",
            institution: "NEXILAR CO., LTD",
            desc: "Frontend Developer building web applications with Next.js."
        }
    ]

    const education = [
        {
            year: "2019 - 2022",
            role: "B.Eng. (Computer Engineering)",
            institution: "University of Phayao",
            desc: "Major in Computer Engineering"
        }
    ]

    return (
        <section>
            <div className="flex flex-col md:flex-row items-center mb-10 gap-6 mt-10">
                <h2 className="text-3xl font-bold border-l-4 border-[#00ff99] pl-4">
                    My Journey
                </h2>
                <div className="flex bg-[#232329] p-1 rounded-full">
                    <button
                        onClick={() => setActiveTab('experience')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'experience'
                            ? 'bg-[#00ff99] text-black font-bold'
                            : 'text-white hover:text-[#00ff99]'
                            }`}
                    >
                        <Briefcase size={18} /> Experience
                    </button>
                    <button
                        onClick={() => setActiveTab('education')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 ${activeTab === 'education'
                            ? 'bg-[#00ff99] text-black font-bold'
                            : 'text-white hover:text-[#00ff99]'
                            }`}
                    >
                        <GraduationCap size={18} /> Education
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
                {(activeTab === 'experience' ? experience : education).map((item, index) => (
                    <div key={index}
                        className="bg-[#232329] p-6 rounded-xl hover:bg-[#2e2e36] transition-all duration-300 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-2 h-2 bg-[#00ff99] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="text-[#00ff99] font-mono text-sm font-bold mb-2 block">
                            {item.year}
                        </span>
                        <h3 className="text-xl font-bold mb-1 text-white group-hover:text-[#00ff99] transition-colors">
                            {item.role }
                        </h3>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff99]"></span>
                            <p className="text-gray-400 text-sm">{item.institution }</p>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))
                }
            </div>
        </section>




    )
}
export default MyJourney