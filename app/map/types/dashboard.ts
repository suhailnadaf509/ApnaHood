export interface Resource {
  id: string;
  lat: number;
  lng: number;
  type: string;
  name: string;
  address: string;
  description: string;
  services: string[];
}

export interface LocalEvent {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface Notification {
  id: string;
  lat: number;
  lng: number;
  type: string;
  message: string;
  timestamp: string;
}

export type ResourceType =
  | "Food Bank"
  | "Shelter"
  | "Healthcare"
  | "Community Center";
export type EventCategory = "Community" | "Sports" | "Educational" | "Charity";

export type FilterState = {
  resources: ResourceType[];
  events: EventCategory[];
  search: string;
};
