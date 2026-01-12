import Image from 'next/image';
import { Outfit, Inter } from 'next/font/google'; 
import HeaderNav from '@/src/components/sections/HeaderNav';

// ใช้ Font Outfit สำหรับหัวข้อ (ดู Modern Tech มาก)
const outfit = Outfit({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

// กำหนดสีหลัก
const themeColor = '#00ff99';


export default function HeroSectionCyber() {
  return (
    <div className={`min-h-screen w-full flex flex-col md:flex-row bg-[#030303] text-white ${inter.className} overflow-hidden relative`}>
      
      {/* --- Background Effects (Global) --- */}
      {/* 1. Grid Pattern พื้นหลัง */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
           style={{ 
             backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
             backgroundSize: '50px 50px' 
           }}>
      </div>
      
      {/* 2. Top Right Glow (แสงฟุ้งมุมขวาบน) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff99] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- LEFT SIDE: Content --- */}
      <div className="w-full md:w-[55%] relative flex flex-col justify-center p-8 md:p-20 z-10">
        
        {/* Header / Nav */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 cursor-pointer hover:opacity-80 transition-opacity">
          <HeaderNav/>
        </div>

        {/* Main Text */}
        <div className="mt-20 md:mt-0">
            <span className={`text-[#00ff99] tracking-widest text-sm uppercase font-bold mb-4 block ${outfit.className}`}>
                Introduction
            </span>
            
            <h1 className={`${outfit.className} text-6xl md:text-8xl font-bold leading-tight mb-6`}>
              Full-Stack <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                Developer
              </span>
              <span className="text-[#00ff99] text-6xl md:text-8xl">.</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-md mb-10 font-light">
              A web developer focused on performance and aesthetics. Constantly learning new technologies to deliver high-quality solutions that meet user needs.
            </p>

            {/* Stats - Modern Layout */}
            <div className="flex gap-16 mt-20 border-t border-gray-800 pt-8">
              <div>
                <h3 className={`${outfit.className} text-5xl font-bold text-white mb-1`}>
                  3<span className="text-[#00ff99]">+</span>
                </h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Years of Experience in software development</p>
              </div>
               
              <div>
                <h3 className={`${outfit.className} text-5xl font-bold text-white mb-1`}>
                  25
                </h3>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Age</p>
              </div>
              
            </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Image Composition --- */}
      <div className="hidden md:block  w-full md:w-[45%] relative min-h-[500px] md:min-h-auto flex items-end justify-center md:justify-end overflow-visible">
        
        {/* ชื่อด้านหลัง (Background Text) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:left-auto md:right-10 z-0 select-none">
           <h2 className={`${outfit.className} text-[120px] md:text-[200px] font-black leading-none text-[#00ff99] opacity-5`} 
               style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              MARK
           </h2>
        </div>

        {/* แสง Neon วงกลมหลังรูป 
        <div className="absolute bottom-0 right-0 md:right-20 w-[400px] h-[400px] bg-[#00ff99] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        */}
         
        {/* กรอบสี่เหลี่ยมตกแต่ง (Cyber Frame) */}
        <div className="absolute top-20 right-10 w-20 h-20 border-t-2 border-r-2 border-[#00ff99] opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-20 h-20 border-b-2 border-l-2 border-[#00ff99] opacity-50"></div>

        {/* Image */}
        <div className="relative z-10 w-full h-[90%] md:h-[90%] max-w-[600px] md:mr-[-50px]">

           {/* Gradient Fade ด้านล่างเพื่อให้รูปกลืนไปกับพื้นหลัง 
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#030303] to-transparent z-20 "></div>
           */}  
           
           <Image 
                src="/MARKHEROs.png" 
                alt="Profile"
                fill
                className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(0,255,153,0.15)] grayscale-[20%] contrast-110 hover:grayscale-0 transition-all duration-500
                 [mask-image:linear-gradient(to_top,transparent_0%,black_20%)] "
                priority
            />
          
        </div>

      </div>
    </div>
  );
}