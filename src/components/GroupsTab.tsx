import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Users, 
  Search,
  Plus,
  Hash,
  Lock,
  Globe,
  UserPlus,
  Calendar,
  Trophy
} from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Group {
  id: number;
  name: string;
  description: string;
  members: number;
  isPrivate: boolean;
  category: string;
  avatar_url: string;
  isAdmin: boolean;
}

interface GroupMember {
  id: number;
  username: string;
  avatar_url: string;
  role: "admin" | "moderator" | "member";
}

const GroupsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - in a real app this would come from the backend
  const groups: Group[] = [
    {
      id: 1,
      name: "Beat Saber Pros",
      description: "For experts who love challenging maps and high scores",
      members: 1242,
      isPrivate: false,
      category: "Music Games",
      avatar_url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&h=150&fit=crop",
      isAdmin: true
    },
    {
      id: 2,
      name: "Horizon Explorers",
      description: "Exploring every corner of the Horizon universe",
      members: 876,
      isPrivate: false,
      category: "Adventure",
      avatar_url: "https://images.unsplash.com/photo-1559583927-5ba60432b992?w=150&h=150&fit=crop",
      isAdmin: false
    },
    {
      id: 3,
      name: "Quest Developers",
      description: "A group for developers creating for Quest platform",
      members: 543,
      isPrivate: true,
      category: "Development",
      avatar_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop",
      isAdmin: false
    },
    {
      id: 4,
      name: "Social VR Hangout",
      description: "Just a place to hang out and chat in VR",
      members: 2109,
      isPrivate: false,
      category: "Social",
      avatar_url: "https://images.unsplash.com/photo-1551712709-a64b0717f09d?w=150&h=150&fit=crop",
      isAdmin: false
    }
  ];

  const groupMembers: GroupMember[] = [
    {
      id: 1,
      username: "VRProGamer",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      role: "admin"
    },
    {
      id: 2,
      username: "QuestExplorer",
      avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      role: "admin"
    },
    {
      id: 3,
      username: "BeatMaster",
      avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      role: "moderator"
    },
    {
      id: 4,
      username: "NewPlayer",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      role: "member"
    }
  ];

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto pb-24">
      {/* Header with Search */}
      <div>
        <h1 className="text-2xl font-bold">Groups</h1>
        <p className="text-muted-foreground">Find communities that match your interests</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search groups..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-auto py-3 flex flex-col items-center justify-center gap-1">
          <Plus className="w-5 h-5" />
          <span className="text-xs">Create Group</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto py-3 flex flex-col items-center justify-center gap-1"
        >
          <UserPlus className="w-5 h-5" />
          <span className="text-xs">Invitations</span>
        </Button>
      </div>

      {/* Tabs for Browse and My Groups */}
      <Tabs defaultValue="browse">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="mygroups">My Groups</TabsTrigger>
        </TabsList>
        
        {/* Browse Groups Tab */}
        <TabsContent value="browse" className="space-y-4">
          <div className="space-y-4">
            {filteredGroups.map((group) => (
              <Card key={group.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={group.avatar_url} />
                      <AvatarFallback>
                        <Hash className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{group.name}</h3>
                        {group.isPrivate ? (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Globe className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{group.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{group.members}</span>
                          </div>
                        </div>
                        <Button size="sm">
                          {group.isAdmin ? "Manage" : "Join"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* My Groups Tab */}
        <TabsContent value="mygroups" className="space-y-4">
          <div className="space-y-4">
            {groups.filter(g => g.isAdmin).map((group) => (
              <Card key={group.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={group.avatar_url} />
                      <AvatarFallback>
                        <Hash className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{group.name}</h3>
                        {group.isPrivate ? (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Globe className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{group.category}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{group.members}</span>
                          </div>
                        </div>
                        <Button size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Group Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Group Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium">Beat Saber Weekly Challenge</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Get the highest score on "One More Time" expert+ map
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>1</AvatarFallback>
                </Avatar>
                <span className="text-sm">124 participants</span>
              </div>
              <Button size="sm" variant="outline">
                Join
              </Button>
            </div>
          </div>
          
          <div className="p-3 border rounded-lg">
            <h4 className="font-medium">Horizon Exploration Contest</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Find and photograph all 10 hidden landmarks
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>2</AvatarFallback>
                </Avatar>
                <span className="text-sm">87 participants</span>
              </div>
              <Button size="sm" variant="outline">
                Join
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupsTab;