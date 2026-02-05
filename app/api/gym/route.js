import { addCompleteServer } from '@/app/todoServerFuncs'
import { NextResponse } from 'next/server'

export async function POST() {
  await addCompleteServer("Go to gym", 5, "Any activity")
  return NextResponse.json({ message: 'Added gym to today' })
}
