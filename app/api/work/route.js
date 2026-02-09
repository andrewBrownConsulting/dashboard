import { addCompleteServer } from '@/app/todoServerFuncs'
import { NextResponse } from 'next/server'

export async function POST() {
  await addCompleteServer("Worked from office", 2, "")
  return NextResponse.json({ message: 'Worked from office today' })
}
