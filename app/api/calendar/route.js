import { addCompleteServer } from '@/app/todoServerFuncs'
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  try {
    const { name, info, score } = await req.json();
    await addCompleteServer(name, score, info);
    return NextResponse.json({ message: 'Added calendar to today' })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Bad JSON" }),
      { status: 400 }
    );
  }
}
