import { Github, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectSlider from "@/src/components/sections/ProjectSlider"


export default async function SkillsSection() {
    return (
        <div className="min-h-screen bg-[#161618] text-white flex items-center justify-center p-8">
            <ProjectSlider/>
        </div>
    )
}