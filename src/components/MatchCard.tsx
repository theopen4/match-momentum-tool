import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus } from "lucide-react";

interface MatchCardProps {
  match: {
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
  };
  onAddToCoupon: (matchId: string, bet: '1' | 'N' | '2', odds: number) => void;
}

export const MatchCard = ({ match, onAddToCoupon }: MatchCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      }),
      time: date.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const { date, time } = formatDate(match.date);

  const getStatusBadgeVariant = (status?: string) => {
    if (!status) return "secondary";
    if (status.includes("Victoires")) return "default";
    if (status.includes("Défaites")) return "destructive";
    if (status.includes("sans défaite")) return "default";
    return "secondary";
  };

  return (
    <Card className="mb-4 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        {/* Header with league and date */}
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="text-xs">
            {match.league}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {date} - {time}
          </div>
        </div>

        {/* Teams */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{match.homeTeam}</span>
            {match.homeStatus && (
              <Badge variant={getStatusBadgeVariant(match.homeStatus)} className="text-xs">
                {match.homeStatus}
              </Badge>
            )}
          </div>
          <div className="text-center text-muted-foreground font-medium">VS</div>
          <div className="flex items-center justify-between">
            <span className="font-medium">{match.awayTeam}</span>
            {match.awayStatus && (
              <Badge variant={getStatusBadgeVariant(match.awayStatus)} className="text-xs">
                {match.awayStatus}
              </Badge>
            )}
          </div>
        </div>

        {/* Odds */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="flex flex-col p-3 h-auto hover:bg-primary hover:text-primary-foreground"
            onClick={() => onAddToCoupon(match.id, '1', match.odds.home)}
          >
            <span className="text-xs text-muted-foreground">1</span>
            <span className="font-bold">{match.odds.home}</span>
            <Plus className="w-3 h-3 mt-1" />
          </Button>
          <Button
            variant="outline"
            className="flex flex-col p-3 h-auto hover:bg-primary hover:text-primary-foreground"
            onClick={() => onAddToCoupon(match.id, 'N', match.odds.draw)}
          >
            <span className="text-xs text-muted-foreground">N</span>
            <span className="font-bold">{match.odds.draw}</span>
            <Plus className="w-3 h-3 mt-1" />
          </Button>
          <Button
            variant="outline"
            className="flex flex-col p-3 h-auto hover:bg-primary hover:text-primary-foreground"
            onClick={() => onAddToCoupon(match.id, '2', match.odds.away)}
          >
            <span className="text-xs text-muted-foreground">2</span>
            <span className="font-bold">{match.odds.away}</span>
            <Plus className="w-3 h-3 mt-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};