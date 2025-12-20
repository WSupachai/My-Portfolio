import { PrismaClient } from '@prisma/client'
import { deleteSkill } from '@/src/app/admin/actions' // server action ที่เราเขียนไว้
import SkillIcon from '@/src/components/ui/SkillIcon' // component ไอคอน
import AddSkillModal from '@/src/components/admin/AddSkills'
import EditSkillModal from '@/src/components/admin/EditSkill'
import { Github, ExternalLink, Trash2 } from 'lucide-react'

const prisma = new PrismaClient()

export default async function ManageSkills() {
    // 1. ดึงข้อมูล Skills ทั้งหมด ล่าสุดขึ้นก่อน
    const skills = await prisma.skills.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">

                {/* --- Header & ปุ่ม Add --- */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">จัดการสกิล (Manage Skills)</h1>
                        <p className="text-gray-500">รายการทักษะทั้งหมดของคุณ</p>
                    </div>
                    <AddSkillModal />
                </div>

                {/* --- ตาราง/รายการ Skills --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Header ของตาราง (ซ่อนในมือถือ) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-500 font-medium text-sm border-b">
                        <div className="col-span-1 text-center">Icon</div>
                        <div className="col-span-4">Skill Name</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-3">Proficiency</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* รายการ Skill (Loop) */}
                    {skills.length === 0 ? (
                        <div className="p-10 text-center text-gray-400">ยังไม่มีข้อมูลสกิล</div>
                    ) : (
                        skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b last:border-0 items-center hover:bg-gray-50 transition"
                            >

                                {/* 1. Icon (ใช้ Component ที่เราสร้าง) */}
                                <div className="col-span-1 flex justify-center">
                                    <SkillIcon
                                        name={skill.name}
                                        className="text-3xl text-gray-700"
                                    />
                                </div>

                                {/* 2. ชื่อ Skill */}
                                <div className="col-span-4">
                                    <h3 className="font-bold text-gray-800 text-lg md:text-base">
                                        {skill.name}
                                    </h3>
                                    {/* แสดงวันที่สร้าง (Optional) */}
                                    <span className="text-xs text-gray-400 md:hidden">
                                        ID: {skill.id}
                                    </span>
                                </div>

                                {/* 3. หมวดหมู่ */}
                                <div className="col-span-2">
                                    <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${skill.category === 'Frontend' ? 'bg-blue-100 text-blue-800' : ''}
                    ${skill.category === 'Backend' ? 'bg-green-100 text-green-800' : ''}
                    ${skill.category === 'Database' ? 'bg-purple-100 text-purple-800' : ''}
                    ${skill.category === 'Framework' ? 'bg-orange-100 text-orange-800' : ''}
                    ${skill.category === 'ORM' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                                        {skill.category || 'General'}
                                    </span>
                                </div>

                                {/* 4. หลอดพลัง */}
                                <div className="col-span-3">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Level</span>
                                        <span>{skill.proficiency}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${skill.proficiency}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* 5. ปุ่มลบ (ใช้ Server Action) */}
                                <div className="col-span-2 flex md:justify-end justify-start mt-2 md:mt-0">
                                    <EditSkillModal skill={skill} /> {/*วางปุ่ม Edit ตรงนี้ และส่ง skill ตัวปัจจุบันเข้าไป */}
                                    <form action={deleteSkill.bind(null, skill.id)}>
                                        <button
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition border border-red-200 hover:border-red-300 flex items-center gap-1"
                                            type="submit"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </div>

                            </div>
                        ))
                    )}
                </div>

                {/* Footer สรุป */}
                <div className="mt-4 text-right text-gray-400 text-sm">
                    ทั้งหมด {skills.length} รายการ
                </div>

            </div>
        </div>
    )
}