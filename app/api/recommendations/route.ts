import { NextResponse } from 'next/server'
import { recommend } from '@/lib/recommendations/recommendationEngine'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = recommend(body.currentExperiment, body.currentVersion, body.previousVersion, body.pantry ?? [])
    return NextResponse.json({ ...result, mode: 'rule-based' })
  } catch {
    return NextResponse.json({ error: 'Unable to generate recommendation.' }, { status: 400 })
  }
}
