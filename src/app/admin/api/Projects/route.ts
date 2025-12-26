import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"


export async function GET(req: Request) {
  try {
    // คุณสามารถเพิ่ม where: ... เพื่อกรองข้อมูลได้ถ้าต้องการ
    const projects = await prisma.project.findMany({
      orderBy: {
        id: 'asc', 
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" }, 
      { status: 500 }
    )
  }
}
