import { Search, Bell, Headphones } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { VRSpaceCard } from "./VRSpaceCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface HomeTabProps {
  onPreview: (id: string) => void;
  onPlay: (id: string) => void;
  onPurchase: (id: string, price: number) => void;
  vrContent: any[];
  purchases: string[];
  profile: any;
}

export function HomeTab({ onPreview, onPlay, onPurchase, vrContent, purchases, profile }: HomeTabProps) {
  const featuredSpaces = [
    {
      id: '1',
      title: 'Cyberpunk City 2077',
      description: 'Explore a neon-lit futuristic metropolis with flying cars and towering skyscrapers.',
      thumbnail: 'https://images.unsplash.com/photo-1636036704268-017faa3b6557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBlbnZpcm9ubWVudCUyMG5lb258ZW58MXx8fHwxNzU2MzU3MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      duration: '45 min',
      category: 'Adventure',
      rating: 4.8,
      price: 12.99
    },
    {
      id: '2',
      title: 'Space Station Alpha',
      description: 'Experience life aboard an international space station with zero gravity physics.',
      thumbnail: 'https://images.unsplash.com/photo-1634893661513-d6d1f579fc63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwc3BhY2UlMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      duration: '30 min',
      category: 'Simulation',
      rating: 4.6,
      price: 9.99
    }
  ];

  const recentActivities = [
    { type: 'achievement', text: 'Completed "Mars Explorer" - Level 5', time: '2h ago' },
    { type: 'friend', text: 'Alex joined "Ocean Depths" experience', time: '4h ago' },
    { type: 'purchase', text: 'New content available: "Ancient Rome VR"', time: '1d ago' }
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-1">Welcome back{profile?.name ? `, ${profile.name}` : ''}!</h1>
            <p className="text-muted-foreground">Ready for your next VR adventure?</p>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search VR experiences..."
            className="pl-10 bg-background"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-2xl mb-1">{profile?.totalPlayTime || 0}h</div>
              <div className="text-xs text-muted-foreground">Hours Played</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-2xl mb-1">{profile?.experiencesPlayed || 0}</div>
              <div className="text-xs text-muted-foreground">Experiences</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-3">
              <div className="text-2xl mb-1">{profile?.level || 1}</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Experiences */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2>Featured Experiences</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {featuredSpaces.map((space) => (
              <VRSpaceCard
                key={space.id}
                {...space}
                thumbnail={space.thumbnail}
                onPreview={() => onPreview(space.id)}
                onPlay={purchases.includes(space.id) || !space.price ? () => onPlay(space.id) : () => onPurchase(space.id, space.price)}
                purchased={purchases.includes(space.id)}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'achievement' ? 'bg-green-500' :
                  activity.type === 'friend' ? 'bg-blue-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}