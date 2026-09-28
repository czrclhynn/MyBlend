import type { Version, Taste } from '@/types/blend'

export function avgRating(version: Version) {
  if (!version.experiments.length) return 0
  return version.experiments.reduce((s,e)=>s+e.rating,0) / version.experiments.length
}

export function bestVersion(versions: Version[]) {
  return [...versions].sort((a,b)=>avgRating(b)-avgRating(a))[0]
}

export function avgTaste(experiments: Version['experiments']): Taste {
  const keys: (keyof Taste)[] = ['sweetness','strength','creaminess','richness','refreshing','bitterness','acidity','aroma','texture']
  const out = {} as Taste
  for (const key of keys) {
    const vals = experiments.map(e=>e.taste[key]).filter(v=>typeof v==='number')
    out[key] = vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0
  }
  return out
}

export function ingredientMap(v:Version) { return new Map(v.ingredients.map(i=>[i.name.toLowerCase(),i])) }

export function versionDiff(a:Version,b:Version){
  const am=ingredientMap(a), bm=ingredientMap(b)
  const names = Array.from(new Set([...am.keys(),...bm.keys()]))
  return names.map(name=>{
    const x=am.get(name), y=bm.get(name)
    return { name:y?.name ?? x?.name ?? name, from:x?`${x.amount}${x.unit}`:'—', to:y?`${y.amount}${y.unit}`:'—', delta:x&&y?y.amount-x.amount:null }
  }).filter(x=>x.from!==x.to)
}

export function averageBlendRating(blendId:string, blends:{id:string;versions:Version[]}[]) {
  const b=blends.find(x=>x.id===blendId)
  const ex=b?.versions.flatMap(v=>v.experiments) ?? []
  return ex.length ? ex.reduce((s,e)=>s+e.rating,0)/ex.length : 0
}
