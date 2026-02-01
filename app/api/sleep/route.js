import { addCompleteServer } from '@/app/todoServerFuncs'
import { NextResponse } from 'next/server'

function minutesAfter6am(date = new Date()) {
  const six = new Date(date);
  six.setHours(6, 0, 0, 0);
  return Math.floor((date - six) / 60000);
}
export async function POST() {
  const minsLate = minutesAfter6am();
  const score = Math.max(100 - minsLate, 0) / 100;
  await addCompleteServer("Wake Up at 6am", score, ("Woke up " + minsLate + " mins late"));
  return NextResponse.json({ message: 'Woke up ' + minsLate + " mins late" })
}
