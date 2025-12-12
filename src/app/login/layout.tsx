import React from 'react';
import "./globals.css";

// Metadata สำหรับหน้า Admin
export const metadata = {
  title: 'Admin Dashboard | My Portfolio',
  description: 'Manage content for portfolio website',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (  
    <html lang="en">
      <body>
        {children}
      </body>
    </html> 
  );
}