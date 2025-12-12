import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex items-center">
      
      {/* 1. แถบสีฟ้าด้านขวา (Background Right) */}
      <div className="absolute top-0 right-0 w-[35%] h-full bg-[#B6CEFC] z-0 hidden md:block" />

      {/* 2. ปุ่มเมนู Hamburger (Top Left) */}
      <div className="absolute top-8 left-8 md:top-12 md:left-24 z-20 cursor-pointer">
        <div className="w-8 h-1 bg-black mb-1.5 rounded-full"></div>
        <div className="w-6 h-1 bg-black mb-1.5 rounded-full"></div>
        <div className="w-4 h-1 bg-black rounded-full"></div>
      </div>

      {/* 3. Container หลักแบ่ง 2 ฝั่ง */}
      <div className="container mx-auto px-6 md:px-24 relative z-10 w-full h-full">
        <div className="flex flex-col md:flex-row h-full items-center">
          
          {/* --- ฝั่งซ้าย: ข้อความ (Left Content) --- */}
          <div className="w-full md:w-1/2 pt-20 md:pt-0 space-y-10">
            
            {/* หัวข้อหลัก */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-serif text-[#1a2b3c] mb-6">
                Web Developer
              </h1>
              
              {/* ปุ่ม Hire Me */}
              <button className="px-10 py-3 border border-black rounded-tr-[20px] rounded-bl-[20px] rounded-tl-md rounded-br-md text-lg font-medium hover:bg-black hover:text-white transition-all duration-300">
                Hire Me
              </button>
            </div>

            {/* ส่วนสถิติ (Stats) */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              {/* Stat 1 */}
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-6xl font-serif text-[#1a2b3c]">3+</span>
                <p className="text-sm text-gray-500 leading-tight">
                  Years of <br /> Experience in Web <br /> development
                </p>
              </div>
              {/* Stat 2 */}
              <div className="flex items-center gap-4">
                <span className="text-5xl md:text-6xl font-serif text-[#1a2b3c]">20+</span>
                <p className="text-sm text-gray-500 leading-tight">
                  Projects <br /> Worked in my <br /> career
                </p>
              </div>
            </div>

          </div>

          {/* --- ฝั่งขวา: รูปคน (Right Content) --- */}
          <div className="w-full md:w-1/2 relative h-[500px] md:h-[800px] flex items-end justify-center md:justify-end">
            
            {/* รูปคน (ต้องใช้ไฟล์ PNG พื้นใส) */}
            {/* เปลี่ยน src เป็น path รูปของคุณ เช่น "/images/my-photo.png" */}
            {/*<div className="relative w-[300px] h-[400px] md:w-[450px] md:h-[600px] z-10 bottom-0">
               {/* ใส่รูป Placeholder ไปก่อน

              <Image 
                src="https://placehold.co/450x600/png?text=Your+Photo" 
                alt="Profile"
                fill
                className="object-contain object-bottom drop-shadow-xl"
              />
            </div>*/}

            {/* ชื่อแนวตั้ง (Vertical Name) */}
            <div className="hidden md:block absolute right-[-80px] top-1/2 transform -translate-y-1/2 rotate-90 origin-center z-20">
              <h2 className="text-6xl font-bold tracking-widest text-[#2c4a6b] uppercase opacity-90">
                SUPACHAI WIJAIYA
              </h2>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;