'use client'
import FloatingNav from "@/src/components/sections/FloatingNav"

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';


const MenuContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* --- ปุ่มไอคอนมุมซ้ายบน (Fixed Top-Left) --- */}
      <button 
        onClick={handleToggle}
        className="fixed top-6 left-6 z-[60] p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md border border-slate-200 hover:bg-slate-100 transition-all"
        aria-label="Toggle Menu"
      >
        {/* ถ้าเปิดอยู่ให้โชว์กากบาท (X) ถ้าปิดอยู่โชว์ 3 ขีด (Menu) */}
        {isOpen ? (
          <X className="w-8 h-8 text-slate-800" />
        ) : (
          <Menu className="w-8 h-8 text-slate-800 hover:text-[#00ff99] transition-colors" />
        )}
      </button>

      {/* --- แสดง FloatingNav เมื่อ isOpen เป็น true --- */}
      {/* คุณอาจต้องปรับ CSS ใน FloatingNav ให้ตำแหน่งไม่ทับกับปุ่ม หรือให้แสดงกลางจอ */}
      {isOpen && <FloatingNav />}
    </>
  );
};

export default MenuContainer;

