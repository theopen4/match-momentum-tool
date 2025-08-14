import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MatchCard } from "@/components/MatchCard";
import { CouponPanel, CouponBet } from "@/components/CouponPanel";
import { mockMatches, getMatchesByPeriod, getMatchesByCategory } from "@/data/mockMatches";
import { Clock, TrendingUp, TrendingDown, Shield, AlertTriangle } from "lucide-react";

const Index = () => {
  const [couponBets, setCouponBets] = useState<CouponBet[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | '3days' | '7days'>('today');

  const categories = [
    {
      id: '5-victoires',
      title: '5 VICTOIRES CONSÉCUTIVES',
      icon: TrendingUp,
      description: 'Équipes avec 5+ victoires d\'affilée',
      color: 'text-success'
    },
    {
      id: '5-sans-defaite',
      title: '5 MATCHS SANS DÉFAITE',
      icon: Shield,
      description: 'Équipes avec 5+ matchs sans défaite',
      color: 'text-primary'
    },
    {
      id: '3-defaites',
      title: '3+ DÉFAITES CONSÉCUTIVES',
      icon: TrendingDown,
      description: 'Équipes avec 3+ défaites d\'affilée',
      color: 'text-destructive'
    },
    {
      id: '5-sans-victoire',
      title: '5+ MATCHS SANS VICTOIRE',
      icon: AlertTriangle,
      description: 'Équipes sans victoire depuis 5+ matchs',
      color: 'text-warning'
    }
  ];

  const handleAddToCoupon = (matchId: string, bet: '1' | 'N' | '2', odds: number) => {
    const match = mockMatches.find(m => m.id === matchId);
    if (!match) return;

    const existingBetIndex = couponBets.findIndex(b => b.matchId === matchId);
    
    if (existingBetIndex >= 0) {
      // Update existing bet
      const updatedBets = [...couponBets];
      updatedBets[existingBetIndex] = {
        matchId,
        matchName: `${match.homeTeam} vs ${match.awayTeam}`,
        bet,
        odds,
        league: match.league,
        date: match.date
      };
      setCouponBets(updatedBets);
    } else {
      // Add new bet
      setCouponBets([...couponBets, {
        matchId,
        matchName: `${match.homeTeam} vs ${match.awayTeam}`,
        bet,
        odds,
        league: match.league,
        date: match.date
      }]);
    }
  };

  const handleRemoveBet = (matchId: string) => {
    setCouponBets(couponBets.filter(bet => bet.matchId !== matchId));
  };

  const handleClearCoupon = () => {
    setCouponBets([]);
  };

  const getCurrentMatches = () => getMatchesByPeriod(selectedPeriod);
  const currentMatches = getCurrentMatches();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Football Match Momentum</h1>
          <p className="text-primary-foreground/80">
            Analysez les dynamiques des équipes et optimisez vos paris
          </p>
          <div className="flex items-center mt-4 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>Dernière mise à jour: {new Date().toLocaleTimeString('fr-FR')}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as any)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="today">AUJOURD'HUI</TabsTrigger>
                <TabsTrigger value="3days">3 JOURS</TabsTrigger>
                <TabsTrigger value="7days">7 JOURS</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedPeriod}>
                <div className="space-y-6">
                  {categories.map((category) => {
                    const categoryMatches = getMatchesByCategory(currentMatches, category.id);
                    const Icon = category.icon;
                    
                    return (
                      <Card key={category.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <Icon className={`w-6 h-6 ${category.color}`} />
                            <div>
                              <div className="flex items-center gap-2">
                                <span>{category.title}</span>
                                <Badge variant="secondary">{categoryMatches.length}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground font-normal mt-1">
                                {category.description}
                              </p>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {categoryMatches.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">
                              Aucun match dans cette catégorie pour la période sélectionnée
                            </p>
                          ) : (
                            <div className="space-y-4">
                              {categoryMatches.map((match) => (
                                <MatchCard
                                  key={match.id}
                                  match={match}
                                  onAddToCoupon={handleAddToCoupon}
                                />
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Coupon Panel */}
          <div className="lg:col-span-1">
            <CouponPanel
              bets={couponBets}
              onRemoveBet={handleRemoveBet}
              onClearCoupon={handleClearCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;