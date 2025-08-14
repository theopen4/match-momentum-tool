import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download } from "lucide-react";

export interface CouponBet {
  matchId: string;
  matchName: string;
  bet: '1' | 'N' | '2';
  odds: number;
  league: string;
  date: string;
}

interface CouponPanelProps {
  bets: CouponBet[];
  onRemoveBet: (matchId: string) => void;
  onClearCoupon: () => void;
}

export const CouponPanel = ({ bets, onRemoveBet, onClearCoupon }: CouponPanelProps) => {
  const calculateTotalOdds = () => {
    return bets.reduce((total, bet) => total * bet.odds, 1);
  };

  const getBetLabel = (bet: '1' | 'N' | '2') => {
    switch (bet) {
      case '1': return 'Victoire domicile';
      case 'N': return 'Match nul';
      case '2': return 'Victoire extérieur';
    }
  };

  if (bets.length === 0) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="text-lg">Mon Coupon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Aucune sélection dans votre coupon
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Mon Coupon</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClearCoupon}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {bets.map((bet) => (
          <div key={bet.matchId} className="border rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <Badge variant="outline" className="text-xs mb-1">
                  {bet.league}
                </Badge>
                <p className="text-sm font-medium truncate">{bet.matchName}</p>
                <p className="text-xs text-muted-foreground">
                  {getBetLabel(bet.bet)} @ {bet.odds}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveBet(bet.matchId)}
                className="ml-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="border-t pt-3 mt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">Cote combinée:</span>
            <span className="font-bold text-lg text-primary">
              {calculateTotalOdds().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              {bets.length} sélection{bets.length > 1 ? 's' : ''}
            </span>
            <span className="text-sm text-muted-foreground">
              Gain potentiel avec 10€: {(calculateTotalOdds() * 10).toFixed(2)}€
            </span>
          </div>
          <Button className="w-full" size="lg">
            <Download className="w-4 h-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};