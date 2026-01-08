import {
  // Languages
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiPython, SiPhp, SiGo, SiRust, SiSwift, SiKotlin, SiRuby,
  // Frontend
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiSvelte, SiTailwindcss, SiBootstrap, SiSass, SiJquery, SiMui, SiVite,
  // Backend & Runtime
  SiNodedotjs, SiExpress, SiNestjs, SiDjango, SiFlask, SiSpring, SiLaravel, SiDotnet,
  // Database
  SiPostgresql, SiMysql, SiMongodb, SiRedis, SiSqlite, SiFirebase, SiSupabase, SiPrisma, 
  // Tools & DevOps
  SiGit, SiGithub, SiGitlab, SiDocker, SiKubernetes, SiNginx, SiLinux, SiGooglecloud, SiVercel, SiNetlify, SiPostman, SiFigma, SiAdobephotoshop, SiAdobeillustrator
  // Note: SiAws -> แก้เป็น SiAmazonaws
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { DiMsqlServer,DiVisualstudio } from "react-icons/di";
import { FaCode } from "react-icons/fa"; // ไอคอนกันเหนียว (Default)

export default function SkillIcon({ name, className }) {
  // 1. สร้าง Dictionary จับคู่ "ชื่อใน DB" -> "Icon Component"
  // เคล็ดลับ: ทำให้ key เป็นตัวพิมพ์เล็กทั้งหมด จะได้ไม่ต้องห่วงเรื่อง Case sensitive
  const iconMap = {
    // --- Languages ---
    html: SiHtml5,
    css: SiCss3,
    javascript: SiJavascript,
    js: SiJavascript,
    typescript: SiTypescript,
    ts: SiTypescript,
    python: SiPython,
    php: SiPhp,
    go: SiGo,
    rust: SiRust,
    swift: SiSwift,
    kotlin: SiKotlin,
    ruby: SiRuby,
    "c#": TbBrandCSharp,

    // --- Frontend ---
    react: SiReact,
    "next.js": SiNextdotjs,
    nextjs: SiNextdotjs,
    angular: SiAngular,
    svelte: SiSvelte,
    tailwind: SiTailwindcss,
    bootstrap: SiBootstrap,
    sass: SiSass,
    mui: SiMui,
    vite: SiVite,

    // --- Backend ---
    node: SiNodedotjs,
    "node.js": SiNodedotjs,
    nodejs: SiNodedotjs,
    express: SiExpress,
    nest: SiNestjs,
    nestjs: SiNestjs,
    django: SiDjango,
    flask: SiFlask,
    spring: SiSpring,
    laravel: SiLaravel,
    dotnet: SiDotnet,
    ".net": SiDotnet,
    "vb.net":DiVisualstudio,

    // --- Database ---
    postgres: SiPostgresql,
    postgresql: SiPostgresql,
    mysql: SiMysql,
    mongo: SiMongodb,
    mongodb: SiMongodb,
    redis: SiRedis,
    sqlite: SiSqlite,
    firebase: SiFirebase,
    supabase: SiSupabase,
    prisma: SiPrisma,
    mssql: DiMsqlServer,
    // --- Tools & Cloud ---
    git: SiGit,
    github: SiGithub,
    gitlab: SiGitlab,
    docker: SiDocker,
    kubernetes: SiKubernetes,
    k8s: SiKubernetes,
    linux: SiLinux,
    nginx: SiNginx,
    gcp: SiGooglecloud,
    vercel: SiVercel,
    netlify: SiNetlify,
    postman: SiPostman,
    figma: SiFigma,
    photoshop: SiAdobephotoshop,
    illustrator: SiAdobeillustrator,
  };

  // 2. แปลงชื่อที่รับมาเป็นตัวพิมพ์เล็ก เพื่อให้ตรงกับ key ข้างบน
  const normalizedName = name?.toLowerCase().replace(/\s/g, "") || "";

  // 3. เลือกไอคอน ถ้าไม่มีให้ใช้ FaCode (รูป < />) แทน
  const IconComponent = iconMap[normalizedName] || FaCode;

  // 4. แสดงผล
  return <IconComponent className={className} />;
}