import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Users, 
  Trophy, 
  Gamepad2, 
  Calendar,
  TrendingUp,
  Star,
  MessageSquare,
  Play
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  avatar_url: string;
  isOnline: boolean;
}

interface Game {
  id: string;
  title: string;
  cover_image: string;
  category: string;
  rating: number;
  players: number;
}

interface CommunityEvent {
  id: number;
  title: string;
  game_name: string;
  start_time: string;
  participants: number;
}

interface Achievement {
  id: number;
  user: {
    username: string;
    avatar_url: string;
  };
  title: string;
  game: string;
  timestamp: string;
}

const CommunityFocusedHome = ({ onPlay }: { onPlay: (id: string) => void }) => {
  // Mock data - in a real app this would come from the backend
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);
  
  const onlineFriends: User[] = [
    {
      id: "1",
      username: "VRProGamer",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: "2",
      username: "QuestExplorer",
      avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      isOnline: true
    },
    {
      id: "3",
      username: "BeatMaster",
      avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      isOnline: true
    }
  ];

  const trendingGames: Game[] = [
    {
      id: "1",
      title: "Beat Saber",
      cover_image: "https://images.unsplash.com/photo-1614602923754-4bfa6f1ac6d5?w=300&h=200&fit=crop",
      category: "Music",
      rating: 4.8,
      players: 12420
    },
    {
      id: "2",
      title: "Horizon",
      cover_image: "https://images.unsplash.com/photo-1559583927-5ba60432b992?w=300&h=200&fit=crop",
      category: "Adventure",
      rating: 4.6,
      players: 8760
    },
    {
      id: "3",
      title: "Echo Arena",
      cover_image: "https://images.unsplash.com/photo-1551712709-a64b0717f09d?w=300&h=200&fit=crop",
      category: "Sports",
      rating: 4.7,
      players: 5430
    }
  ];

  const communityEvents: CommunityEvent[] = [
    {
      id: 1,
      title: "Weekly Beat Saber Tournament",
      game_name: "Beat Saber",
      start_time: "Today, 7:00 PM",
      participants: 24
    },
    {
      id: 2,
      title: "Horizon Exploration Workshop",
      game_name: "Horizon",
      start_time: "Jun 18, 3:00 PM",
      participants: 12
    }
  ];

  const recentAchievements: Achievement[] = [
    {
      id: 1,
      user: {
        username: "RhythmMaster",
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      title: "Perfect Run",
      game: "Pistol Whip",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: {
        username: "SynthAddict",
        avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
      },
      title: "Marathon Player",
      game: "Synth Riders",
      timestamp: "5 hours ago"
    }
  ];

  const handleJoinEvent = (eventId: number) => {
    if (joinedEvents.includes(eventId)) {
      toast.info("You've already joined this event!");
      return;
    }
    
    setJoinedEvents([...joinedEvents, eventId]);
    toast.success("You've joined this event!");
    // In a real app, this would update the backend
  };

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-24">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-4 text-black">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-black/80 mt-1">
          42 friends online, 3 new achievements
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <Users className="w-5 h-5 mx-auto text-muted-foreground" />
            <p className="text-xl font-bold mt-1">42</p>
            <p className="text-xs text-muted-foreground">Friends</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Gamepad2 className="w-5 h-5 mx-auto text-muted-foreground" />
            <p className="text-xl font-bold mt-1">28</p>
            <p className="text-xs text-muted-foreground">Games</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Trophy className="w-5 h-5 mx-auto text-muted-foreground" />
            <p className="text-xl font-bold mt-1">127</p>
            <p className="text-xs text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Friends Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Friends Online
          </CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {onlineFriends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={friend.avatar_url} />
                    <AvatarFallback>{friend.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <span className="font-medium">{friend.username}</span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => toast.success(`Join request sent to ${friend.username}!`)}
              >
                Join
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Community Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Events
          </CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {communityEvents.map((event) => (
            <div key={event.id} className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-medium">{event.title}</h3>
                <Badge variant="secondary">{event.game_name}</Badge>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">{event.start_time}</span>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{event.participants}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-3" 
                size="sm" 
                onClick={() => handleJoinEvent(event.id)}
                variant={joinedEvents.includes(event.id) ? "secondary" : "default"}
              >
                {joinedEvents.includes(event.id) ? "Joined" : "Join Event"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Games */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trending Games
          </CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingGames.map((game) => (
            <div key={game.id} className="flex items-center gap-4">
              <img 
                src={game.cover_image} 
                alt={game.title} 
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{game.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{game.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{game.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{game.players.toLocaleString()} players</span>
                </div>
              </div>
              <Button size="sm" onClick={() => onPlay(game.id)}>
                <Play className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={achievement.user.avatar_url} />
                <AvatarFallback>{achievement.user.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{achievement.user.username}</p>
                <p className="text-sm">
                  Unlocked <span className="font-medium">{achievement.title}</span> in {achievement.game}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{achievement.timestamp}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityFocusedHome;