export type ServiceCategory = 
  | 'FOOD_BANK'
  | 'SHELTER'
  | 'MEDICAL'
  | 'EDUCATION'
  | 'RECREATION'
  | 'COMMUNITY_CENTER'
  | 'OTHER';

export interface Store {
  id: string
  name: string
  category: ServiceCategory
  products: string[]
  phone: string
}

export const stores: Store[] = [
  {
    id: "1",
    name: "HealthMart",
    category: "MEDICAL",
    products: ["vitamins", "first aid kit", "pain relievers"],
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "EduBooks",
    category: "EDUCATION",
    products: ["textbooks", "stationery", "backpacks"],
    phone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    name: "FoodShare",
    category: "FOOD_BANK",
    products: ["canned goods", "fresh produce", "dry goods"],
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    name: "Community Center",
    category: "COMMUNITY_CENTER",
    products: ["meeting spaces", "activity equipment", "event supplies"],
    phone: "+1 (555) 456-7890",
  },
]

export function searchStores(query: string): Store[] {
  const lowercaseQuery = query.toLowerCase()
  return stores.filter(
    (store) =>
      store.products.some((product) => product.toLowerCase().includes(lowercaseQuery)) ||
      store.category.toLowerCase().includes(lowercaseQuery) ||
      store.name.toLowerCase().includes(lowercaseQuery),
  )
}

export function searchStoresByCategory(category: ServiceCategory): Store[] {
  return stores.filter((store) => store.category === category)
}