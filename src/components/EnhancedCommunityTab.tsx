import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  CalendarDays,
  Gamepad2,
  Plus,
  Users,
  MessageSquarePlus,
  ThumbsUp,
  Trophy,
  MessageSquare,
  Share2,
  TrendingUp,
  Star,
  UserPlus,
  Hash,
  Clock,
  MapPin,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useAuth } from "../contexts/AuthContext";

// --- TYPE DEFINITIONS ---
interface CommunityEvent {
  id: number;
  title: string;
  description: string | null;
  game_name: string | null;
  start_time: string;
  participants: number;
  max_participants: number;
}

interface LfgPost {
  id: number;
  created_at: string;
  author_id: string;
  game_name: string;
  post_text: string;
  slots_needed: number;
  slots_filled: number;
}

interface AchievementPost {
  id: number;
  user_id: string;
  created_at: string;
  game_name: string;
  achievement_title: string;
  description: string | null;
  screenshot_url: string | null;
  likes_count: number;
  profiles: { username: string; avatar_url: string };
}

interface User {
  id: string;
  username: string;
  avatar_url: string;
  level: number;
  achievements_count: number;
  friends_count: number;
  isOnline: boolean;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  game_name: string;
  participants: number;
  end_date: string;
  rewards: string[];
}

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  content: string;
  game?: {
    name: string;
    imageUrl: string;
  };
  likes: number;
  comments: number;
}

