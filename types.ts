
export interface Plan {
  id: number;
  name: string;
  price: number;
  features: string[];
  highlight?: boolean;
  discountStore: number;
  ticketPriority: number;
}

export interface Player {
  id: number;
  name: string;
  number: number;
  position: string;
  image: string;
  nationality?: string;
  height?: string;
  age?: number;
}

/**
 * Added Match interface to resolve Error in file components/Schedule.tsx on line 3
 */
export interface Match {
  id: number;
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
}

/**
 * Added Product interface for Store.tsx
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
}

export enum Section {
  HOME = 'home',
  SPONSORS = 'sponsors',
  CONTACT = 'contact',
  HISTORY = 'history',
  LAUNCH = 'launch',
  MEMBERSHIP = 'membership'
}