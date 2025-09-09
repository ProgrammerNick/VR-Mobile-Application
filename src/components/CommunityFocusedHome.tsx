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
  Play,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { mockUsers } from "../data/users";
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
  const onlineFriends = Object.values(mockUsers).filter(
    (user) => user.isOnline
  );

  const trendingGames: Game[] = [
    {
      id: "1",
      title: "Beat Saber",
      cover_image:
        "https://thevrrealm.com/wp-content/uploads/2019/07/review-beat-saber-2020.jpg",
      category: "Music",
      rating: 4.8,
      players: 12420,
    },
    {
      id: "2",
      title: "Horizon",
      cover_image:
        "https://image.api.playstation.com/pr/bam-art/148/913/8c531abc-3dfc-47cb-95fa-2cbeb509c668.jpg",
      category: "Adventure",
      rating: 4.6,
      players: 8760,
    },
    {
      id: "3",
      title: "Echo Arena",
      cover_image:
        "https://roadtovrlive-5ea0.kxcdn.com/wp-content/uploads/2017/10/echo-arena-concept.jpg",
      category: "Sports",
      rating: 4.7,
      players: 5430,
    },
  ];

  const communityEvents: CommunityEvent[] = [
    {
      id: 1,
      title: "Weekly Beat Saber Tournament",
      game_name: "Beat Saber",
      start_time: "Today, 7:00 PM",
      participants: 24,
    },
    {
      id: 2,
      title: "Horizon Exploration Workshop",
      game_name: "Horizon",
      start_time: "Jun 18, 3:00 PM",
      participants: 12,
    },
  ];

  const recentAchievements: Achievement[] = [
    {
      id: 1,
      user: mockUsers.RhythmMaster,
      title: "Perfect Run",
      game: "Pistol Whip",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: mockUsers.SynthAddict,
      title: "Marathon Player",
      game: "Synth Riders",
      timestamp: "5 hours ago",
    },
  ];

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-24">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/20 rounded-xl p-4">
        <h1 className="text-2xl font-bold text-black">Welcome back!</h1>
        <p className="text-black mt-1 font-medium">
          42 friends online, 3 new achievements
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="p-3 text-center">
            <Users className="w-5 h-5 mx-auto text-primary" />
            <p className="text-xl font-bold mt-1">42</p>
            <p className="text-xs text-muted-foreground">Friends</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="p-3 text-center">
            <Gamepad2 className="w-5 h-5 mx-auto text-primary" />
            <p className="text-xl font-bold mt-1">28</p>
            <p className="text-xs text-muted-foreground">Games</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="p-3 text-center">
            <Trophy className="w-5 h-5 mx-auto text-primary" />
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
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {onlineFriends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors"
            >
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
                onClick={() =>
                  toast.success(`Join request sent to ${friend.username}!`)
                }
              >
                Join
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
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingGames.map((game) => (
            <div
              key={game.id}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors"
            >
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
              <Button
                size="sm"
                onClick={() => onPlay(game.id)}
                className="bg-primary hover:bg-secondary"
              >
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
            <div
              key={achievement.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={achievement.user.avatar_url} />
                <AvatarFallback>
                  {achievement.user.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{achievement.user.username}</p>
                <p className="text-sm">
                  Unlocked{" "}
                  <span className="font-medium text-primary">
                    {achievement.title}
                  </span>{" "}
                  in {achievement.game}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement.timestamp}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityFocusedHome;
