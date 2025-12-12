import { prisma } from '@/src/lib/prisma'
import { deleteProject } from '@/src/app/admin/actions' // server action ที่เราเขียนไว้
import Image from 'next/image'
import { Plus, Github, ExternalLink, Trash2 } from 'lucide-react'
import AddProject from '@/src/components/admin/AddProject'
import  EditProject  from '@/src/components/admin/EditProject'

// บังคับโหลดข้อมูลใหม่เสมอ ไม่จำ Cache
export const dynamic = 'force-dynamic'

export default async function ManageProjects() {
    // 1. ดึงข้อมูล Projects ทั้งหมด ล่าสุดขึ้นก่อน
    const projects = await prisma.project.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* --- Header & ปุ่ม Add --- */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">จัดการโปรเจค (Manage Projects)</h1>
                        <p className="text-gray-500">รายการผลงานทั้งหมดของคุณ</p>
                    </div>
                    {/* เปลี่ยนจาก Modal เป็น Link ไปหน้า Add ที่เราทำไว้ */}
                    <AddProject />
                </div>

                {/* --- ตาราง/รายการ Projects --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Header ของตาราง (ซ่อนในมือถือ) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-500 font-medium text-sm border-b">
                        <div className="col-span-2 text-center">Image</div>
                        <div className="col-span-4">Project Details</div>
                        <div className="col-span-3">Tech Stack</div>
                        <div className="col-span-2">Links</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>

                    {/* รายการ Project (Loop) */}
                    {projects.length === 0 ? (
                        <div className="p-10 text-center text-gray-400">ยังไม่มีข้อมูลโปรเจค</div>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b last:border-0 items-center hover:bg-gray-50 transition"
                            >

                                {/* 1. Image (ปรับจาก Icon เป็นรูปภาพ) */}
                                <div className="col-span-2 flex justify-center">
                                    <div className="relative w-24 h-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                                        {project.imageUrl ? (
                                            <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-xs text-gray-400">No Img</div>
                                        )}
                                    </div>
                                </div>

                                {/* 2. ชื่อและรายละเอียด Project */}
                                <div className="col-span-4">
                                    <h3 className="font-bold text-gray-800 text-lg md:text-base mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 pr-4">
                                        {project.description}
                                    </p>
                                    <span className="text-xs text-gray-300 md:hidden block mt-1">
                                        ID: {project.id}
                                    </span>
                                </div>

                                {/* 3. Tech Stack (ปรับจาก Category) */}
                                <div className="col-span-3">
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Links (ปรับจาก Proficiency) */}
                                <div className="col-span-2">
                                    <div className="flex gap-2">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl} target="_blank"
                                                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                                                title="Live Website"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl} target="_blank"
                                                className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition"
                                                title="Source Code"
                                            >
                                                <Github size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* 5. ปุ่มลบ (ใช้ Form Action ตามต้นฉบับ) */}
                                <div className="col-span-1 flex md:justify-end justify-start mt-2 md:mt-0 gap-2">
                                    {/* (ถ้ามีปุ่ม Edit ก็ใส่ตรงนี้) */}
                                    <EditProject project={{
                                        id: project.id,
                                        title: project.title,
                                        description: project.description,
                                        techStack: project.techStack,
                                        liveUrl: project.liveUrl,
                                        githubUrl: project.githubUrl,
                                        imageUrl: project.imageUrl
                                    }} />  
                                 {/* Form Action Delete */}
                                    <form
                                        action={async () => {
                                            'use server'
                                            await deleteProject(project.id)
                                        }}
                                    >
                                        <button
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg text-sm font-medium transition border border-transparent hover:border-red-200 flex items-center justify-center"
                                            type="submit"
                                            title="Delete"
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
                    ทั้งหมด {projects.length} รายการ
                </div>

            </div>
        </div>
    )
}