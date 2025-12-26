'use client'
import { useState, useEffect } from 'react';
import { Github, ArrowUpRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    imageUrl: string;
    githubUrl: string;
}

const ProjectShowcase = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // เปลี่ยนจาก supabase.from... เป็นการ fetch API ที่เราสร้าง
                const res = await fetch('admin/api/Projects');

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await res.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    //ฟังก์ชันเปลี่ยนโปรเจกต์ (วนลูปกลับมาเริ่มใหม่ได้)
    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    };

    // ถ้าโหลดอยู่ ให้แสดง Loading
    if (loading) {
        return <div className="min-h-screen bg-[#161618] flex items-center justify-center text-white"><Loader2 className="animate-spin w-10 h-10" /></div>;
    }

    // ถ้าไม่มีข้อมูล
    if (projects.length === 0) {
        return <div className="min-h-screen bg-[#161618] flex items-center justify-center text-white">ไม่พบข้อมูลโปรเจกต์</div>;
    }

    const currentProject = projects[currentIndex];

    return (
        <div className="min-h-screen bg-[#161618] text-white flex items-center justify-center p-8">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* --- Left Content Section --- */}
                <div className="space-y-6 animate-in fade-in duration-500" key={currentProject.id}> {/* key ช่วยให้เกิด Animation เมื่อเปลี่ยนข้อมูล */}
                    {/* Number: ใช้ Index + 1 และเติม 0 ข้างหน้า */}
                    <h2
                        className="text-8xl font-bold text-transparent select-none"
                        style={{ WebkitTextStroke: '1px white' }}
                    >
                        {String(currentIndex + 1).padStart(2, '0')}
                    </h2>

                    <h3 className="text-4xl font-mono font-bold tracking-wide">
                        {currentProject.title}
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed max-w-md font-mono">
                        {currentProject.description}
                    </p>

                    <p className="text-[#4ade80] font-mono text-lg">
                        {/* เช็คว่า techstack เป็น Array หรือไม่ ถ้าใช่ให้ join ด้วย comma */}
                        {Array.isArray(currentProject.techStack)
                            ? currentProject.techStack.join(', ')
                            : currentProject.techStack}
                    </p>

                    <div className="h-px w-full bg-gray-800 my-8"></div>
                    
                    {/* Action Buttons: เช็คว่ามีลิ้งค์ไหม ถ้าไม่มีให้ disable หรือซ่อน */}
                    <div className="flex gap-4">
                        {currentProject.liveUrl && (
                            <a
                                href={currentProject.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-14 h-14 rounded-full bg-[#2a2a2c] flex items-center justify-center hover:bg-[#4ade80] hover:text-black transition-all duration-300 group"
                            >
                                <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black" />
                            </a>
                        )}

                        {currentProject.githubUrl && (
                            <a
                                href={currentProject.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="w-14 h-14 rounded-full bg-[#2a2a2c] flex items-center justify-center hover:bg-[#4ade80] hover:text-black transition-all duration-300 group"
                            >
                                <Github className="w-6 h-6 text-white group-hover:text-black" />
                            </a>
                        )}
                    </div>
                </div>
                {/* --- Right Image Section --- */}
                <div className="relative">
                    <div className="absolute inset-0 bg-[#C8A27A] transform translate-x-4 translate-y-4 -z-10 rounded-lg hidden lg:block"></div>
                    <div className="p-2 rounded-lg shadow-2xl overflow-hidden relative h-[400px]">
                        {/* ใส่ h-fix หรือ aspect ratio เพื่อไม่ให้ layout กระโดดเวลารูปขนาดไม่เท่ากัน */}
                        <img
                            src={currentProject.imageUrl || "/api/placeholder/600/400"}
                            alt={currentProject.title}
                            className="w-full h-full object-cover rounded transition-opacity duration-300"
                        />
                    </div>
                    {/* Controls: Slider*/}
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 bg-[#00dc82] flex items-center justify-center hover:bg-[#00c070] transition-colors active:scale-95 rounded"
                        >
                            <ChevronLeft className="w-6 h-6 text-black" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 bg-[#00dc82] flex items-center justify-center hover:bg-[#00c070] transition-colors active:scale-95 rounded"
                        >
                            <ChevronRight className="w-6 h-6 text-black" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
};
export default ProjectShowcase

