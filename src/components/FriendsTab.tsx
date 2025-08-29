import { UserPlus, MessageCircle, Share, Users, Crown, Gamepad2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

export function FriendsTab() {
  const friends = [
    {
      id: '1',
      name: 'Alex Chen',
      avatar: 'AC',
      status: 'online',
      currentActivity: 'Playing Cyberpunk City 2077',
      joinable: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      status: 'away',
      currentActivity: 'In VR Tutorial Island',
      joinable: false
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      avatar: 'MR',
      status: 'offline',
      currentActivity: 'Last seen 2 hours ago',
      joinable: false
    },
    {
      id: '4',
      name: 'Emma Wilson',
      avatar: 'EW',
      status: 'online',
      currentActivity: 'Browsing Store',
      joinable: false
    }
  ];

  const groups = [
    {
      id: '1',
      name: 'VR Explorers',
      members: 8,
      description: 'Adventure seekers and world explorers',
      lastActivity: 'Alex shared "Ancient Rome VR"'
    },
    {
      id: '2',
      name: 'Gaming Squad',
      members: 12,
      description: 'Competitive VR gaming group',
      lastActivity: 'Sarah completed "Space Station Alpha"'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <div className="flex items-center justify-between mb-4">
          <h1>Friends</h1>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Invite
          </Button>
        </div>
        
        <Input placeholder="Search friends..." className="bg-background" />
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto p-4">
            <div className="text-center">
              <Share className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm">Share Experience</div>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4">
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm">Create Group</div>
            </div>
          </Button>
        </div>

        {/* Online Friends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Online Friends ({friends.filter(f => f.status === 'online').length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {friends.filter(friend => friend.status === 'online').map((friend) => (
              <div key={friend.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{friend.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-background`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate">{friend.name}</p>
                    {friend.joinable && (
                      <Badge variant="secondary" className="text-xs">
                        <Gamepad2 className="w-3 h-3 mr-1" />
                        Joinable
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {friend.currentActivity}
                  </p>
                </div>
                
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  {friend.joinable && (
                    <Button size="sm">Join</Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* All Friends */}
        <Card>
          <CardHeader>
            <CardTitle>All Friends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>{friend.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-background`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="truncate">{friend.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {friend.currentActivity}
                  </p>
                </div>
                
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Groups */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {groups.map((group) => (
              <div key={group.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4>{group.name}</h4>
                      <Crown className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                  </div>
                  <Badge variant="outline">{group.members} members</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {group.lastActivity}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Group
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}