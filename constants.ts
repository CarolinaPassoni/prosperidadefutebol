
import { Plan, Player, Match, Product } from './types';

// Local asset (avoid external hosting issues)
export const TEAM_LOGO_URL = "/manto/logo.svg";

export const MEMBERSHIP_PLANS: Plan[] = [
  {
    id: 1,
    name: "Plano Raiz",
    price: 250.00,
    discountStore: 15,
    ticketPriority: 1,
    highlight: true,
    features: [
      "Ingressos liberados (jogos com mando)",
      "Sorteios mensais de brindes oficiais",
      "Desconto em lojas parceiras",
      "Item exclusivo do sócio (edição 2026)",
      "Mídia Kit Oficial 2026",
      "Participação em ações exclusivas",
      "Carteirinha de sócio física"
    ]
  },
  {
    id: 2,
    name: "Plano Guerreiro",
    price: 150.00,
    discountStore: 10,
    ticketPriority: 2,
    features: [
      "Sorteios mensais de brindes oficiais",
      "Desconto em lojas parceiras",
      "Item exclusivo do sócio (edição 2026)",
      "Mídia Kit Oficial 2026",
      "Carteirinha digital personalizada",
      "🚫 Não inclui ingressos gratuitos"
    ]
  }
];

export const SQUAD_PLAYERS: Player[] = [
  { 
    id: 1, 
    name: "Equipe Principal", 
    number: 10, 
    position: "União", 
    image: "https://files.catbox.moe/p6d7nu.jpg",
    nationality: "Brasil",
    height: "1.70m",
    age: 24
  },
  { 
    id: 2, 
    name: "Manto de Luta", 
    number: 7, 
    position: "Tradição", 
    image: "https://files.catbox.moe/f6bygc.jpeg",
    nationality: "Brasil",
    height: "1.75m",
    age: 26
  },
  { 
    id: 3, 
    name: "Foco Total", 
    number: 1, 
    position: "Garra", 
    image: "https://files.catbox.moe/1c6a9p.png",
    nationality: "Brasil",
    height: "1.72m",
    age: 22
  },
  { 
    id: 4, 
    name: "Nossa Torcida", 
    number: 12, 
    position: "Coração", 
    image: "https://files.catbox.moe/2847ov.jpg",
    nationality: "Brasil",
    height: "Vargem Alta",
    age: 100
  },
  { 
    id: 5, 
    name: "Prosperidade FC", 
    number: 25, 
    position: "Futuro", 
    image: "https://files.catbox.moe/6xvtq8.png",
    nationality: "Brasil",
    height: "Elite",
    age: 2026
  }
];

/**
 * Added UPCOMING_MATCHES to resolve Error in file components/Schedule.tsx on line 4
 */
export const UPCOMING_MATCHES: Match[] = [
  {
    id: 1,
    date: "2026-03-15",
    time: "15:00",
    opponent: "Vitória-ES",
    location: "Estádio Araripe",
    isHome: true
  },
  {
    id: 2,
    date: "2026-03-22",
    time: "16:00",
    opponent: "Rio Branco",
    location: "Estádio Kleber Andrade",
    isHome: false
  },
  {
    id: 3,
    date: "2026-03-29",
    time: "15:00",
    opponent: "Desportiva Ferroviária",
    location: "Estádio Araripe",
    isHome: true
  }
];

/**
 * Added MERCH_PRODUCTS to resolve Error in file components/Store.tsx on line 3
 */
export const MERCH_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Camisa Oficial I 2026 - Prosperidade FC",
    price: 189.90,
    originalPrice: 229.90,
    image: "https://files.catbox.moe/f6bygc.jpeg",
    rating: 5
  },
  {
    id: 2,
    name: "Camisa Oficial II 2026 - Prosperidade FC",
    price: 179.90,
    image: "https://files.catbox.moe/p6d7nu.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Agasalho Pro Treino 2026",
    price: 249.90,
    originalPrice: 299.90,
    image: "https://files.catbox.moe/6xvtq8.png",
    rating: 4
  }
];