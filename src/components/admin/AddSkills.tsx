'use client'
import { useState, useRef} from "react"
import {addSkills } from '@/src/app/admin/actions'

//ส่วนที่ 1: ตัวฟอร์ม
function AddSkillForm ({onSuccess}:{onSuccess: () => void}){
  const [proficiency, setProficiency] = useState(50)
    const formRef = useRef<HTMLFormElement>(null)

    // สร้างฟังก์ชันมาคั่นกลาง เพื่อสั่งรีเซ็ตค่าและปิด Modal
    async function handleSubmit(formData: FormData) {
        // 1. เรียก Server Action
        await addSkills(formData)
        
        // 2. รีเซ็ตค่าในฟอร์ม
        setProficiency(50)
        formRef.current?.reset()

        // 3. สั่งปิด Modal (เรียกฟังก์ชันที่แม่ส่งมา)
        onSuccess()
    }

     return (
        <form
            ref={formRef}
            action={handleSubmit} // เปลี่ยนมาใช้ function คั่นกลางแทน
            className="bg-white p-2 w-full" 
        >
            {/* 1. Skill Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g. React, NextJs"
                    required
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
                />
            </div>
            
            {/* 2. Category */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    name="category"
                    className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-950 focus:ring-2 focus:ring-blue-500"
                >
                    <option className="text-gray-950" value="Frontend">Frontend</option>
                    <option className="text-gray-950" value="Backend">Backend</option>
                    <option className="text-gray-950" value="Database">Database</option>
                    <option className="text-gray-950" value="DevOps">DevOps</option>
                    <option className="text-gray-950" value="Framework">Framework</option>
                    <option className="text-gray-950" value="ORM">ORM</option>
                </select>
            </div>
            
            {/* 3. Proficiency */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-700">Proficiency</label>
                    <span className="text-blue-600 font-bold text-lg">{proficiency}%</span>
                </div>
                <input
                    type="range"
                    name="proficiency"
                    min="0"
                    max="100"
                    value={proficiency}
                    onChange={(e) => setProficiency(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                </div>
            </div>
            
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Save Skill
            </button>
        </form>
    )
}

//ส่วนที่ 2: ตัว Modal หลัก (Wrapper)
export default function AddSkillModal() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* ปุ่มกดเพื่อเปิด Modal */}
            <button 
                onClick={() => setIsOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition font-medium flex items-center gap-2"
            >
                + เพิ่มสกิลใหม่
            </button>

            {/* ส่วนแสดงผล Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200">
                        
                        {/* Header ของ Modal */}
                        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">Add New Skill</h3>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1 transition"
                            >
                                {/* ไอคอน X */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>

                        {/* Body ของ Modal (เรียกใช้ฟอร์มด้านบน) */}
                        <div className="p-4">
                            {/* ส่งฟังก์ชันปิด Modal ไปให้ฟอร์มใช้ตอนบันทึกเสร็จ */}
                            <AddSkillForm onSuccess={() => setIsOpen(false)} />
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}




