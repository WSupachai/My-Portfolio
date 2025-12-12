import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',        // เมื่อเข้าหน้าแรก
        destination: '/public', // ให้ไปที่ /public
        permanent: true,    // true = 308 redirect (SEO ดี), false = 307 (ชั่วคราว)
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hgpgbquuejgkacxkcksk.supabase.co', // โดเมน Supabase ของคุณ
        port: '',
        pathname: '/storage/v1/object/public/**', // อนุญาตเฉพาะ path ของ Storage
      },
    ],
  },
};

export default nextConfig;
