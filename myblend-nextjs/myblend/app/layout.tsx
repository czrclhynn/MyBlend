import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MyBlend — Blend it. Rate it. Remember it.',
  description: 'A personal drink experimentation lab for evolving recipes, ratings, taste profiles, pantry tracking and blend comparisons.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
