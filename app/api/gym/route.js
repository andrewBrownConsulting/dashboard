import { addCompleteServer } from '@/app/todoServerFuncs'
import { NextResponse } from 'next/server'

export async function POST() {
  addCompleteServer("Go to gym", 5)
  return NextResponse.json({ message: 'Added gym to today' })
}
