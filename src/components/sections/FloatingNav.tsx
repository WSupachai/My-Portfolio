'use client';

import React, { useState, useEffect } from 'react';
import { Inbox, User, HeartHandshake, SlidersHorizontal, SquareUser } from 'lucide-react';

const FloatingNav = () => {
  const [activeId, setActiveId] = useState('hero');

  // กำหนด ID ให้ตรงกับหน้า Page.js
  const navItems = [
    { id: 'hero', icon: <Inbox size={24} />, label: 'Home' },
    { id: 'about', icon: <User size={24} />, label: 'About' },
    { id: 'skills', icon: <HeartHandshake size={24} />, label: 'Skills' },
    { id: 'projects', icon: <SlidersHorizontal size={24} />, label: 'Projects' },
    { id: 'contact', icon: <SquareUser size={24} />, label: 'Contact' },
  ];

  // ฟังก์ชันสำหรับคลิกแล้วเลื่อน Smooth Scroll
  const scrollToSection = (id:string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id); // เปลี่ยนสถานะปุ่มทันทีที่คลิก
    }
  };

  // (Optional) Code ส่วนนี้จะทำให้ปุ่มเปลี่ยนสีเอง เวลาเราเลื่อนหน้าจอด้วยมือ
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      
      const scrollPosition = window.scrollY + window.innerHeight / 2; // จุดกึ่งกลางจอ

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
      <nav className="flex items-center gap-2 bg-slate-50/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-200">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              className={`
                flex items-center justify-center rounded-full transition-all duration-300 ease-out
                ${isActive 
                  ? "bg-[#0f172a] text-white w-12 h-12 shadow-md scale-110" 
                  : "text-slate-500 hover:bg-slate-200 w-10 h-10 hover:text-slate-900"
                }
              `}
            >
              {React.cloneElement(item.icon, { 
                size: isActive ? 24 : 20,
                strokeWidth: isActive ? 2.5 : 2 
              })}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default FloatingNav;