// --- COMPONENT ---
const EnhancedCommunityTab = () => {
  // --- STATE MANAGEMENT ---
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [lfgPosts, setLfgPosts] = useState<LfgPost[]>([]);
  const [achievements, setAchievements] = useState<AchievementPost[]>([]);
  const [socialPosts, setSocialPosts] = useState<CommunityPost[]>([
    {
      id: "post1",
      author: {
        name: "GamerX",
        avatarUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      },
      timestamp: "2h ago",
      content:
        "Just reached the final boss in 'Galaxy Raiders'! This game is amazing. The starship battles are intense!",
      game: {
        name: "Galaxy Raiders",
        imageUrl:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop",
      },
      likes: 12,
      comments: 4,
    },
    {
      id: "post2",
      author: {
        name: "VR_Master",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      timestamp: "5h ago",
      content:
        "Looking for a team for the 'Echo Arena' weekly tournament. Anyone interested? I'm a decent goalie.",
      game: {
        name: "Echo Arena",
        imageUrl:
          "https://images.unsplash.com/photo-1551712709-a64b0717f09d?w=300&h=200&fit=crop",
      },
      likes: 8,
      comments: 15,
    },
    {
      id: "post3",
      author: {
        name: "ArtfulDodger",
        avatarUrl:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      },
      timestamp: "1d ago",
      content:
        "Spent the whole afternoon in 'Tilt Brush' creating a 3D masterpiece. The creative possibilities are endless in VR.",
      likes: 25,
      comments: 7,
    },
  ]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [userLikes, setUserLikes] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | undefined>();

  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingLfg, setLoadingLfg] = useState(true);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isCreateLfgOpen, setIsCreateLfgOpen] = useState(false);
  const [isCreateAchievementOpen, setIsCreateAchievementOpen] = useState(false);
  const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);

  const { user, profile } = useAuth();

  // --- DATA FETCHING & REAL-TIME ---
  useEffect(() => {
    // Mock data for other sections with better placeholder images
    setEvents([
      {
        id: 1,
        title: "Weekly Beat Saber Tournament",
        description:
          "Join us for our weekly Beat Saber competition! Open to all skill levels.",
        game_name: "Beat Saber",
        start_time: "2023-06-15T19:00:00Z",
        participants: 24,
        max_participants: 32,
      },
      {
        id: 2,
        title: "Horizon Workshops",
        description:
          "Learn to create amazing worlds in Horizon Call of the Mountain",
        game_name: "Horizon",
        start_time: "2023-06-18T15:00:00Z",
        participants: 12,
        max_participants: 20,
      },
    ]);

    setLfgPosts([
      {
        id: 1,
        created_at: "2023-06-10T14:30:00Z",
        author_id: "user1",
        game_name: "Population: One",
        post_text:
          "LF2M for ranked matches tonight. Prefer experienced players!",
        slots_needed: 2,
        slots_filled: 0,
      },
      {
        id: 2,
        created_at: "2023-06-10T16:45:00Z",
        author_id: "user2",
        game_name: "Rec Room",
        post_text:
          "Starting a new crew! Looking for creative builders to join our group.",
        slots_needed: 5,
        slots_filled: 2,
      },
    ]);

    setAchievements([
      {
        id: 1,
        user_id: "user1",
        created_at: "2023-06-09T10:30:00Z",
        game_name: "Pistol Whip",
        achievement_title: "Perfect Run",
        description: "Completed Nightclub level with 100% accuracy",
        screenshot_url:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=200&fit=crop",
        likes_count: 24,
        profiles: {
          username: "RhythmMaster",
          avatar_url:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        },
      },
      {
        id: 2,
        user_id: "user2",
        created_at: "2023-06-08T18:15:00Z",
        game_name: "Synth Riders",
        achievement_title: "Marathon Player",
        description: "Played for 10 hours straight this week!",
        screenshot_url: null,
        likes_count: 18,
        profiles: {
          username: "SynthAddict",
          avatar_url:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        },
      },
    ]);

    setChallenges([
      {
        id: 1,
        title: "Summer Quest Challenge",
        description: "Complete 5 different Quest games this week",
        game_name: "Quest Platform",
        participants: 142,
        end_date: "2023-06-20T23:59:59Z",
        rewards: ["Exclusive Avatar", "1000 XP"],
      },
      {
        id: 2,
        title: "Social Butterfly",
        description: "Make 3 new friends and play a game with each",
        game_name: "Community",
        participants: 87,
        end_date: "2023-06-22T23:59:59Z",
        rewards: ["Special Badge", "500 XP"],
      },
    ]);

    setOnlineUsers([
      {
        id: "user1",
        username: "VRProGamer",
        avatar_url:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        level: 24,
        achievements_count: 42,
        friends_count: 87,
        isOnline: true,
      },
      {
        id: "user2",
        username: "QuestExplorer",
        avatar_url:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        level: 18,
        achievements_count: 29,
        friends_count: 56,
        isOnline: true,
      },
      {
        id: "user3",
        username: "BeatMaster",
        avatar_url:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        level: 31,
        achievements_count: 67,
        friends_count: 124,
        isOnline: true,
      },
    ]);

    setUserId(user?.id);
  }, [user]);

  // --- HANDLERS ---
  const handleCreatePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("content") as string;

    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    // In a real app, this would be an API call
    toast.success("Post created successfully!");
    setIsCreatePostOpen(false);
  };

  const handleCreateAchievement = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const achievement_title = formData.get("achievement_title") as string;
    const game_name = formData.get("game_name") as string;
    const description = formData.get("description") as string;
    const screenshot_url = formData.get("screenshot_url") as string;

    if (!achievement_title || !game_name) {
      toast.error("Achievement Title and Game Name are required.");
      return;
    }
    if (!userId) {
      toast.error("You must be logged in to post an achievement.");
      return;
    }

    // In a real app, this would be an API call
    toast.success("Achievement posted!");
    setIsCreateAchievementOpen(false);
  };

  const handleJoinEvent = (eventId: number) => {
    toast.success("You've joined this event!");
    // In a real app, this would update the backend
  };

  const handleJoinLfg = (lfgId: number) => {
    toast.success("You've joined this LFG post!");
    // In a real app, this would update the backend
  };

  const handleJoinChallenge = (challengeId: number) => {
    toast.success("You've joined this challenge!");
    // In a real app, this would update the backend
  };

  const handleLike = (postId: number) => {
    if (!userId) {
      toast.error("You must be logged in to like a post.");
      return;
    }

    const alreadyLiked = userLikes.includes(postId);

    if (alreadyLiked) {
      setUserLikes(userLikes.filter((id) => id !== postId));
      toast.info("Removed like");
    } else {
      setUserLikes([...userLikes, postId]);
      toast.success("Liked post!");
    }
  };

  // --- RENDER ---
  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-24">
      {/* Header with Welcome Message */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/10 rounded-xl p-4 text-black">
        <h1 className="text-2xl font-bold">Community Hub</h1>
        <p className="text-black/80 mt-1">
          Connect, compete, and create with fellow VR enthusiasts
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          className="h-auto py-3 flex flex-col items-center justify-center gap-1"
          onClick={() => setIsCreatePostOpen(true)}
        >
          <MessageSquarePlus className="w-5 h-5" />
          <span className="text-xs">New Post</span>
        </Button>
        <Button
          className="h-auto py-3 flex flex-col items-center justify-center gap-1"
          variant="outline"
          onClick={() => setIsCreateAchievementOpen(true)}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-xs">Share Achievement</span>
        </Button>
        <Button
          className="h-auto py-3 flex flex-col items-center justify-center gap-1"
          variant="outline"
        >
          <UserPlus className="w-5 h-5" />
          <span className="text-xs">Find Friends</span>
        </Button>
        <Button
          className="h-auto py-3 flex flex-col items-center justify-center gap-1"
          variant="outline"
        >
          <Hash className="w-5 h-5" />
          <span className="text-xs">Join Group</span>
        </Button>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="online">Online</TabsTrigger>
        </TabsList>

        {/* Social Feed Tab */}
        <TabsContent value="feed" className="space-y-6">
          {/* Create Post Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={profile?.avatar_url || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {profile?.username?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => setIsCreatePostOpen(true)}
                  >
                    Share what you're up to...
                  </Button>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Achievement
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      Game Status
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Posts Feed */}
          {socialPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={post.author.avatarUrl} />
                    <AvatarFallback>
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{post.content}</p>
                  </div>
                </div>
                {post.game && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-center gap-4">
                    <img
                      src={post.game.imageUrl}
                      alt={post.game.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-sm">{post.game.name}</p>
                      <Button variant="outline" size="sm" className="mt-1">
                        View Game
                      </Button>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mt-4 text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1.5"
                      onClick={() => handleLike(parseInt(post.id))}
                    >
                      <ThumbsUp
                        className={`w-4 h-4 ${
                          userLikes.includes(parseInt(post.id))
                            ? "fill-current"
                            : ""
                        }`}
                      />
                      <span>{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
              <Button size="sm" onClick={() => setIsCreateEventOpen(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Create
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <Badge variant="secondary">{event.game_name}</Badge>
                    </div>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(event.start_time).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {event.participants}/{event.max_participants}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => handleJoinEvent(event.id)}
                    >
                      Join Event
                    </Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Active Challenges
              </CardTitle>
              <Button size="sm" onClick={() => setIsCreateChallengeOpen(true)}>
                <Plus className="w-4 h-4 mr-1" />
                New Challenge
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-lg">{challenge.title}</h3>
                      <Badge variant="default">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {challenge.participants}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {challenge.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline">{challenge.game_name}</Badge>
                      <Badge variant="outline">
                        Ends {new Date(challenge.end_date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-medium">Rewards:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {challenge.rewards.map((reward, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {reward}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => handleJoinChallenge(challenge.id)}
                    >
                      Join Challenge
                    </Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Online Users Tab */}
        <TabsContent value="online" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online Now ({onlineUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {onlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Lvl {user.level}</span>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{user.achievements_count} achievements</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Join</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Achievement Showcase Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Community Showcase
          </CardTitle>
          <Dialog
            open={isCreateAchievementOpen}
            onOpenChange={setIsCreateAchievementOpen}
          >
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Post an Achievement</DialogTitle>
                <DialogDescription>
                  Share something you're proud of with the community.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateAchievement} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="achievement_title">Achievement</Label>
                  <Input
                    id="achievement_title"
                    name="achievement_title"
                    placeholder='e.g., "Reached Master Rank"'
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="game_name">Game</Label>
                  <Input
                    id="game_name"
                    name="game_name"
                    placeholder="e.g., Beat Saber"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="A few words about how you did it..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="screenshot_url">
                    Screenshot URL (Optional)
                  </Label>
                  <Input
                    id="screenshot_url"
                    name="screenshot_url"
                    placeholder="https://..."
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsCreateAchievementOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Post</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {loadingAchievements ? (
            <p>Loading achievements...</p>
          ) : achievements.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No achievements posted yet. Be the first!
            </p>
          ) : (
            <div className="space-y-4">
              {achievements.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  {post.screenshot_url && (
                    <img
                      src={post.screenshot_url}
                      alt={post.achievement_title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.profiles.avatar_url} />
                        <AvatarFallback>
                          {post.profiles.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <p className="font-semibold">
                          {post.profiles.username}
                        </p>
                        <h4 className="text-lg font-bold tracking-tight">
                          {post.achievement_title}
                        </h4>
                        {post.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {post.description}
                          </p>
                        )}
                        <Badge variant="secondary" className="mt-2">
                          {post.game_name}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={
                            userLikes.includes(post.id) ? "default" : "ghost"
                          }
                          size="sm"
                          onClick={() => handleLike(post.id)}
                        >
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          {post.likes_count}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
            <DialogDescription>
              Share your thoughts, experiences, or questions with the community.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">What's on your mind?</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Share your VR experiences, ask questions, or start a discussion..."
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsCreatePostOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Post</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedCommunityTab;
