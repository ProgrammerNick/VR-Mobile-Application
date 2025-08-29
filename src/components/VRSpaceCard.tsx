import { Play, Eye, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface VRSpaceCardProps {
  id: string;
  contentId?: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  rating: number;
  price?: number;
  purchased?: boolean;
  onPreview: () => void;
  onPlay: () => void;
}

export function VRSpaceCard({ 
  id, 
  contentId,
  title, 
  description, 
  thumbnail, 
  duration, 
  category, 
  rating, 
  price,
  purchased = false,
  onPreview,
  onPlay 
}: VRSpaceCardProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/50">
      <div className="relative">
        <ImageWithFallback
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            {category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
          <Clock className="w-3 h-3 text-white" />
          <span className="text-xs text-white">{duration}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white mb-1">{title}</h3>
          <p className="text-white/80 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              {rating.toFixed(1)}
            </span>
          </div>
          {price && (
            <span className="text-primary">${price}</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onPreview}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={onPlay}
          >
            <Play className="w-4 h-4 mr-2" />
            {price && !purchased ? `Buy ${price}` : 'Play'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}