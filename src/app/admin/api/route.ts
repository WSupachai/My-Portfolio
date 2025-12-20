import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")

  const skills = await prisma.skills.findMany({
    where: category ? { category } : undefined
  })

  return NextResponse.json(skills)
}
