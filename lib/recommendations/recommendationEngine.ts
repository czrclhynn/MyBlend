import type { Version, Experiment, PantryItem } from '@/types/blend'
import { avgRating } from '@/lib/calculations/compare'

function round(n:number){return Math.round(n*10)/10}

export function recommend(current: Experiment, currentVersion: Version, previousVersion?: Version, pantry: PantryItem[] = []) {
  const candidates: string[] = []
  const t=current.taste
  const lowest = Object.entries({
    bitterness: 10 - t.bitterness,
    sweetness: 10 - t.sweetness,
    strength: 10 - t.strength,
    creaminess: 10 - t.creaminess,
    refreshing: 10 - t.refreshing,
    richness: 10 - t.richness,
  }).sort((a,b)=>b[1]-a[1])[0]

  if (t.bitterness >= 7) candidates.push('Your blend leaned bitter. Consider slightly reducing the main coffee/matcha concentration or testing a softer base.')
  if (t.sweetness <= 3) candidates.push('Sweetness was low. Consider a small syrup or sweetener increase rather than changing several ingredients at once.')
  if (t.creaminess <= 4) candidates.push('Creaminess was low. Try increasing milk by about 20–30ml or switching to a creamier milk.')
  if (t.strength <= 4) candidates.push('Strength was low. Try a small increase to your base ingredient or reduce dilution from ice.')
  if (t.refreshing <= 4) candidates.push('Refreshing was low. Test a lighter finish, more ice, or a brighter acid/fruit note depending on the drink.')
  if (t.richness <= 4) candidates.push('Richness was low. Consider a small increase in milk, syrup, or another texture-building ingredient.')

  const own = pantry.map(p=>p.name.toLowerCase())
  if (candidates.length === 0 && lowest) candidates.push(`Your lowest signal was ${lowest[0]}. A focused next experiment could adjust only one variable related to that dimension.`)

  let observation = ''
  if (previousVersion) {
    const prev = avgRating(previousVersion)
    const curr = avgRating(currentVersion)
    if (prev > 0 && curr > prev) observation = `Your rating increased from ${round(prev)} to ${round(curr)} after the latest change.`
    if (prev > 0 && curr < prev) observation = `Your rating moved from ${round(prev)} to ${round(curr)} in this version; keep the next test focused on one variable.`
  }

  const pantryHint = own.find(n=>n.includes('oat milk') || n.includes('vanilla') || n.includes('brown sugar'))
  if (pantryHint && candidates.length < 2) candidates.push(`You already have ${pantryHint} in your pantry, so it could be an easy ingredient to test next.`)

  return {
    summary: observation || `Your latest experiment scored ${round(current.rating)}/10.`,
    observation: `The lowest-pressure change to test first is ${lowest?.[0] ?? 'one variable at a time'}.`,
    suggestions: candidates.slice(0,2),
    experimentIdea: candidates[0] ?? 'Repeat the recipe once more before changing it so you have a stronger baseline.',
  }
}
