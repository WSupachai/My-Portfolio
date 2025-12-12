import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiSupabase, 
  SiPrisma, 
  SiPython,
  SiDocker
} from "react-icons/si";
import { FaCode } from "react-icons/fa"; // ไอคอนกันเหนียว (Default)

export default function SkillIcon({ name, className }) {
  // 1. สร้าง Dictionary จับคู่ "ชื่อใน DB" -> "Icon Component"
  // เคล็ดลับ: ทำให้ key เป็นตัวพิมพ์เล็กทั้งหมด จะได้ไม่ต้องห่วงเรื่อง Case sensitive
  const iconMap = {
    html: SiHtml5,
    css: SiCss3,
    javascript: SiJavascript,
    react: SiReact,
    "next.js": SiNextdotjs, // ถ้าใน DB เก็บว่า "Next.js"
    nextjs: SiNextdotjs,    // เผื่อพิมพ์ผิด
    tailwind: SiTailwindcss,
    supabase: SiSupabase,
    prisma: SiPrisma,
    python: SiPython,
    docker: SiDocker,
  };

  // 2. แปลงชื่อที่รับมาเป็นตัวพิมพ์เล็ก เพื่อให้ตรงกับ key ข้างบน
  const normalizedName = name?.toLowerCase().trim();

  // 3. เลือกไอคอน ถ้าไม่มีให้ใช้ FaCode (รูป < />) แทน
  const IconComponent = iconMap[normalizedName] || FaCode;

  // 4. แสดงผล
  return <IconComponent className={className} />;
}