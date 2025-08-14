export interface Match {
  id: string;
  league: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeStatus?: string;
  awayStatus?: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  categories: string[];
}

export const mockMatches: Match[] = [
  {
    id: "1",
    league: "Ligue 1",
    date: "2025-01-14T20:00:00",
    homeTeam: "Paris Saint-Germain",
    awayTeam: "Olympique de Marseille",
    homeStatus: "5 Victoires",
    awayStatus: "3 Défaites",
    odds: { home: 1.80, draw: 3.75, away: 4.20 },
    categories: ["5-victoires", "3-defaites"]
  },
  {
    id: "2",
    league: "Premier League",
    date: "2025-01-14T18:30:00",
    homeTeam: "Manchester City",
    awayTeam: "Liverpool",
    homeStatus: "5 sans défaite",
    awayStatus: "5 sans victoire",
    odds: { home: 2.10, draw: 3.40, away: 3.20 },
    categories: ["5-sans-defaite", "5-sans-victoire"]
  },
  {
    id: "3",
    league: "La Liga",
    date: "2025-01-14T21:00:00",
    homeTeam: "Real Madrid",
    awayTeam: "FC Barcelone",
    homeStatus: "5 Victoires",
    odds: { home: 2.50, draw: 3.20, away: 2.80 },
    categories: ["5-victoires"]
  },
  {
    id: "4",
    league: "Bundesliga",
    date: "2025-01-15T15:30:00",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeStatus: "5 sans défaite",
    awayStatus: "3 Défaites",
    odds: { home: 1.95, draw: 3.60, away: 3.80 },
    categories: ["5-sans-defaite", "3-defaites"]
  },
  {
    id: "5",
    league: "Serie A",
    date: "2025-01-15T20:45:00",
    homeTeam: "Juventus",
    awayTeam: "Inter Milan",
    awayStatus: "5 sans victoire",
    odds: { home: 2.30, draw: 3.10, away: 3.10 },
    categories: ["5-sans-victoire"]
  },
  {
    id: "6",
    league: "Ligue 1",
    date: "2025-01-16T19:00:00",
    homeTeam: "AS Monaco",
    awayTeam: "OGC Nice",
    homeStatus: "3 Défaites",
    odds: { home: 2.80, draw: 3.20, away: 2.50 },
    categories: ["3-defaites"]
  },
  {
    id: "7",
    league: "Premier League",
    date: "2025-01-17T16:00:00",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeStatus: "5 Victoires",
    awayStatus: "5 sans défaite",
    odds: { home: 2.20, draw: 3.30, away: 3.40 },
    categories: ["5-victoires", "5-sans-defaite"]
  },
  {
    id: "8",
    league: "La Liga",
    date: "2025-01-18T18:00:00",
    homeTeam: "Atletico Madrid",
    awayTeam: "Sevilla",
    awayStatus: "5 sans victoire",
    odds: { home: 1.90, draw: 3.50, away: 4.10 },
    categories: ["5-sans-victoire"]
  }
];

export const getMatchesByPeriod = (period: 'today' | '3days' | '7days'): Match[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return mockMatches.filter(match => {
    const matchDate = new Date(match.date);
    const diffTime = matchDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch (period) {
      case 'today':
        return diffDays === 0;
      case '3days':
        return diffDays >= 0 && diffDays <= 3;
      case '7days':
        return diffDays >= 0 && diffDays <= 7;
      default:
        return false;
    }
  });
};

export const getMatchesByCategory = (matches: Match[], category: string): Match[] => {
  return matches.filter(match => match.categories.includes(category));
};