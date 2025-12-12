//app/admin/sctions.ts
'use server'
import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from 'next/cache'
import { supabase } from '@/src/lib/supabase'

export async function addSkills(formData: FormData) {
    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const rawProficiency = formData.get('proficiency')
    const proficiency = Number(rawProficiency)

    await prisma.skills.create({
        data: {
            name,
            category,
            proficiency,
        },
    })

    revalidatePath('/')
}

export async function deleteSkill(id: number) {
    await prisma.skills.delete({
        where: { id: id } // หรือเขียนย่อว่า where: { id } ค่าเท่ากัน
    })

    revalidatePath('/')
}

export async function updateSkill(id: number, formData: FormData) {
    //ดึงค่าจาก Form
    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const rawProficiency = formData.get('proficiency')
    //แปลง proficiency เป็นตัวเลข (ถ้าไม่มีค่า ให้เป็น 0)
    const proficiency = rawProficiency ? Number(rawProficiency) : 0

    try {
        await prisma.skills.update({
            where: {
                id: id // ระบุว่าแก้ตัวไหน ด้วย id ที่รับมา
            },
            data: {
                name: name,
                category: category,
                proficiency: proficiency
            }
        })

        revalidatePath('/')
        console.log(`Updated skill id: ${id}`)
        //return { message: 'Success' }

    } catch (error) {
        console.error('Error updating skill:', error)
        //return { message: 'Error' }
    }
}

// กำหนด Type ของข้อมูลที่จะรับเข้ามา
interface CreateProjectState {
    title: string
    description: string
    techStack: string // รับมาเป็น string "React, Next, Node" แล้วค่อยตัดคำ
    liveUrl: string
    githubUrl: string
    imageUrl: string
}
export async function createProject(data: CreateProjectState){
  try {
    const techStackArray = data.techStack
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        techStack: techStackArray,
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        imageUrl: data.imageUrl || null,
      },
    })

    revalidatePath('/')
    
    // ✅ ต้องมีบรรทัดนี้! เพื่อส่งค่ากลับไปบอกหน้าบ้านว่าสำเร็จ
    return { success: true, message: 'เพิ่มโปรเจคเรียบร้อยแล้ว!' }

  } catch (error) {
    console.error('Error creating project:', error)
    // ✅ ต้องมีบรรทัดนี้! เพื่อส่งค่ากลับไปบอกหน้าบ้านว่าพลาด
    return { success: false, message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' }
  }
}

// ✅ ฟังก์ชันลบโปรเจค (Server Action)
export async function deleteProject(id: number) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: id },
    })
    
     if (!project) {
        return { success: false, message: 'ไม่พบโปรเจคที่ต้องการลบ' }
    }

    if (project.imageUrl) {
      // URL ตัวอย่าง: .../storage/v1/object/public/project-images/17655...-name.png
      // เราต้องตัดเอาเฉพาะชื่อไฟล์ที่อยู่หลัง "project-images/"
      const fileName = project.imageUrl.split('/project-images/').pop()

      if (fileName) {
        // decodeURIComponent ช่วยแก้ชื่อไฟล์ที่มีภาษาไทยหรือเว้นวรรค (ที่ถูกแปลงเป็น %20)
        const cleanFileName = decodeURIComponent(fileName)
        
        const { error: storageError } = await supabase.storage
          .from('project-images') // ชื่อ Bucket
          .remove([cleanFileName]) // รับเป็น Array ชื่อไฟล์

        if (storageError) {
            console.error('Warning: Failed to delete image from storage', storageError)
            // เราปล่อยผ่านไปก่อน เพื่อให้ยังสามารถลบข้อมูลใน DB ได้ (แม้รูปลบไม่สำเร็จ)
        }
      }
    }

     // 1. ลบข้อมูลใน Database
    await prisma.project.delete({
      where: { id: id },
    })

    // 2. สั่งให้ Next.js รีเฟรชข้อมูลในหน้า Manage และหน้า Home ใหม่ทันที
    revalidatePath('/')
 
  } catch (error) {
    console.error('Delete Error:', error)
  }
}

// ✅ เพิ่ม Interface สำหรับรับข้อมูลแก้ไข (ต้องมี id)
interface UpdateProjectState {
  id: number
  title: string
  description: string
  techStack: string
  liveUrl: string
  githubUrl: string
  imageUrl: string
}

// ✅ ฟังก์ชัน Update (Server Action)
export async function updateProject(data: UpdateProjectState) {
  try {
    // 1. ดึงข้อมูลเดิมมาเช็คก่อน (เพื่อจัดการรูปภาพ)
    const oldProject = await prisma.project.findUnique({
      where: { id: data.id },
    })

    if (!oldProject) return { success: false, message: 'ไม่พบโปรเจค' }

    // 2. Logic จัดการรูปภาพ: ถ้ามีการเปลี่ยนรูป (URL ใหม่ ไม่ตรงกับ URL เก่า)
    if (data.imageUrl && oldProject.imageUrl && data.imageUrl !== oldProject.imageUrl) {
      // ลบรูปเก่าออกจาก Storage เพื่อประหยัดพื้นที่
      const oldFileName = oldProject.imageUrl.split('/project-images/').pop()
      if (oldFileName) {
        const cleanFileName = decodeURIComponent(oldFileName)
        await supabase.storage.from('project-images').remove([cleanFileName])
      }
    }

    // 3. แปลง Tech Stack กลับเป็น Array
    const techStackArray = data.techStack
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)

    // 4. อัปเดตข้อมูลใน DB
    await prisma.project.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        techStack: techStackArray,
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        imageUrl: data.imageUrl, // URL ใหม่ (หรือเก่า) ที่ส่งมาจาก Frontend
      },
    })

    // 5. รีเฟรชหน้า
    revalidatePath('/admin/manage')
    revalidatePath('/')

    return { success: true, message: 'แก้ไขข้อมูลเรียบร้อย!' }

  } catch (error) {
    console.error('Update Error:', error)
    return { success: false, message: 'เกิดข้อผิดพลาดในการแก้ไข' }
  }
}
