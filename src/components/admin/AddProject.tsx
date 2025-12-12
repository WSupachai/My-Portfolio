'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/src/lib/supabase' // เช็ค path ให้ตรงกับเครื่องคุณ
import { createProject } from '@/src/app/admin/actions' // เช็ค path action
import { Loader2, CloudUpload, X, Plus } from 'lucide-react'

export default function AddProjectModal() {
  // State สำหรับเปิด/ปิด Modal
  const [isOpen, setIsOpen] = useState(false)
  
  // State สำหรับ Form
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
  })

  // Reset ค่าเมื่อปิดหรือส่งเสร็จ
  const resetForm = () => {
    setFormData({ title: '', description: '', techStack: '', liveUrl: '', githubUrl: '' })
    setImageFile(null)
    setImagePreview(null)
    setLoading(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = ''

      // 1. Upload รูป (ถ้ามี)
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName)
        
        imageUrl = urlData.publicUrl
      }

      // 2. เรียก Server Action
      const result = await createProject({
        ...formData,
        imageUrl,
      })

      if (result.success) {
        alert('เพิ่มโปรเจคเรียบร้อย!')
        resetForm()
        setIsOpen(false) // ปิด Modal อัตโนมัติ
      } else {
        alert(result.message)
      }

    } catch (error) {
      console.error(error)
      alert('เกิดข้อผิดพลาดในการอัปโหลด')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* 🟢 ส่วนที่ 1: ปุ่มกด (จะแสดงในหน้า Manage) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition shadow-sm"
      >
        <Plus size={18} /> 
        <span>เพิ่มโปรเจค</span>
      </button>

      {/* 🔴 ส่วนที่ 2: Modal (จะแสดงเมื่อกดปุ่ม) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          
          {/* กล่อง Modal */}
          <div className="relative w-full max-w-2xl bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center p-6 border-b border-neutral-800">
              <h2 className="text-xl font-bold text-white">Add New Project</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Scrollable */}
            <div className="overflow-y-auto p-6 custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-5 text-white">
                
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Project Title</label>
                  <input
                    type="text" required
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Description</label>
                  <textarea
                    required rows={3}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Tech Stack */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Tech Stack (comma separated)</label>
                  <input
                    type="text" placeholder="e.g. React, Next.js, Prisma"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  />
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Live URL</label>
                    <input
                      type="url" placeholder="https://..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">GitHub URL</label>
                    <input
                      type="url" placeholder="https://github.com/..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Project Image</label>
                  {!imagePreview ? (
                    <div className="relative border-2 border-dashed border-neutral-700 rounded-xl p-8 hover:bg-neutral-800 transition-colors cursor-pointer group text-center">
                      <input
                        type="file" accept="image/*" onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <CloudUpload className="w-8 h-8 text-gray-500 group-hover:text-green-500 mx-auto mb-2 transition-colors" />
                      <p className="text-sm text-gray-500">Click to upload image</p>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-neutral-700 aspect-video group bg-black">
                      <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                      <button
                        type="button" onClick={() => { setImageFile(null); setImagePreview(null); }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button
                    type="submit" disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-[0.98]"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'Create Project'}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      )}
    </>
  )
}