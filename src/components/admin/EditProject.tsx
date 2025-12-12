'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/src/lib/supabase'
import { updateProject } from '@/src/app/admin/actions' // เรียกใช้ updateProject
import { Loader2, CloudUpload, X, Pencil } from 'lucide-react'

// กำหนด Type ของข้อมูลที่รับเข้ามา
interface ProjectProps {
  id: number
  title: string
  description: string | null
  techStack: string[]
  liveUrl: string | null
  githubUrl: string | null
  imageUrl: string | null
}

export default function EditProjectModal({ project }: { project: ProjectProps }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // ตั้งค่าเริ่มต้นจากข้อมูลเดิม (Project ที่รับเข้ามา)
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description || '',
    techStack: project.techStack.join(', '), // แปลง Array กลับเป็น String คั่นคอมม่า
    liveUrl: project.liveUrl || '',
    githubUrl: project.githubUrl || '',
  })

  // เก็บ URL รูปเดิมไว้ใช้งานถ้า User ไม่เปลี่ยนรูป
  const [currentImageUrl, setCurrentImageUrl] = useState(project.imageUrl)
  
  // State สำหรับรูปใหม่ (ถ้ามีการอัปโหลด)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(project.imageUrl) // เริ่มต้นด้วยรูปเดิม

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImageFile(file)
      setImagePreview(URL.createObjectURL(file)) // โชว์พรีวิวรูปใหม่
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let finalImageUrl = currentImageUrl || ''

      // 1. ถ้ามีการเลือกรูปใหม่ -> อัปโหลดขึ้น Supabase
      if (newImageFile) {
        const fileName = `${Date.now()}-${newImageFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, newImageFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName)
        
        finalImageUrl = urlData.publicUrl
      }

      // 2. เรียก Server Action "updateProject"
      const result = await updateProject({
        id: project.id, // อย่าลืมส่ง ID ไปด้วย
        ...formData,
        imageUrl: finalImageUrl,
      })

      if (result.success) {
        alert('แก้ไขข้อมูลสำเร็จ!')
        setIsOpen(false)
      } else {
        alert(result.message)
      }

    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ปุ่มเปิด Modal (Icon ดินสอ) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-yellow-500 hover:text-yellow-700 hover:bg-yellow-50 p-2 rounded-lg transition border border-transparent hover:border-yellow-200 flex items-center justify-center"
        title="Edit"
      >
        <Pencil size={18} />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
              <h2 className="text-xl font-bold text-white">Edit Project</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition">
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className="overflow-y-auto p-6 custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-5 text-white">
                
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Project Title</label>
                  <input
                    type="text" required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Description</label>
                  <textarea
                    required rows={3}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Live URL</label>
                    <input
                      type="url"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">GitHub URL</label>
                    <input
                      type="url"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Image Edit */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Project Image</label>
                  <div className="relative border-2 border-dashed border-neutral-700 rounded-xl p-4 hover:bg-neutral-800 transition-colors cursor-pointer group text-center">
                    <input
                        type="file" accept="image/*" onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                    />
                    
                    {imagePreview ? (
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black mt-2">
                             <Image 
                             src={imagePreview} 
                             alt="Preview" 
                             fill 
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                             className="object-cover opacity-80 group-hover:opacity-100 transition" />
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                                <span className="text-white font-medium flex items-center gap-2"><CloudUpload size={20}/> Change Image</span>
                             </div>
                        </div>
                    ) : (
                        <div className="py-4">
                            <CloudUpload className="w-8 h-8 text-gray-500 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
                            <p className="text-sm text-gray-500">Upload New Image</p>
                        </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-[0.98]"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Save Changes'}
                </button>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}