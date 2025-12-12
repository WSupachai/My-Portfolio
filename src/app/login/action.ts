// app/login/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/src/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // รับค่าจากฟอร์ม
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // ส่งไป Log in กับ Supabase
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // ถ้า Login ไม่ผ่าน ให้ดีดกลับไปหน้า error (หรือจะ redirect กลับมาหน้า login ก็ได้)
    console.error(error) // ดู error ใน Terminal
    redirect('/login?error=true') 
  }

  // ถ้าผ่าน ให้รีเฟรชหน้าเว็บและไป admin
  revalidatePath('/admin', 'layout')
  redirect('/admin')
}


