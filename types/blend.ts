export type Category = 'Coffee'|'Matcha'|'Tea'|'Boba'|'Milk Drinks'|'Smoothies'|'Mocktails'|'Juices'|'Other'

export type Taste = {
  sweetness:number; strength:number; creaminess:number; richness:number; refreshing:number; bitterness:number; acidity:number; aroma:number; texture:number;
}

export type Ingredient = { id:string; name:string; brand?:string; amount:number; unit:string; prep?:string }
export type Experiment = { id:string; date:string; rating:number; taste:Taste; notes:string; recommendation?:string }
export type Version = { id:string; number:number; name:string; createdAt:string; notes:string; ingredients:Ingredient[]; preparation:string; experiments:Experiment[]; isBest?:boolean }
export type Blend = { id:string; name:string; category:Category; emoji:string; description:string; createdAt:string; favorite:boolean; versions:Version[] }
export type PantryItem = { id:string; name:string; quantity:number; unit:string; expiry?:string; threshold:number }
