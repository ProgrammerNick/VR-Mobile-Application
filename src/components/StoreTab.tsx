import { Search, Filter, Star, Download } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { VRSpaceCard } from "./VRSpaceCard";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { storeItems } from "../data/storeItems";

interface StoreTabProps {
  onPreview: (id: string) => void;
  onPlay: (id: string) => void;
  onPurchase: (id: string, price: number) => void;
  onBulkPurchase: () => void;
  vrContent: any[];
  purchases: string[];
}

export function StoreTab({ onPreview, onPlay, onPurchase, onBulkPurchase, vrContent, purchases }: StoreTabProps) {
  // Filter out any content that might already be in vrContent to avoid duplicates

  const freeContent = [
    {
      id: 'store-6',
      contentId: '6',
      title: 'VR Tutorial Island',
      description: 'Learn the basics of VR interaction in this beginner-friendly experience.',
      thumbnail: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGdhbWluZ3xlbnwxfHx8fDE3NTYzNTcyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      duration: '15 min',
      category: 'Tutorial',
      rating: 4.3
    }
  ];

  const categories = ['All', 'Adventure', 'Education', 'Entertainment', 'Nature', 'Simulation'];

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
        <h1 className="mb-4">VR Store</h1>
        
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search experiences..."
              className="pl-10 bg-background"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === 'All' ? 'default' : 'secondary'}
              className="whitespace-nowrap cursor-pointer"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="premium" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
          </TabsList>
          
          <TabsContent value="premium" className="space-y-4">
            {/* Featured Deal */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-purple-500 text-white">Featured Deal</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">Editor's Choice</span>
                  </div>
                </div>
                <h3 className="mb-1">Premium Bundle - 5 Experiences</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Save 40% on our most popular VR experiences
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl text-primary">$39.99</span>
                    <span className="text-sm text-muted-foreground line-through ml-2">$66.95</span>
                  </div>
                  <Button onClick={onBulkPurchase}>
                    <Download className="w-4 h-4 mr-2" />
                    Get Bundle
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Show API content and store items, but filter out duplicates */}
            {storeItems.map((item) => (
              <VRSpaceCard
                key={item.id}
                {...item}
                thumbnail={item.thumbnail}
                purchased={purchases.includes(item.id)}
                onPreview={() => onPreview(item.contentId)}
                onPlay={purchases.includes(item.id) ? () => onPlay(item.contentId) : () => onPurchase(item.id, item.price)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="free" className="space-y-4">
            {/* Show free content */}
            {freeContent.map((item) => (
              <VRSpaceCard
                key={item.id}
                {...item}
                thumbnail={item.thumbnail}
                onPreview={() => onPreview(item.contentId)}
                onPlay={() => onPlay(item.contentId)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
