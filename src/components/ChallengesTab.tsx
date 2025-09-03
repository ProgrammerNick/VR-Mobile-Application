import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Trophy, 
  Calendar,
  Users,
  Star,
  Target,
  Clock,
  Flame
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface Challenge {
  id: number;
  title: string;
  description: string;
  game: string;
  participants: number;
  maxParticipants: number;
  endDate: string;
  rewards: string[];
  difficulty: "easy" | "medium" | "hard";
  category: string;
  progress?: number; // For user's progress in the challenge
  isJoined?: boolean;
}

const ChallengesTab = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Mock data - in a real app this would come from the backend
  const challenges: Challenge[] = [
    {
      id: 1,
      title: "Beat Saber Marathon",
      description: "Play 5 different songs in a row without missing more than 5 notes total",
      game: "Beat Saber",
      participants: 1242,
      maxParticipants: 2000,
      endDate: "2023-06-25",
      rewards: ["Exclusive Saber Skin", "1000 XP"],
      difficulty: "hard",
      category: "Music",
      progress: 60,
      isJoined: true
    },
    {
      id: 2,
      title: "Horizon Photography Contest",
      description: "Capture 10 unique photos of wildlife in the Horizon world",
      game: "Horizon",
      participants: 876,
      maxParticipants: 1500,
      endDate: "2023-06-30",
      rewards: ["Digital Art Frame", "500 XP"],
      difficulty: "medium",
      category: "Exploration",
      isJoined: false
    },
    {
      id: 3,
      title: "Social Butterfly",
      description: "Make 5 new friends and play a game with each of them",
      game: "Community",
      participants: 2109,
      maxParticipants: 5000,
      endDate: "2023-07-05",
      rewards: ["Special Avatar", "750 XP"],
      difficulty: "easy",
      category: "Social",
      isJoined: true
    },
    {
      id: 4,
      title: "Fitness Champion",
      description: "Burn 500 calories in VR fitness games this week",
      game: "Fitness",
      participants: 543,
      maxParticipants: 1000,
      endDate: "2023-06-22",
      rewards: ["Workout Playlist", "1200 XP"],
      difficulty: "hard",
      category: "Fitness",
      progress: 30,
      isJoined: true
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filteredChallenges = activeFilter === "all" 
    ? challenges 
    : challenges.filter(challenge => challenge.category.toLowerCase() === activeFilter);

  const joinedChallenges = challenges.filter(challenge => challenge.isJoined);

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-24">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Challenges</h1>
        <p className="text-muted-foreground">Compete with the community and earn rewards</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              <span className="text-2xl font-bold">3</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges Section */}
      {joinedChallenges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Active Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {joinedChallenges.map((challenge) => (
              <div key={challenge.id} className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <h3 className="font-bold">{challenge.title}</h3>
                  <Badge 
                    className={getDifficultyColor(challenge.difficulty)}
                    variant="secondary"
                  >
                    {challenge.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                <Badge variant="outline" className="mt-2">{challenge.game}</Badge>
                
                {challenge.progress !== undefined && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="mt-1" />
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Ends {new Date(challenge.endDate).toLocaleDateString()}</span>
                  </div>
                  <Button size="sm">Continue</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button 
          variant={activeFilter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("all")}
        >
          All
        </Button>
        <Button 
          variant={activeFilter === "music" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("music")}
        >
          Music
        </Button>
        <Button 
          variant={activeFilter === "exploration" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("exploration")}
        >
          Exploration
        </Button>
        <Button 
          variant={activeFilter === "social" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("social")}
        >
          Social
        </Button>
        <Button 
          variant={activeFilter === "fitness" ? "default" : "outline"} 
          size="sm"
          onClick={() => setActiveFilter("fitness")}
        >
          Fitness
        </Button>
      </div>

      {/* Challenges List */}
      <div className="space-y-4">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id}>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <h3 className="font-bold">{challenge.title}</h3>
                <Badge 
                  className={getDifficultyColor(challenge.difficulty)}
                  variant="secondary"
                >
                  {challenge.difficulty}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
              <Badge variant="outline" className="mt-2">{challenge.game}</Badge>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {challenge.rewards.map((reward, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {reward}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants}/{challenge.maxParticipants}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(challenge.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button size="sm" variant={challenge.isJoined ? "outline" : "default"}>
                  {challenge.isJoined ? "Joined" : "Join"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChallengesTab;