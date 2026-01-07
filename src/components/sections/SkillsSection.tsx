import SkillsNav from '@/src/components/sections/SkillsNavigation'

export default async function SkillsSection() {
    return (
        <div className={`min-h-screen bg-[#0D0D0D] text-white font-mono selection:bg-[#00ff99] selection:text-black `} >
            <SkillsNav />
        </div>
    )
}







