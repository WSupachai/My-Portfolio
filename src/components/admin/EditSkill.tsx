'use client'
import { useState } from 'react'
import { updateSkill } from '@/src/app/admin/actions' // import action update 
import {  Pencil } from 'lucide-react'

// 1. รับ props "skill" เข้ามา (ใส่ type any ไปก่อนเพื่อความง่าย หรือใส่ type จริงถ้ามี)
export default function EditSkillModal({ skill }: { skill: any }) {
    const [isOpen, setIsOpen] = useState(false)
    const [proficiency, setProficiency] = useState(skill.proficiency) // ใช้ค่าเดิมเป็นค่าเริ่มต้น

    // ฟังก์ชันปิด Modal
    const closeModal = () => setIsOpen(false)

    // ใช้ .bind เพื่อผูก ID ของตัวนี้เข้ากับ Action
    const updateWithId = updateSkill.bind(null, skill.id)

    return (
        <>
            {/* ปุ่มกด Edit (วางไว้หน้าแรก) */}
            <button
                onClick={() => setIsOpen(true)}
                className="mr-1 text-yellow-500 hover:text-yellow-700 hover:bg-yellow-50 px-4 py-2 rounded-lg text-sm font-medium transition border border-yellow-200 hover:border-yellow-300 flex items-center gap-1 "
            >
                < Pencil size={18} />
            </button>

            {/* ตัว Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">

                        <h3 className="text-xl font-bold mb-4 text-amber-500">แก้ไข: {skill.name}</h3>

                        <form
                            action={async (formData) => {
                                await updateWithId(formData)
                                closeModal()
                            }}
                        >
                            {/* ชื่อ Skill (ใส่ defaultValue คือค่าเดิม) */}
                            <div className="mb-4">
                                <label className="block text-sm text-gray-700 mb-1">Skill Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={skill.name} // 👈 สำคัญ! โชว์ค่าเดิม
                                    className="w-full border p-2 rounded text-gray-950"
                                />
                            </div>

                            {/* หมวดหมู่ (ใส่ defaultValue) */}
                            <div className="mb-4">
                                <label className="block text-sm text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    defaultValue={skill.category} // 👈 สำคัญ! เลือกค่าเดิมให้
                                    className="w-full border p-2 rounded text-gray-950"
                                >
                                    <option className="text-gray-950" value="Frontend">Frontend</option>
                                    <option className="text-gray-950" value="Backend">Backend</option>
                                    <option className="text-gray-950" value="Database">Database</option>
                                    <option className="text-gray-950" value="DevOps">DevOps</option>
                                    <option className="text-gray-950" value="Framework">Framework</option>
                                    <option className="text-gray-950" value="ORM">ORM</option>
                                </select>
                            </div>

                            {/* หลอดพลัง */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-1 ">
                                    <span className="text-gray-700">Proficiency</span>
                                    <span className="text-blue-600 font-bold">{proficiency}%</span>
                                </div>
                                <input
                                    type="range" name="proficiency" min="0" max="100"
                                    value={proficiency} // ใช้ State ที่เริ่มจากค่าเดิม
                                    onChange={(e) => setProficiency(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-red-500 hover:bg-red-100 rounded">
                                    ยกเลิก
                                </button>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                    บันทึก
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    )
}