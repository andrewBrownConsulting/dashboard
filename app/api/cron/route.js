import { addCompleteServer } from '@/app/todoServerFuncs'
import { NextResponse } from 'next/server'

export async function POST() {
  await addCompleteServer("Wake up at 6am", 10, "");
  await addCompleteServer("Meditate", 1, "8am");
  await addCompleteServer("Work 9 to 5", 10, "");
  await addCompleteServer("Go to Gym", 5, "");
  await addCompleteServer("Read before bed", 2, "9pm");
  return NextResponse.json({ message: 'Added calendar for today' })
}
