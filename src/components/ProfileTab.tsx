import { Settings, Headphones, Download, Trophy, Star, ChevronRight, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Switch } from "./ui/switch";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";

export function ProfileTab({ profile }: { profile: any }) {
  const { signOut } = useAuth();
  const achievements = [
    { name: 'Explorer', description: 'Visited 10 VR worlds', progress: 100, icon: '🌍' },
    { name: 'Social Butterfly', description: 'Played with 5 friends', progress: 80, icon: '🦋' },
    { name: 'Speed Runner', description: 'Complete any experience in under 30 min', progress: 60, icon: '⚡' },
  ];

  const deviceInfo = {
    name: 'Meta Quest 3',
    batteryLevel: 78,
    storageUsed: 45,
    lastSync: '2 minutes ago'
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Profile Header */}
      <div className="p-4 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2>{profile?.name || 'VR User'}</h2>
            <p className="text-muted-foreground">VR Explorer Level {profile?.level || 1}</p>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.8 Rating</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">{profile?.experiencesPlayed || 0}</div>
            <div className="text-xs text-muted-foreground">Experiences</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">{profile?.totalPlayTime || 0}h</div>
            <div className="text-xs text-muted-foreground">Play Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">{profile?.achievements?.length || 0}</div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* VR Device Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="w-5 h-5" />
              VR Device
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p>{deviceInfo.name}</p>
                <p className="text-sm text-muted-foreground">Last sync: {deviceInfo.lastSync}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwc3BhY2UlMjBlbnZpcm9ubWVudHxlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="VR Headset"
                  className="w-8 h-8 object-cover rounded"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Battery</span>
                <span>{deviceInfo.batteryLevel}%</span>
              </div>
              <Progress value={deviceInfo.batteryLevel} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage</span>
                <span>{deviceInfo.storageUsed}% used</span>
              </div>
              <Progress value={deviceInfo.storageUsed} className="h-2" />
            </div>
            
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Sync Content
            </Button>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">{achievement.name}</p>
                    <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                  <Progress value={achievement.progress} className="h-1" />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Achievements
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Get notified about new content</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Auto-sync Content</p>
                <p className="text-xs text-muted-foreground">Download new content automatically</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Share Activity</p>
                <p className="text-xs text-muted-foreground">Let friends see what you're playing</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-between h-auto p-4">
            <span>Privacy & Safety</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" className="w-full justify-between h-auto p-4">
            <span>Help & Support</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" className="w-full justify-between h-auto p-4">
            <span>About</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start h-auto p-4 text-destructive"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}