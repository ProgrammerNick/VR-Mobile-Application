import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  MessageSquare, 
  Trophy, 
  Users, 
  Target, 
  CalendarDays,
  Hash
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import EnhancedCommunityTab from "./EnhancedCommunityTab";
import GroupsTab from "./GroupsTab";
import ChallengesTab from "./ChallengesTab";

const CommunityTab = () => {
  return (
    <div className="h-full overflow-y-auto pb-24">
      <Tabs defaultValue="feed" className="w-full">
        <div className="p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Community</h1>
            <p className="text-muted-foreground">Connect and compete with other VR enthusiasts</p>
          </div>
          
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="showcase" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Showcase
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="feed" className="mt-0">
          <EnhancedCommunityTab />
        </TabsContent>
        
        <TabsContent value="groups" className="mt-0">
          <GroupsTab />
        </TabsContent>
        
        <TabsContent value="challenges" className="mt-0">
          <ChallengesTab />
        </TabsContent>
        
        <TabsContent value="showcase" className="mt-0 p-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Community Showcase
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-medium mt-4">Showcase Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  Share your achievements and see what the community is proud of
                </p>
                <Button className="mt-4">Post Achievement</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityTab;
