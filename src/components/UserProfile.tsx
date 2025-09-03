import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Trophy, 
  Users, 
  Calendar,
  Gamepad2,
  MapPin,
  Link as LinkIcon,
  MessageCircle,
  Settings,
  Edit3,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useAuth } from "../contexts/AuthContext";

interface UserStat {
  label: string;
  value: number;
}

interface UserAchievement {
  id: number;
  title: string;
  game: string;
  date: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface UserActivity {
  id: number;
  action: string;
  game?: string;
  timestamp: string;
}

const UserProfile = () => {
  const { profile, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in a real app this would come from the backend
  const userStats: UserStat[] = [
    { label: "Friends", value: 42 },
    { label: "Games Played", value: 28 },
    { label: "Achievements", value: 127 },
    { label: "Hours Played", value: 342 },
  ];

  const userAchievements: UserAchievement[] = [
    { id: 1, title: "First Steps", game: "VR Tutorial", date: "2023-01-15", rarity: "common" },
    { id: 2, title: "Rhythm Master", game: "Beat Saber", date: "2023-02-20", rarity: "rare" },
    { id: 3, title: "Social Butterfly", game: "Rec Room", date: "2023-03-05", rarity: "epic" },
    { id: 4, title: "Marathon Runner", game: "Synth Riders", date: "2023-04-12", rarity: "legendary" },
    { id: 5, title: "Team Player", game: "Echo Arena", date: "2023-05-18", rarity: "rare" },
    { id: 6, title: "Explorer", game: "Horizon", date: "2023-06-01", rarity: "common" },
  ];

  const userActivity: UserActivity[] = [
    { id: 1, action: "Posted an achievement", game: "Beat Saber", timestamp: "2 hours ago" },
    { id: 2, action: "Joined a community event", game: "Quest Platform", timestamp: "1 day ago" },
    { id: 3, action: "Completed a challenge", game: "Synth Riders", timestamp: "2 days ago" },
    { id: 4, action: "Made a new friend", timestamp: "3 days ago" },
    { id: 5, action: "Played a game", game: "Population: One", timestamp: "4 days ago" },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-300";
      case "rare": return "bg-blue-500";
      case "epic": return "bg-purple-500";
      case "legendary": return "bg-yellow-500";
      default: return "bg-gray-300";
    }
  };

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-24">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={profile?.avatar_url || "https://github.com/shadcn.png"} />
              <AvatarFallback className="text-2xl">
                {profile?.username?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="text-2xl font-bold">{profile?.username || "User"}</h1>
              <div className="flex items-center justify-center gap-1 mt-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <p className="mt-2 text-muted-foreground">
                VR enthusiast and game collector. Love exploring new worlds!
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={() => signOut()}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button variant="outline">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Stats */}
      <div className="grid grid-cols-2 gap-4">
        {userStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Level and Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Player Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-bold">24</span>
              <span className="text-muted-foreground"> / 30 XP to next level</span>
            </div>
            <Badge>Expert</Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5 mt-2">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: "80%" }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Achievements and Activity */}
      <Tabs defaultValue="achievements">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {userAchievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="border rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${getRarityColor(achievement.rarity)}`}></div>
                      <div>
                        <h3 className="font-medium text-sm">{achievement.title}</h3>
                        <p className="text-xs text-muted-foreground">{achievement.game}</p>
                        <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {userActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <p className="font-medium">{activity.action}</p>
                    {activity.game && (
                      <div className="flex items-center gap-2 mt-1">
                        <Gamepad2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{activity.game}</span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">{activity.timestamp}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      
    </div>
  );
};

export default UserProfile;