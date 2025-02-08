export interface Review {
  id: string
  user: string
  rating: number
  comment: string
  date: string
}

export interface Resource {
  id: string
  name: string
  type: CategoryType
  description: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  rating: number
  reviews: Review[]
}

export interface Location {
  id: string
  name: string
  type: string
  description: string
  address: string
  city: string
  state: string
  zipCode: string
  rating: number
  reviews: Review[]
}

export type CategoryType =
  | "FOOD_BANK"
  | "SHELTER"
  | "MEDICAL"
  | "EDUCATION"
  | "RECREATION"
  | "COMMUNITY_CENTER"
  | "OTHER"

export interface Category {
  id: CategoryType
  name  : string
  resources: Resource[]
}

export const categories: Category[] = [
  {
    id: "FOOD_BANK",
    name: "Food Banks",
    resources: [],
  },
  {
    id: "SHELTER",
    name: "Shelters",
    resources: [],
  },
  {
    id: "MEDICAL",
    name: "Medical Services",
    resources: [],
  },
  {
    id: "EDUCATION",
    name: "Educational Resources",
    resources: [],
  },
  {
    id: "RECREATION",
    name: "Recreational Activities",
    resources: [],
  },
  {
    id: "COMMUNITY_CENTER",
    name: "Community Centers",
    resources: [],
  },
  {
    id: "OTHER",
    name: "Other Resources",
    resources: [],
  },
]

