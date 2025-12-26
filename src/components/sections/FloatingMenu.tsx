'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, User, Folder, Mail, PenTool } from 'lucide-react';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // รายการเมนูของคุณ
  const menuItems = [
    { name: 'Home', href: '/', icon: <Home size={20} /> },
    { name: 'About', href: '/about', icon: <User size={20} /> },
    { name: 'Skills', href: '/skills', icon: <PenTool size={20} /> },
    { name: 'Projects', href: '/projects', icon: <Folder size={20} /> },
    { name: 'Contact', href: '/contact', icon: <Mail size={20} /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* --- ส่วนรายการเมนู (แสดงเมื่อ isOpen = true) --- */}
      <div 
        className={`
          flex flex-col gap-3 mb-4 transition-all duration-300 origin-bottom
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-0 translate-y-10 pointer-events-none'
          }
        `}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={() => setIsOpen(false)} // กดลิ้งค์แล้วให้ปิดเมนูอัตโนมัติ
            className="flex items-center gap-3 bg-white text-slate-800 px-4 py-3 rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 hover:scale-105 transition-transform"
          >
            {item.icon}
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* --- ปุ่ม Toggle (3 ขีด / กากบาท) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-14 h-14 rounded-full shadow-xl text-white transition-all duration-300
          ${isOpen ? 'bg-red-500 rotate-90' : 'bg-slate-900'}
        `}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

    </div>
  );
};

export default FloatingMenu;