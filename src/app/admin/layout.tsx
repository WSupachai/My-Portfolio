import React from 'react';
import "./globals.css";
import { redirect } from 'next/navigation'
import { createClient } from '@/src/utils/supabase/server'

// Metadata สำหรับหน้า Admin
export const metadata = {
  title: 'Admin Dashboard | My Portfolio',
  description: 'Manage content for portfolio website',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //สร้าง Client และดึง User
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  //เช็คว่ามี User ไหม? 
  if (!user) {
    // ถ้าไม่มี ให้ดีดไปหน้า Login ทันที
    redirect('/login')
  }
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}